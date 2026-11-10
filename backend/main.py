from __future__ import annotations

import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import Body, Depends, FastAPI, Header, HTTPException
from fastapi.responses import FileResponse, RedirectResponse, Response
from pydantic import BaseModel, Field

ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"
ADMIN_HTML = Path(__file__).resolve().parent / "admin" / "index.html"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "").strip()

SEGMENTS: dict[str, dict[str, Any]] = {
    "site": {
        "label": "Site & navigation",
        "description": "Name, role, SEO details, contact information, social links, and both navigation lists.",
        "file": "site.json",
        "root": "object",
    },
    "profile": {
        "label": "Skills & interests",
        "description": "The skill groups and research interests used on the profile, home, and CV pages.",
        "file": "profile.json",
        "root": "object",
    },
    "resume": {
        "label": "Resume & education",
        "description": "Resume summary, education records, and thesis highlights used by the home page and CV.",
        "file": "resume.json",
        "root": "object",
    },
    "projects": {
        "label": "Projects",
        "description": "The project list shown on the projects page and in the resume.",
        "file": "projects.json",
        "root": "array",
    },
    "publications": {
        "label": "Publications",
        "description": "Papers and manuscripts shown on the publications page and CV.",
        "file": "publications.json",
        "root": "array",
    },
    "thesis": {
        "label": "Thesis",
        "description": "Thesis title, summary, model comparison, results, app, and limitations.",
        "file": "thesis.json",
        "root": "object",
    },
    "cli": {
        "label": "Terminal answers",
        "description": "The keyword-search answers shown in the interactive terminal.",
        "file": "cli.json",
        "root": "array",
    },
    "pages": {
        "label": "Page copy",
        "description": "Editable headings and paragraphs for the home, about, research, projects, education, publications, profile, and contact pages.",
        "file": "pages.json",
        "root": "object",
    },
}

app = FastAPI(
    title="Samin Sadaf portfolio admin",
    description="Local content API for the portfolio site.",
    version="1.0.0",
)


class PushRequest(BaseModel):
    message: str | None = Field(default=None, max_length=200)


def require_admin(x_admin_token: str | None = Header(default=None)) -> None:
    if ADMIN_TOKEN and x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token.")


def segment_or_404(segment: str) -> dict[str, Any]:
    meta = SEGMENTS.get(segment)
    if meta is None:
        raise HTTPException(status_code=404, detail="Unknown content segment.")
    return meta


def segment_path(segment: str) -> Path:
    meta = segment_or_404(segment)
    return CONTENT_DIR / str(meta["file"])


def read_segment(segment: str) -> Any:
    path = segment_path(segment)
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=f"Missing content file: {path.name}") from exc
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=500,
            detail=f"{path.name} is not valid JSON: {exc}",
        ) from exc


def write_segment(segment: str, data: Any) -> None:
    meta = segment_or_404(segment)
    expected = meta["root"]
    if expected == "object" and not isinstance(data, dict):
        raise HTTPException(status_code=422, detail="This segment must be a JSON object.")
    if expected == "array" and not isinstance(data, list):
        raise HTTPException(status_code=422, detail="This segment must be a JSON array.")

    serialised = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if len(serialised.encode("utf-8")) > 2_000_000:
        raise HTTPException(status_code=413, detail="Content is too large to save.")

    path = segment_path(segment)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(f"{path.suffix}.tmp")
    temporary.write_text(serialised, encoding="utf-8")
    os.replace(temporary, path)


def run_git(*args: str) -> subprocess.CompletedProcess[str]:
    environment = os.environ.copy()
    environment["GIT_TERMINAL_PROMPT"] = "0"
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        env=environment,
        timeout=120,
        check=False,
    )


def git_output(result: subprocess.CompletedProcess[str]) -> str:
    parts = [part.strip() for part in (result.stdout, result.stderr) if part and part.strip()]
    return "\n".join(parts)


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/admin")


@app.get("/favicon.ico", include_in_schema=False)
def favicon() -> Response:
    return Response(status_code=204)


@app.get("/api/health")
def health() -> dict[str, Any]:
    return {
        "ok": True,
        "content_dir": str(CONTENT_DIR),
        "requires_token": bool(ADMIN_TOKEN),
    }


@app.get("/api/config")
def config() -> dict[str, Any]:
    return {
        "requires_token": bool(ADMIN_TOKEN),
        "repo_root": str(ROOT),
        "content_dir": str(CONTENT_DIR),
    }


@app.get("/api/segments")
def list_segments() -> dict[str, Any]:
    return {
        "segments": [
            {
                "key": key,
                "label": meta["label"],
                "description": meta["description"],
                "file": meta["file"],
                "root": meta["root"],
            }
            for key, meta in SEGMENTS.items()
        ]
    }


@app.get("/api/segments/{segment}")
def get_segment(segment: str) -> dict[str, Any]:
    meta = segment_or_404(segment)
    return {
        "key": segment,
        "label": meta["label"],
        "description": meta["description"],
        "file": meta["file"],
        "data": read_segment(segment),
    }


@app.put("/api/segments/{segment}", dependencies=[Depends(require_admin)])
def save_segment(segment: str, data: Any = Body(...)) -> dict[str, Any]:
    write_segment(segment, data)
    meta = segment_or_404(segment)
    return {
        "saved": True,
        "key": segment,
        "label": meta["label"],
        "file": meta["file"],
        "data": read_segment(segment),
    }


@app.post("/api/push", dependencies=[Depends(require_admin)])
def push_to_github(request: PushRequest) -> dict[str, Any]:
    status = run_git("status", "--porcelain", "--", "content")
    if status.returncode != 0:
        raise HTTPException(status_code=500, detail=git_output(status) or "git status failed.")

    if not status.stdout.strip():
        return {
            "ok": True,
            "status": "no_changes",
            "message": "No content changes to push.",
        }

    add = run_git("add", "--", "content")
    if add.returncode != 0:
        raise HTTPException(status_code=500, detail=git_output(add) or "git add failed.")

    staged = run_git("diff", "--cached", "--quiet", "--", "content")
    if staged.returncode == 0:
        return {
            "ok": True,
            "status": "no_changes",
            "message": "No content changes to push.",
        }

    message = (request.message or "").strip() or "content: update from admin panel"
    commit = run_git("commit", "-m", message, "--", "content")
    if commit.returncode != 0:
        raise HTTPException(status_code=500, detail=git_output(commit) or "git commit failed.")

    push = run_git("push", "origin", "HEAD")
    if push.returncode != 0:
        raise HTTPException(status_code=500, detail=git_output(push) or "git push failed.")

    return {
        "ok": True,
        "status": "pushed",
        "message": "Content committed and pushed.",
        "commit": git_output(commit),
        "push": git_output(push),
        "pushed_at": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/admin", include_in_schema=False)
def admin() -> FileResponse:
    if not ADMIN_HTML.exists():
        raise HTTPException(status_code=500, detail="Admin panel file is missing.")
    return FileResponse(ADMIN_HTML, media_type="text/html")
