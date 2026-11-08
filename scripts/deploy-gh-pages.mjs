// Publishes the built site in dist/ to the `gh-pages` branch.
//
// GitHub Pages serves that branch directly (legacy branch build). This is used
// instead of an Actions workflow because workflow jobs do not start on this
// account — only GitHub's own pages-build-deployment runs.
//
// Usage: npm run deploy   (builds first)

import { execFileSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const remote = "origin";
const branch = "gh-pages";

if (!existsSync(path.join(dist, "index.html"))) {
  console.error("dist/index.html not found — run `npm run build` first.");
  process.exit(1);
}

// Jekyll ignores directories that start with an underscore, which would drop
// Astro's _astro/ assets. This opt-out file must ship with the site.
writeFileSync(path.join(dist, ".nojekyll"), "");

const git = (args, env) =>
  execFileSync("git", args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, GIT_TERMINAL_PROMPT: "0", ...env },
  });

const output = (args) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

const gitDir = output(["rev-parse", "--git-dir"]);
const indexPath = path.resolve(root, gitDir, "deploy-index");

if (existsSync(indexPath)) rmSync(indexPath);

// Build a commit from dist/ using a throwaway index, so the working tree and
// the master branch are never touched.
const env = { GIT_INDEX_FILE: indexPath };

git([`--work-tree=${dist}`, "add", "-A", "-f", "."], env);
const tree = outputWithEnv(["write-tree"], env);
const commit = outputWithEnv(["commit-tree", tree, "-m", `Deploy ${new Date().toISOString()}`], env);
git(["push", "--force", remote, `${commit}:refs/heads/${branch}`], env);

rmSync(indexPath, { force: true });
console.log(`\nPublished to ${remote}/${branch}.`);

function outputWithEnv(args, extraEnv) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, ...extraEnv },
  }).trim();
}
