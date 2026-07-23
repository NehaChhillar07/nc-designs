# Page-specific overrides

Drop a `<page-name>.md` here to override `../MASTER.md` for a single page.

**How it's used:** when building or reviewing a page, the ui-ux-pro-max skill (and Claude) reads `MASTER.md` first, then checks for `pages/<page-name>.md`. If it exists, its rules **override** Master for that page; otherwise Master applies.

Examples that would make sense here:
- `unsaid.md` — the dark editorial hero band + transparent-header rules for `/case-study/unsaid`
- `home.md` — homepage grid / hero specifics

Keep overrides small: only the rules that differ from Master.
