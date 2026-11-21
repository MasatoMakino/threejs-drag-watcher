# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

Git runs on the host. pnpm and the project scripts run in the DevContainer. Each worktree has its own DevContainer. In a new worktree, run `devcontainer up --workspace-folder .` once before the other commands.

```bash
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . pnpm install --frozen-lockfile
devcontainer exec --workspace-folder . pnpm test
devcontainer exec --workspace-folder . pnpm exec vp check
devcontainer exec --workspace-folder . pnpm run build
devcontainer exec --workspace-folder . pnpm run start:dev
```

`pnpm run start:dev` serves the demo on container port 3456. Run `docker port <container> 3456` on the host to find the mapped host port.
