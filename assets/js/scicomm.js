/* ==========================================================================
   SciComm Interactives — shared engine
   Renders a lecture page from window.LECTURE (defined in each lecture's data.js).

   Activity types available:
     - "sort"  : sort cards into categories (drag-and-drop, or click/tap a card
                 then a category; fully keyboard operable)
     - "label" : apply one of a few labels to each item, with per-item feedback

   No build step, no dependencies. Works from file:// and GitHub Pages.
   ========================================================================== */
(function () {
  "use strict";

  // ---------- helpers ----------

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;      // only used for author-written content from data.js
        else if (k === "text") node.textContent = v;
        else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function setFeedback(box, kind, lead, body) {
    box.className = "sc-feedback sc-feedback--" + kind;
    box.textContent = "";
    if (lead) box.appendChild(el("strong", { text: lead + " " }));
    box.appendChild(document.createTextNode(body || ""));
  }

  function announce(live, msg) {
    // Clear first so screen readers re-read identical messages.
    live.textContent = "";
    window.setTimeout(function () { live.textContent = msg; }, 30);
  }

  function completionPanel(text, heading) {
    return el("div", { class: "sc-complete", hidden: true, tabindex: "-1" }, [
      el("h3", { text: heading || "Nice work" }),
      el("p", { text: text })
    ]);
  }

  // ---------- SORT ----------

  function renderSort(cfg, idx) {
    var section = el("section", { class: "sc-activity", "aria-labelledby": "act" + idx + "-title" });
    var live = el("div", { class: "sr-only", "aria-live": "polite", "aria-atomic": "true" });
    var feedback = el("div", { class: "sc-feedback", role: "status" });
    var pool = el("div", { class: "sc-pool", id: "act" + idx + "-pool" });
    var complete = cfg.completion ? completionPanel(cfg.completion, cfg.completionHeading) : null;
    var selected = null;          // currently selected card button
    var suppressClick = false;    // set after a drag so the trailing click doesn't select
    var bins = {};

    section.appendChild(el("h2", { id: "act" + idx + "-title", text: cfg.title }));
    if (cfg.meta) section.appendChild(el("p", { class: "sc-meta", text: cfg.meta }));
    section.appendChild(el("p", { class: "sc-instructions", html: cfg.instructions }));
    var coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    section.appendChild(el("p", {
      class: "sc-meta",
      text: coarse ? "Tap a card, then tap the category it belongs in."
                   : "Drag a card into a category, or select a card and then select a category."
    }));

    section.appendChild(el("p", { class: "sc-pool-label", id: "act" + idx + "-poollabel", text: "Example cards" }));
    pool.setAttribute("role", "group");
    pool.setAttribute("aria-labelledby", "act" + idx + "-poollabel");
    section.appendChild(pool);
    section.appendChild(feedback);

    var binWrap = el("div", { class: "sc-bins", role: "group", "aria-label": "Categories" });
    cfg.categories.forEach(function (cat, i) {
      var list = el("ul", { class: "sc-bin-list", "aria-label": "Sorted into " + cat.label });
      // Accessible name starts with the visible text (WCAG 2.5.3 Label in Name).
      var head = el("button", {
        type: "button", class: "sc-bin-head",
        onclick: function () { tryPlace(selected, cat.id); }
      }, [
        el("span", { class: "sc-bin-num", text: String(i + 1) }),
        el("span", { text: cat.label }),
        el("span", { class: "sr-only", text: " (place selected card here)" })
      ]);
      var bin = el("div", { class: "sc-bin", "data-cat": cat.id }, [head]);
      if (cat.hint) bin.appendChild(el("p", { class: "sc-bin-hint", text: cat.hint }));
      bin.appendChild(list);
      bins[cat.id] = { node: bin, list: list, head: head, label: cat.label };
      binWrap.appendChild(bin);
    });
    section.appendChild(binWrap);

    var toolbar = el("div", { class: "sc-toolbar" }, [
      el("button", { type: "button", class: "sc-btn", text: "Start over", onclick: reset })
    ]);
    if (complete) section.appendChild(complete);
    section.appendChild(toolbar);
    section.appendChild(live);

    // --- selection ---
    function select(card) {
      if (selected && selected !== card) selected.setAttribute("aria-pressed", "false");
      selected = card;
      if (card) {
        card.setAttribute("aria-pressed", "true");
        announce(live, "Selected: " + card.dataset.text + ". Now choose a category.");
      }
      Object.keys(bins).forEach(function (k) {
        bins[k].node.classList.toggle("is-target", !!card);
      });
    }

    // --- placement ---
    function tryPlace(card, catId) {
      if (!card) {
        setFeedback(feedback, "retry", "", "Select a card first, then choose a category.");
        announce(live, "Select a card first, then choose a category.");
        return;
      }
      var data = cfg.cards[+card.dataset.i];
      if (data.category === catId) {
        var next = card.nextElementSibling || card.previousElementSibling;
        card.remove();
        select(null);
        bins[catId].list.appendChild(el("li", { class: "sc-placed" }, [
          el("p", { class: "sc-placed-text", text: data.text }),
          el("p", { class: "sc-placed-fb", text: data.feedback })
        ]));
        setFeedback(feedback, "correct", "Correct.", data.feedback);
        announce(live, "Correct. Placed in " + bins[catId].label + ". " + data.feedback);
        if (!pool.children.length) finish();
        else if (next) next.focus();
      } else {
        var hint = (cfg.wrongFeedback && cfg.wrongFeedback[data.category]) || "Not quite. Try another category.";
        setFeedback(feedback, "retry", "Not quite.", hint);
        announce(live, "Not quite. " + hint);
        card.classList.remove("is-wrong");
        void card.offsetWidth;                // restart animation
        card.classList.add("is-wrong");
        window.setTimeout(function () { card.classList.remove("is-wrong"); }, 1200);
        select(null);
        card.focus();
      }
    }

    function finish() {
      Object.keys(bins).forEach(function (k) { bins[k].head.disabled = true; });
      if (complete) {
        complete.hidden = false;
        complete.focus();
      }
    }

    // --- drag (pointer events: mouse, pen, touch) ---
    function enableDrag(card) {
      var startX, startY, ghost = null, hoverBin = null, pid = null;

      card.addEventListener("pointerdown", function (e) {
        // Touch screens use tap-to-select so swiping still scrolls the page.
        if (e.button !== 0 || e.pointerType === "touch") return;
        startX = e.clientX; startY = e.clientY; pid = e.pointerId;
        card.setPointerCapture(pid);
      });

      card.addEventListener("pointermove", function (e) {
        if (pid !== e.pointerId) return;
        if (!ghost) {
          if (Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY) < 8) return;
          ghost = card.cloneNode(true);
          ghost.removeAttribute("id");
          ghost.className = "sc-card sc-ghost";
          ghost.setAttribute("aria-hidden", "true");
          ghost.style.width = card.offsetWidth + "px";
          document.body.appendChild(ghost);
          card.classList.add("is-dragging");
          select(card);
        }
        ghost.style.left = (e.clientX - 20) + "px";
        ghost.style.top = (e.clientY - 20) + "px";
        var under = document.elementFromPoint(e.clientX, e.clientY);
        var bin = under && under.closest ? under.closest(".sc-bin") : null;
        if (bin && !section.contains(bin)) bin = null;
        if (hoverBin !== bin) {
          if (hoverBin) hoverBin.classList.remove("is-hover");
          hoverBin = bin;
          if (hoverBin) hoverBin.classList.add("is-hover");
        }
      });

      function end(e) {
        if (pid !== e.pointerId) return;
        pid = null;
        if (ghost) {
          ghost.remove(); ghost = null;
          card.classList.remove("is-dragging");
          suppressClick = true;
          window.setTimeout(function () { suppressClick = false; }, 50);
          if (hoverBin) {
            hoverBin.classList.remove("is-hover");
            var cat = hoverBin.getAttribute("data-cat");
            hoverBin = null;
            if (e.type === "pointerup") tryPlace(card, cat);
          } else {
            select(null);
          }
        }
      }
      card.addEventListener("pointerup", end);
      card.addEventListener("pointercancel", end);
    }

    function buildCards() {
      pool.textContent = "";
      shuffle(cfg.cards.map(function (c, i) { return i; })).forEach(function (i) {
        var c = cfg.cards[i];
        var card = el("button", {
          type: "button", class: "sc-card", "aria-pressed": "false",
          "data-i": i, "data-text": c.text, text: c.text,
          onclick: function () {
            if (suppressClick) return;
            select(selected === card ? null : card);
          }
        });
        enableDrag(card);
        pool.appendChild(card);
      });
    }

    function reset() {
      select(null);
      Object.keys(bins).forEach(function (k) {
        bins[k].list.textContent = "";
        bins[k].head.disabled = false;
      });
      feedback.className = "sc-feedback"; feedback.textContent = "";
      if (complete) complete.hidden = true;
      buildCards();
      if (pool.firstChild) pool.firstChild.focus();
      announce(live, "Activity reset. Cards shuffled.");
    }

    section.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && selected) { var s = selected; select(null); s.focus(); }
    });

    buildCards();
    return section;
  }

  // ---------- LABEL ----------

  function renderLabel(cfg, idx) {
    var section = el("section", { class: "sc-activity", "aria-labelledby": "act" + idx + "-title" });
    var live = el("div", { class: "sr-only", "aria-live": "polite", "aria-atomic": "true" });
    var complete = cfg.completion ? completionPanel(cfg.completion, cfg.completionHeading) : null;
    var list = el("ol", { class: "sc-items" });
    var solved = 0;

    section.appendChild(el("h2", { id: "act" + idx + "-title", text: cfg.title }));
    if (cfg.meta) section.appendChild(el("p", { class: "sc-meta", text: cfg.meta }));
    section.appendChild(el("p", { class: "sc-instructions", html: cfg.instructions }));
    section.appendChild(list);

    function build() {
      list.textContent = "";
      solved = 0;
      var items = cfg.shuffle === false ? cfg.items.map(function (_, i) { return i; })
                                        : shuffle(cfg.items.map(function (_, i) { return i; }));
      items.forEach(function (i, n) {
        var item = cfg.items[i];
        var textId = "act" + idx + "-item" + n;
        var fb = el("div", { class: "sc-feedback", role: "status" });
        var group = el("div", { class: "sc-choices", role: "group", "aria-labelledby": textId });
        var buttons = cfg.labels.map(function (label) {
          var b = el("button", {
            type: "button", class: "sc-choice", "aria-pressed": "false", text: label,
            onclick: function () { choose(b, label); }
          });
          return b;
        });
        buttons.forEach(function (b) { group.appendChild(b); });

        function choose(btn, label) {
          buttons.forEach(function (b) {
            b.setAttribute("aria-pressed", b === btn ? "true" : "false");
            b.classList.remove("is-correct", "is-wrong");
          });
          if (label === item.answer) {
            btn.classList.add("is-correct");
            buttons.forEach(function (b) { if (b !== btn) b.disabled = true; });
            setFeedback(fb, "correct", "Correct.", item.feedback);
            announce(live, "Correct. " + item.feedback);
            solved++;
            if (solved === cfg.items.length && complete) { complete.hidden = false; }
          } else {
            btn.classList.add("is-wrong");
            var msg = item.retry || cfg.retryFeedback || "Not quite. Try again.";
            setFeedback(fb, "retry", "Not quite.", msg);
            announce(live, "Not quite. " + msg);
          }
        }

        list.appendChild(el("li", { class: "sc-item" }, [
          el("p", { class: "sc-item-text", id: textId, text: item.text }),
          group, fb
        ]));
      });
      if (complete) complete.hidden = true;
    }

    if (complete) section.appendChild(complete);
    section.appendChild(el("div", { class: "sc-toolbar" }, [
      el("button", {
        type: "button", class: "sc-btn", text: "Start over",
        onclick: function () { build(); announce(live, "Activity reset."); }
      })
    ]));
    section.appendChild(live);
    build();
    return section;
  }

  // ---------- TEXT VERSION ----------
  // Same content as the interactive, as a plain reading list with answers
  // behind "Show answer". Generated from data.js, so it never needs separate editing.

  function answerBlock(summaryText, children) {
    return el("details", { class: "sc-answer" }, [el("summary", { text: summaryText })].concat(children));
  }

  var TEXT_RENDERERS = {
    sort: function (cfg) {
      var catLabel = {};
      cfg.categories.forEach(function (c, i) { catLabel[c.id] = (i + 1) + ". " + c.label; });
      var cats = el("ol", { class: "sc-text-list" }, cfg.categories.map(function (c) { return el("li", { text: c.label }); }));
      var items = el("ol", { class: "sc-text-items" }, cfg.cards.map(function (c) {
        return el("li", null, [
          el("p", { text: c.text }),
          answerBlock("Show answer", [
            el("p", null, [el("strong", { text: "Category: " }), catLabel[c.category]]),
            el("p", { text: c.feedback })
          ])
        ]);
      }));
      return [el("p", { class: "sc-text-label", text: "Categories" }), cats,
              el("p", { class: "sc-text-label", text: "Examples: decide which category fits each one" }), items];
    },
    label: function (cfg) {
      var items = el("ol", { class: "sc-text-items" }, cfg.items.map(function (it) {
        return el("li", null, [
          el("p", { text: it.text }),
          answerBlock("Show answer", [
            el("p", null, [el("strong", { text: "Answer: " }), it.answer]),
            el("p", { text: it.feedback })
          ])
        ]);
      }));
      return [el("p", { class: "sc-text-label", text: "Labels: " + cfg.labels.join(" or ") }), items];
    }
  };

  function renderTextActivity(cfg, idx) {
    var section = el("section", { class: "sc-activity sc-activity--text", "aria-labelledby": "act" + idx + "-title" });
    section.appendChild(el("h2", { id: "act" + idx + "-title", text: cfg.title }));
    section.appendChild(el("p", { class: "sc-instructions", html: cfg.instructions }));
    var r = TEXT_RENDERERS[cfg.type];
    (r ? r(cfg) : [el("p", { text: "Text version not available for this activity type." })])
      .forEach(function (n) { section.appendChild(n); });
    if (cfg.completion) {
      section.appendChild(el("div", { class: "sc-complete" }, [
        el("h3", { text: "Key takeaway" }), el("p", { text: cfg.completion })
      ]));
    }
    return section;
  }

  // ---------- page ----------

  var RENDERERS = { sort: renderSort, label: renderLabel };

  function findLecture(id) {
    // id: "c1/m1/l1-2"
    var C = window.CATALOG, parts = (id || "").split("/");
    if (!C || parts.length !== 3) return null;
    var course = C.courses.filter(function (c) { return c.id === parts[0]; })[0];
    var mod = course && course.modules.filter(function (m) { return m.id === parts[1]; })[0];
    var lec = mod && mod.lectures.filter(function (l) { return l.id === parts[2]; })[0];
    return lec ? { course: course, module: mod, lecture: lec } : null;
  }

  function isTextView() {
    return /(^|[?&])view=text(&|$)/.test(window.location.search);
  }

  function renderPage(L) {
    var meta = findLecture(L.id);
    if (!meta) { console.error("Lecture id not found in catalog:", L.id); return; }
    var textView = isTextView();
    var lectureTitle = "Lecture " + meta.lecture.number + ": " + meta.lecture.title;
    document.title = lectureTitle + (textView ? " | Text version" : " | Practice");

    var root = document.getElementById("app");
    var header = el("header", { class: "sc-header" }, [
      el("span", { html: '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="4" cy="4" r="3" fill="#196787"/><circle cx="10" cy="10" r="3" fill="#86bbdb"/></svg>' }),
      el("span", { text: "Course " + meta.course.number + ": " + meta.course.title })
    ]);
    var main = el("main", { class: "sc-main" });
    var hasActivities = L.activities && L.activities.length;

    var switcher = hasActivities ? el("a", {
      class: "sc-viewlink",
      href: textView ? window.location.pathname : "?view=text",
      text: textView ? "Switch to the interactive version" : "Prefer reading? Open the text version"
    }) : null;

    main.appendChild(el("div", { class: "sc-hero" }, [
      el("p", { class: "sc-eyebrow", text: "Module " + meta.module.number + " · " + meta.module.title }),
      el("h1", { text: lectureTitle }),
      L.intro ? el("p", { text: L.intro }) : null,
      el("div", { class: "sc-hero-row" }, [
        el("span", { class: "sc-tag", text: textView ? "Text version · not graded" : "Optional practice · not graded" }),
        switcher
      ])
    ]));

    if (!hasActivities) {
      main.appendChild(el("section", { class: "sc-activity" }, [
        el("h2", { text: "Coming soon" }),
        el("p", { text: "Practice activities for this lecture are being prepared." })
      ]));
    } else {
      L.activities.forEach(function (a, i) {
        if (textView) { main.appendChild(renderTextActivity(a, i + 1)); return; }
        var r = RENDERERS[a.type];
        if (!r) { console.error("Unknown activity type:", a.type); return; }
        main.appendChild(r(a, i + 1));
      });
    }
    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(el("footer", { class: "sc-footer", text: "Rice University · " + window.CATALOG.specialization }));
    reportHeight();
  }

  // Landing page: lists every lecture in the catalog with its status.
  function renderIndex() {
    var C = window.CATALOG, root = document.getElementById("app"), base = root.getAttribute("data-base") || "";
    var main = el("main", { class: "sc-main" });
    main.appendChild(el("div", { class: "sc-hero" }, [
      el("p", { class: "sc-eyebrow", text: "Rice Digital Learning" }),
      el("h1", { text: C.specialization + ": practice activities" }),
      el("p", { text: "Ungraded lecture practice for the Coursera specialization. Each lecture link is the URL used in a Coursera Ungraded Plugin item." })
    ]));
    C.courses.forEach(function (course) {
      var sec = el("section", { class: "sc-activity", "aria-labelledby": course.id + "-h" }, [
        el("h2", { id: course.id + "-h", text: "Course " + course.number + ": " + course.title })
      ]);
      course.modules.forEach(function (m) {
        sec.appendChild(el("h3", { class: "sc-index-module", text: "Module " + m.number + ": " + m.title }));
        sec.appendChild(el("ul", { class: "sc-index" }, m.lectures.filter(function (l) { return l.status !== "none"; }).map(function (l) {
          var ready = l.status === "ready";
          return el("li", null, [el("a", { href: base + course.id + "/" + m.id + "/" + l.id + "/index.html" }, [
            "Lecture " + l.number + ": " + l.title,
            el("span", { class: "sc-status " + (ready ? "is-ready" : "is-todo"), text: ready ? "Ready" : "Coming soon" })
          ])]);
        })));
      });
      main.appendChild(sec);
    });
    root.appendChild(el("header", { class: "sc-header" }, [el("span", { text: C.specialization })]));
    root.appendChild(main);
  }

  // Lets an embedding page size its iframe to fit (harmless if nobody listens).
  function reportHeight() {
    if (window.parent === window) return;
    var post = function () {
      window.parent.postMessage({ type: "sc-height", height: document.documentElement.scrollHeight }, "*");
    };
    post();
    if (window.ResizeObserver) new ResizeObserver(post).observe(document.body);
  }

  window.SC = { renderPage: renderPage, renderIndex: renderIndex, renderSort: renderSort, renderLabel: renderLabel };

  document.addEventListener("DOMContentLoaded", function () {
    if (window.LECTURE) renderPage(window.LECTURE);
    else if (document.getElementById("app") && document.getElementById("app").hasAttribute("data-index")) renderIndex();
  });
})();
