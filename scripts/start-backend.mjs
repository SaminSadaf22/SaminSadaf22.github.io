import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const candidates = [
  process.env.PYTHON,
  resolve(root, ".venv", "Scripts", "python.exe"),
  resolve(root, ".venv", "bin", "python"),
  "python",
].filter(Boolean);

const python = candidates.find((candidate) => candidate === "python" || existsSync(candidate));

if (!python) {
  console.error("Python was not found. Install Python 3.11+ and run:");
  console.error("  python -m venv .venv");
  console.error("  .venv/Scripts/python -m pip install -r backend/requirements.txt");
  process.exit(1);
}

const args = [
  "-m",
  "uvicorn",
  "backend.main:app",
  "--reload",
  "--host",
  "127.0.0.1",
  "--port",
  "8000",
];

console.log(`Starting FastAPI admin at http://127.0.0.1:8000/admin`);
console.log(`Using ${python}`);

const child = spawn(python, args, {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
