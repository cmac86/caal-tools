# Contributing to CAAL Tool Registry

Thanks for contributing! This registry grows through community submissions. For the full architecture and tool spec, see the [CAAL Tool API](https://github.com/CoreWorxLab/caal/wiki/CAAL-Tool-API).

## Submitting a Tool

1. Build and test your workflow in n8n
2. Open the CAAL frontend and go to **Tool Registry > Submit**
3. Export your workflow from n8n and upload it
4. The frontend handles sanitization, manifest generation, and PR creation
5. On merge, the registry automatically assigns an ID, adds a tracking sticky note, and regenerates the index

### Building with AI Coding Agents

If you're using Claude, Cursor, or other AI coding agents to build your workflow, feed them [`prompts/caal-tool-builder-seed.md`](prompts/caal-tool-builder-seed.md) as context. It contains the full CAAL tool conventions — webhook structure, error handling patterns, voice-friendly response formatting, and manifest schema.

## Quality Standards

Your tool must:

- [ ] Have a webhook trigger with description in notes
- [ ] Include at least 2 voice trigger examples
- [ ] Return voice-friendly responses (not raw JSON)
- [ ] Handle errors gracefully with helpful messages
- [ ] Wire HTTP error outputs to a Format Error node
- [ ] Not contain hardcoded secrets or user-specific URLs
- [ ] Complete in under 5 seconds for good voice UX

## Tool Tiers

| Tier | Badge | Meaning |
|------|-------|---------|
| CoreWorxLab | Green | Official tools maintained by CoreWorxLab |
| Community | Blue | Community-contributed tools |

Community contributions are welcome! Your tools will be marked as "Community" tier.

## Categories

| Category | Description |
|----------|-------------|
| `smart-home` | Home Assistant, lights, climate, security |
| `media` | Plex, Jellyfin, Jellyseerr, Sonarr, Radarr |
| `homelab` | TrueNAS, Docker, Proxmox, Unraid, PiHole, server monitoring |
| `productivity` | Calendar, tasks, email, notes |
| `developer` | GitHub, GitLab, CI/CD, code tools |
| `utilities` | Weather, timers, reminders, general purpose |
| `sports` | ESPN, fantasy sports, scores, standings |
| `social` | Discord, Slack, Reddit, Telegram, messaging |
| `other` | Everything else |

## Voice-First Design Principles

1. **Speak naturally** - Triggers should be how people actually talk
2. **Be concise** - Voice responses should be brief and scannable by ear
3. **Handle ambiguity** - Multiple ways to ask for the same thing
4. **Fail gracefully** - Error messages should be helpful, not technical

## License

By submitting a tool, you agree to the [CAAL Tool Registry License](LICENSE). In short: you keep full ownership of your tools, the registry is free for personal use, and third parties can't commercially exploit the community's work. See [LICENSE](LICENSE) for full terms.

## Questions?

Open an issue with the "question" label or join the [CAAL Discord](https://discord.gg/caal).
