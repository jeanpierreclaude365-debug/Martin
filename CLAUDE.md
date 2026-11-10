# Times Tables Fun

A times tables practice game for young children. The whole app is one file, `index.html`, with inline CSS and JavaScript. No dependencies, no package manager, no build step.

## Run and test

- **Run:** open `index.html` in a browser (`file://` works), or serve the folder with `python3 -m http.server 8000`.
- **Build / lint:** none. Do not add a bundler, framework, npm packages, or split the file up unless asked.
- **Tests:** there is no automated suite. Verify a change by playing it in a browser: pick a table, answer right and wrong, finish a game, save initials, quit. In a cloud session, drive it with the pre-installed Playwright (`require('playwright')`, `chromium.launch()`) against the `file://` URL, and check for console errors.
- Check narrow screens too (about 360px wide); the game is mostly used on tablets and phones.

## How the app is laid out

- Three screens, `#start`, `#quiz`, `#results`, are `<section class="screen">` elements; `showScreen(id)` toggles the `active` class.
- State is a handful of top-level `let` variables (`chosenTable`, `chosenMode`, `questions`, `current`, `score`, `mistakes`, `locked`). `locked` and `confirmOpen` block input while feedback or the confirm dialog is showing.
- Settings sit at the top of the script: `MIN_TABLE`, `MAX_TABLE`, `QUESTION_COUNT` (Easy 5, Hard 10), `COLOURS`, `PRAISE`.
- One confirm dialog (`#confirmQuit`) is reused for quitting and for resetting the champion; `onConfirmYes` holds the action.
- Sounds are generated with the Web Audio API in `playNotes`. There are no audio files.

## Two ways it runs

The page is also published as a Claude Artifact, where `window.claude.use("db")` and `window.claude.use("user")` exist. Every feature that stores data must work both ways:

- **Published:** shared database. Collection `scores` (today's champion) and `opens/<user id>` (the "Used" visit counter, one document per person).
- **Plain file:** `localStorage` fallback, keys `ttf-muted`, `ttf-scores`, `ttf-used`.

Rules that follow from this:

- Always feature-detect `window.claude` and fall back to `localStorage`; never assume either is present.
- Wrap every `localStorage` and database call in `try/catch` and keep the game playable when it fails.
- Score entries are checked by `isValidEntry` (shape: `initials`, `score`, `total`, `table`, `mode`, `day`, `at`). If you change question counts or the entry shape, update `isValidEntry` to match, and keep old totals valid so saved scores still show.
- Scores are per day, keyed by `todayKey()` in the player's local time.
- Publishing the artifact is a separate step from pushing to git. Don't republish unless asked.

## Code style

- Plain modern JavaScript (`const`/`let`, arrow functions, template literals, `async/await`). No TypeScript, no modules, no libraries.
- 2-space indent, double quotes, semicolons.
- Use the `$(id)` helper for element lookups; element ids are camelCase, CSS classes are kebab-case.
- Group code under `// ---------- Section ----------` comment headers, and write short plain-English comments that explain why.
- Colours come from the CSS variables in `:root`; reuse them rather than adding new hex values.
- New `localStorage` keys take the `ttf-` prefix.
- Build user-visible text with `textContent`. Use `innerHTML` only for markup made from the app's own numbers, never for typed input such as initials.

## Writing for the players

- British spelling everywhere, in the page and in the code: "practise" (verb), "colour", `COLOURS`.
- Words a young child can read: short, friendly, encouraging, with emoji. Wrong answers get a gentle message and show the right answer; nothing scary or scolding.
- Big touch targets. Keep the on-screen number pad working, since many players have no keyboard.
- Keep accessibility intact: `aria-label` on icon-only buttons, `aria-live` on text that changes, visible focus styles, and the `prefers-reduced-motion` rule.
- Anything destructive (quitting mid-game, resetting the champion) gets an "Are you sure?" step.

## Git

- Commit messages: one short imperative sentence describing what the player sees, for example "Add mute button and a gentle sound for wrong answers".
- `master` is the main branch. Work on the branch you are given and don't open a pull request unless asked.
