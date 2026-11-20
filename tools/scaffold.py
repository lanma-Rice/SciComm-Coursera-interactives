#!/usr/bin/env python3
"""Create a folder for every lecture in assets/js/catalog.js that doesn't have one yet.

Usage (from the repo root):   python3 tools/scaffold.py
Never overwrites an existing data.js, so built lectures are safe.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INDEX = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Practice</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&display=swap">
  <link rel="stylesheet" href="../../../assets/css/scicomm.css">
</head>
<body>
  <div id="app"></div>
  <noscript>This practice activity needs JavaScript turned on.</noscript>
  <script src="../../../assets/js/catalog.js"></script>
  <script src="data.js"></script>
  <script src="../../../assets/js/scicomm.js"></script>
</body>
</html>
"""

DATA = """/* {label}
   Titles come from assets/js/catalog.js. Add activities below (see README for each type's fields). */
window.LECTURE = {{
  id: "{id}",
  activities: []
}};
"""

def load_catalog():
    src = open(os.path.join(ROOT, "assets/js/catalog.js"), encoding="utf-8").read()
    body = src.split("\nwindow.CATALOG =", 1)[1].strip().rstrip(";").strip()
    return json.loads(body)

def main():
    cat = load_catalog()
    made = kept = 0
    for c in cat["courses"]:
        for m in c["modules"]:
            for l in m["lectures"]:
                if l.get("status") == "none":
                    continue
                rel = f'{c["id"]}/{m["id"]}/{l["id"]}'
                d = os.path.join(ROOT, rel)
                os.makedirs(d, exist_ok=True)
                with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
                    f.write(INDEX)  # boilerplate is safe to refresh
                dp = os.path.join(d, "data.js")
                if os.path.exists(dp):
                    kept += 1
                else:
                    label = f'Course {c["number"]} · Module {m["number"]} · Lecture {l["number"]}: {l["title"]}'
                    with open(dp, "w", encoding="utf-8") as f:
                        f.write(DATA.format(label=label, id=rel))
                    made += 1
    print(f"Created {made} placeholder lecture(s); kept {kept} existing data.js file(s).")

if __name__ == "__main__":
    sys.exit(main())
