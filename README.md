# SciComm Coursera Interactives

Ungraded practice activities for the **Fundamentals of Science Communication** Coursera specialization (Rice Digital Learning). Each lecture's activities are on their own page, hosted on GitHub Pages and embedded in Coursera as an **Ungraded Plugin** item.

## Structure

```
index.html                    Landing page, built automatically from the catalog
assets/
  css/scicomm.css             Shared styles (palette from the SciComm_C1 decks)
  js/catalog.js               ALL course / module / lecture titles and statuses
  js/scicomm.js               Shared engine: renders every page
tools/scaffold.py             Creates folders for any lecture added to the catalog
c1/  Course 1: Principles of Science Communication        5 modules, 22 lectures
c2/  Course 2: Fundamentals of Science Writing            4 modules, 16 lectures
c3/  Course 3: Fundamentals of Oral and Visual SciComm    4 modules, 19 lectures
  m1/                         Module 1
    l1-2/                     Lecture 1.2
      index.html              Boilerplate, identical for every lecture
      data.js                 This lecture's activities: instructions, answers, feedback
.nojekyll                     Stops GitHub Pages from processing the files
```

Every lecture folder already exists. A lecture with no activities yet shows a "Coming soon" page, so you can set up its Coursera item now and it fills in when the content goes live.

Lecture URL pattern: `https://<org>.github.io/<repo>/c{course}/m{module}/l{module}-{lecture}/`
e.g. Course 1, Lecture 2.4 → `.../c1/m2/l2-4/`

## Common tasks

**Rename a course, module or lecture:** edit `assets/js/catalog.js`. Every page and the landing page pick up the change.

**Build a lecture's activities:** fill in `activities: [...]` in that lecture's `data.js`, then set its `"status"` to `"ready"` in the catalog.

**Add or remove a lecture:** add or remove it in the catalog, then run `python3 tools/scaffold.py` from the repo root. It never overwrites an existing `data.js`. To hide a lecture without deleting its folder, set `"status": "none"`.

## Text version

Every lecture page with activities has a **"Prefer reading? Open the text version"** link (`?view=text`). It shows the same content as a numbered reading list, with each answer and its feedback behind **Show answer**. It's generated from `data.js`, so it never needs separate editing, and it also prints cleanly.

## Activity types (`type` in data.js)

| type    | What learners do |
|---------|------------------|
| `sort`  | Drag cards into categories, or select a card and then a category. Keyboard: Tab, Enter/Space, Esc. Touch: tap a card, then tap a category. |
| `label` | Pick one label per item, with per-item feedback and retry. |

More types (dropdown fill-in, click-to-highlight, click-to-revise, scenario multiple choice, matching, number entry) will be added as later lectures need them.

### `sort` fields
- `categories`: `[{ id, label, hint? }]`
- `cards`: `[{ text, category, feedback }]`. Cards are shuffled on every load.
- `wrongFeedback`: `{ categoryId: "hint" }`, keyed by the card's **correct** category
- `completion`: message shown when every card is sorted

### `label` fields
- `labels`: `["Label A", "Label B"]`
- `items`: `[{ text, answer, feedback, retry? }]`
- `retryFeedback`: default retry message
- `shuffle`: `false` keeps item order
- `completion` (optional)

## Publishing

Repo **Settings → Pages**. Source: *Deploy from a branch*, Branch: `main`, folder `/ (root)`. Changes go live about a minute after each push.

## Coursera

Add a lesson item → **+ More → Ungraded Plugin** → edit → **Edit Configuration** → replace the example URL with the lecture's GitHub Pages URL.

## Accessibility

Automated checks: axe-core 4 (WCAG 2.0/2.1/2.2 A and AA, plus best practices), run on the starting, retry and completed states and on the text version. Result: 0 violations. No horizontal scrolling at 320 px width or with text at 200%.

Built in:
- Every drag action has a click, tap and keyboard alternative (WCAG 2.5.7).
- Controls are native buttons, and the selected state is announced (`aria-pressed`).
- Feedback is announced through polite live regions. Focus moves to the completion message when an activity is finished.
- Correct and incorrect states are marked in words ("Correct." / "Not quite.") and with ✓/✗ marks, as well as color. All text meets 4.5:1 contrast.
- Visible focus ring. Honors `prefers-reduced-motion`.

Still to do: a manual check with a screen reader (VoiceOver on Mac, plus NVDA or JAWS on Windows) inside a Coursera item.
