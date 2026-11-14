# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Commands

Git runs on the host. npm and the project scripts run in the DevContainer. Each worktree has its own DevContainer. In a new worktree, run `devcontainer up --workspace-folder .` once before the other commands.

```bash
devcontainer up --workspace-folder .
devcontainer exec --workspace-folder . npm ci
devcontainer exec --workspace-folder . npm test
devcontainer exec --workspace-folder . npx biome ci .
devcontainer exec --workspace-folder . npm run build
devcontainer exec --workspace-folder . npm run start:dev
```

`npm run start:dev` serves the demo on container port 3000. Run `docker port <container> 3000` on the host to find the mapped host port.
