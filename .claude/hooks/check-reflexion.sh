#!/bin/bash
# Hook: Stop — Reminds agent to run /reflexion before finishing
# Non-blocking reminder (exit 0) — prints warning but does not prevent stop
# Rationale: a deterministic env var check is not possible since Claude Code
# does not expose session state to shell hooks. This serves as a visible nudge.

echo "REMINDER: Did you run /reflexion before finishing? If not, consider running it."
echo "REMINDER: Visual changes? Include screenshots (mobile 375px + desktop 1280px) before delivering."
exit 0
