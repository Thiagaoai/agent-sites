#!/bin/bash
# Hook: PostToolUse (Write|Edit) — Auto-format HTML/CSS files with prettier if available

FILE="$1"

# Only run on HTML, CSS, and JS files
if [[ "$FILE" =~ \.(html|css|js|jsx|tsx)$ ]]; then
  if command -v prettier &> /dev/null; then
    prettier --write "$FILE" 2>/dev/null
  fi
fi

exit 0
