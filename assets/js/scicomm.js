/* ==========================================================================
   SciComm Interactives: shared engine (v2)
   Renders a lecture page from window.LECTURE (each lecture's data.js) and
   window.CATALOG (assets/js/catalog.js).

   A lecture has activities. An activity has one or more STEPS:
     sort       sort cards into categories (drag, click/tap, or keyboard)
     label      apply one of a few labels to each item
     choice     single-answer choice with per-option feedback and retry
     match      pick an answer from a dropdown for each item
     fill       sentence with inline dropdown blanks
     highlight  click phrases in a passage (find the problem phrases)
     revise     click a highlighted phrase and choose a replacement
     multi      select all that apply, then check
     number     type a number, then check
   An activity written with a top-level "type" (older data.js files) is
   treated as a single step of that type.

   No build step, no dependencies. Works from file:// and GitHub Pages.
   ========================================================================== */
(function () {
  "use strict";

  // ---------- helpers ----------

  var uid = 0;
  function nextId(p) { uid += 1; return (p || "sc") + "-" + uid; }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;      // author-written content from data.js only
        else if (k === "text") node.textContent = v;
        else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
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

  function stripTags(s) { var d = document.createElement("div"); d.innerHTML = s || ""; return d.textContent; }

  function setFeedback(box, kind, lead, body) {
    box.className = "sc-feedback sc-feedback--" + kind;
    box.textContent = "";
    if (lead) box.appendChild(el("strong", { text: lead + " " }));
    box.appendChild(document.createTextNode(body || ""));
  }
  function clearFeedback(box) { box.className = "sc-feedback"; box.textContent = ""; }

  function correctFb(box, text) { setFeedback(box, "correct", "Correct.", text); }
  function retryFb(box, text) { setFeedback(box, "retry", "Not quite.", text || "Try again."); }

  function htmlBlock(cls, html) { return html ? el("div", { class: cls, html: html }) : null; }

  function revealBlock(step) {
    if (!step.reveal && !step.grid) return null;
    var box = el("div", { class: "sc-reveal", hidden: true });
    if (step.grid) box.appendChild(dotGrid(step.grid));
    if (step.reveal) box.appendChild(el("div", { html: step.reveal }));
    return box;
  }

  function dotGrid(g) {
    var total = g.total || 100, marked = g.marked || 1, cols = g.cols || 10, r = 7, gap = 22;
    var rows = Math.ceil(total / cols), w = cols * gap, h = rows * gap;
    var svg = '<svg viewBox="0 0 ' + w + " " + h + '" width="' + Math.min(w, 240) + '" role="img" aria-label="' +
      (g.label || (marked + " of " + total + " dots marked")) + '">';
    for (var i = 0; i < total; i++) {
      var cx = (i % cols) * gap + gap / 2, cy = Math.floor(i / cols) * gap + gap / 2;
      svg += i < marked
        ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#e97132" stroke="#9e3f0c" stroke-width="2"/>'
        : '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#86bbdb"/>';
    }
    svg += "</svg>";
    return el("figure", { class: "sc-grid" }, [
      el("div", { html: svg }),
      g.caption ? el("figcaption", { text: g.caption }) : null
    ]);
  }

  // Every step renderer gets (step, ctx) and returns a DOM node.
  // ctx.announce(msg) speaks to screen readers; ctx.done() marks the step complete.

  // ---------- SORT ----------

  function stepSort(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var feedback = el("div", { class: "sc-feedback", role: "status" });
    var pool = el("div", { class: "sc-pool" });
    var poolLabelId = nextId("pool");
    var selected = null, suppressClick = false, bins = {};

    var coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    wrap.appendChild(el("p", {
      class: "sc-meta",
      text: coarse ? "Tap a card, then tap the category it belongs in."
                   : "Drag a card into a category, or select a card and then select a category."
    }));
    wrap.appendChild(el("p", { class: "sc-pool-label", id: poolLabelId, text: cfg.poolLabel || "Cards" }));
    pool.setAttribute("role", "group");
    pool.setAttribute("aria-labelledby", poolLabelId);
    wrap.appendChild(pool);
    wrap.appendChild(feedback);

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
    wrap.appendChild(binWrap);

    function select(card) {
      if (selected && selected !== card) selected.setAttribute("aria-pressed", "false");
      selected = card;
      if (card) {
        card.setAttribute("aria-pressed", "true");
        ctx.announce("Selected: " + card.dataset.text + ". Now choose a category.");
      }
      Object.keys(bins).forEach(function (k) { bins[k].node.classList.toggle("is-target", !!card); });
    }

    function tryPlace(card, catId) {
      if (!card) {
        setFeedback(feedback, "retry", "", "Select a card first, then choose a category.");
        ctx.announce("Select a card first, then choose a category.");
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
        correctFb(feedback, data.feedback);
        ctx.announce("Correct. Placed in " + bins[catId].label + ". " + data.feedback);
        if (!pool.children.length) {
          Object.keys(bins).forEach(function (k) { bins[k].head.disabled = true; });
          ctx.done();
        } else if (next) next.focus();
      } else {
        var hint = (cfg.wrongFeedback && cfg.wrongFeedback[data.category]) || data.retry || cfg.retryFeedback || "Try another category.";
        retryFb(feedback, hint);
        ctx.announce("Not quite. " + hint);
        card.classList.remove("is-wrong");
        void card.offsetWidth;
        card.classList.add("is-wrong");
        window.setTimeout(function () { card.classList.remove("is-wrong"); }, 1200);
        select(null);
        card.focus();
      }
    }

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
        if (bin && !wrap.contains(bin)) bin = null;
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
          } else select(null);
        }
      }
      card.addEventListener("pointerup", end);
      card.addEventListener("pointercancel", end);
    }

    shuffle(cfg.cards.map(function (c, i) { return i; })).forEach(function (i) {
      var c = cfg.cards[i];
      var card = el("button", {
        type: "button", class: "sc-card", "aria-pressed": "false",
        "data-i": i, "data-text": c.text, text: c.text,
        onclick: function () { if (!suppressClick) select(selected === card ? null : card); }
      });
      enableDrag(card);
      pool.appendChild(card);
    });

    wrap.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && selected) { var s = selected; select(null); s.focus(); }
    });
    return wrap;
  }

  // ---------- LABEL ----------

  function stepLabel(cfg, ctx) {
    var list = el("ol", { class: "sc-items" });
    var solved = 0;
    var order = cfg.items.map(function (_, i) { return i; });
    if (cfg.shuffle !== false) order = shuffle(order);
    order.forEach(function (i) {
      var item = cfg.items[i];
      var textId = nextId("item");
      var fb = el("div", { class: "sc-feedback", role: "status" });
      var group = el("div", { class: "sc-choices", role: "group", "aria-labelledby": textId });
      var buttons = cfg.labels.map(function (label) {
        var b = el("button", {
          type: "button", class: "sc-choice", "aria-pressed": "false", text: label,
          onclick: function () { choose(b, label); }
        });
        group.appendChild(b);
        return b;
      });
      function choose(btn, label) {
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
          b.classList.remove("is-correct", "is-wrong");
        });
        if (label === item.answer) {
          btn.classList.add("is-correct");
          buttons.forEach(function (b) { if (b !== btn) b.disabled = true; });
          correctFb(fb, item.feedback);
          ctx.announce("Correct. " + item.feedback);
          solved++;
          if (solved === cfg.items.length) ctx.done();
        } else {
          btn.classList.add("is-wrong");
          var msg = item.retry || cfg.retryFeedback;
          retryFb(fb, msg);
          ctx.announce("Not quite. " + (msg || "Try again."));
        }
      }
      list.appendChild(el("li", { class: "sc-item" }, [
        el("p", { class: "sc-item-text", id: textId, html: item.html || null, text: item.html ? null : item.text }),
        group, fb
      ]));
    });
    return list;
  }

  // ---------- CHOICE (single answer) ----------

  function stepChoice(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var fb = el("div", { class: "sc-feedback", role: "status" });
    var qid = nextId("q");
    var order = cfg.options.map(function (_, i) { return i; });
    if (cfg.shuffle) order = shuffle(order);
    var group = el("div", { class: "sc-options", role: "group", "aria-labelledby": cfg._labelId || qid });
    var buttons = [];
    order.forEach(function (i) {
      var o = cfg.options[i];
      var b = el("button", {
        type: "button", class: "sc-option", "aria-pressed": "false",
        onclick: function () { pick(b, o); }
      }, [
        o.letter ? el("span", { class: "sc-option-letter", text: o.letter }) : null,
        el("span", { class: "sc-option-text", html: o.html || null, text: o.html ? null : o.text })
      ]);
      buttons.push(b);
      group.appendChild(b);
    });
    function pick(btn, o) {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); b.classList.remove("is-correct", "is-wrong"); });
      if (o.correct) {
        btn.classList.add("is-correct");
        buttons.forEach(function (b) { if (b !== btn) b.disabled = true; });
        correctFb(fb, o.feedback);
        ctx.announce("Correct. " + (o.feedback || ""));
        ctx.done();
      } else {
        btn.classList.add("is-wrong");
        retryFb(fb, o.feedback || cfg.retryFeedback);
        ctx.announce("Not quite. " + (o.feedback || cfg.retryFeedback || ""));
      }
    }
    if (!cfg._labelId) wrap.appendChild(el("span", { id: qid, class: "sr-only", text: stripTags(cfg.prompt || "Answer options") }));
    wrap.appendChild(group);
    wrap.appendChild(fb);
    return wrap;
  }

  // ---------- MATCH (dropdown per item) ----------

  function stepMatch(cfg, ctx) {
    var list = el("ol", { class: "sc-items sc-match" });
    var solved = 0;
    var order = cfg.items.map(function (_, i) { return i; });
    if (cfg.shuffle) order = shuffle(order);
    order.forEach(function (i) {
      var item = cfg.items[i];
      var opts = item.options || (cfg.options || []).map(function (t) { return { text: t, correct: t === item.answer }; });
      if (cfg.shuffleOptions !== false && !item.keepOrder) opts = shuffle(opts);
      var textId = nextId("m");
      var fb = el("div", { class: "sc-feedback", role: "status" });
      var sel = el("select", { class: "sc-select", "aria-labelledby": textId + " " + textId + "-l" }, [
        el("option", { value: "", text: cfg.placeholder || "Choose…" })
      ].concat(opts.map(function (o, k) { return el("option", { value: String(k), text: o.text }); })));
      sel.addEventListener("change", function () {
        if (sel.value === "") { clearFeedback(fb); return; }
        var o = opts[+sel.value];
        if (o.correct) {
          sel.classList.add("is-correct"); sel.classList.remove("is-wrong");
          sel.setAttribute("aria-invalid", "false");
          sel.disabled = true;
          var msg = o.feedback || item.feedback;
          correctFb(fb, msg);
          ctx.announce("Correct. " + (msg || ""));
          solved++;
          if (solved === cfg.items.length) ctx.done();
        } else {
          sel.classList.add("is-wrong");
          sel.setAttribute("aria-invalid", "true");
          var r = o.feedback || item.retry || cfg.retryFeedback;
          retryFb(fb, r);
          ctx.announce("Not quite. " + (r || "Try again."));
        }
      });
      list.appendChild(el("li", { class: "sc-item" }, [
        el("div", { class: "sc-item-text", id: textId, html: item.html || null, text: item.html ? null : item.text }),
        el("label", { class: "sc-match-row" }, [
          el("span", { class: "sc-match-label", id: textId + "-l", text: item.selectLabel || cfg.selectLabel || "Answer" }),
          sel
        ]),
        fb
      ]));
    });
    return list;
  }

  // ---------- FILL (inline dropdown blanks) ----------

  function stepFill(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var p = el("p", { class: "sc-fill" });
    var fbs = el("div", { class: "sc-fill-fbs" });
    var blanks = cfg.segments.filter(function (s) { return typeof s !== "string"; });
    var solved = 0, n = 0;
    cfg.segments.forEach(function (seg) {
      if (typeof seg === "string") { p.appendChild(el("span", { html: seg })); return; }
      n += 1;
      var num = n;
      var opts = seg.options.slice();
      if (seg.shuffle) opts = shuffle(opts);
      var fb = el("div", { class: "sc-feedback", role: "status" });
      var sel = el("select", { class: "sc-select sc-select--inline", "aria-label": (seg.label || ("Blank " + num)) }, [
        el("option", { value: "", text: seg.placeholder || "Choose…" })
      ].concat(opts.map(function (o, k) { return el("option", { value: String(k), text: o.text }); })));
      sel.addEventListener("change", function () {
        if (sel.value === "") { clearFeedback(fb); return; }
        var o = opts[+sel.value];
        if (o.correct) {
          sel.classList.add("is-correct"); sel.classList.remove("is-wrong");
          sel.setAttribute("aria-invalid", "false");
          sel.disabled = true;
          var m = o.feedback || seg.correctFeedback;
          correctFb(fb, m);
          ctx.announce("Correct. " + (m || ""));
          solved++;
          if (solved === blanks.length) ctx.done();
        } else {
          sel.classList.add("is-wrong");
          sel.setAttribute("aria-invalid", "true");
          var r = o.feedback || seg.retryFeedback || cfg.retryFeedback;
          retryFb(fb, r);
          ctx.announce("Not quite. " + (r || "Try again."));
        }
      });
      p.appendChild(sel);
      fbs.appendChild(fb);
    });
    wrap.appendChild(p);
    wrap.appendChild(fbs);
    return wrap;
  }

  // ---------- HIGHLIGHT (click phrases) ----------

  function stepHighlight(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var passage = el(cfg.block ? "div" : "p", { class: "sc-passage" + (cfg.block ? " sc-passage--block" : "") });
    var fb = el("div", { class: "sc-feedback", role: "status" });
    var need = cfg.segments.filter(function (s) { return typeof s !== "string" && s.correct; }).length;
    var found = 0;
    cfg.segments.forEach(function (seg) {
      if (typeof seg === "string") { passage.appendChild(el("span", { html: seg })); return; }
      var b = el("button", { type: "button", class: "sc-phrase", "aria-pressed": "false", text: seg.text });
      b.addEventListener("click", function () {
        if (b.classList.contains("is-found")) return;
        if (seg.correct) {
          b.classList.add("is-found");
          b.setAttribute("aria-pressed", "true");
          b.setAttribute("aria-disabled", "true");
          found++;
          var extra = found < need ? " (" + found + " of " + need + " found)" : "";
          correctFb(fb, seg.feedback + extra);
          ctx.announce("Correct. " + seg.feedback + extra);
          if (found === need) ctx.done();
        } else {
          b.classList.remove("is-wrong"); void b.offsetWidth; b.classList.add("is-wrong");
          window.setTimeout(function () { b.classList.remove("is-wrong"); }, 1200);
          var msg = seg.feedback + (cfg.hint ? " " + cfg.hint : "");
          setFeedback(fb, "retry", seg.lead || "Not this one.", msg);
          ctx.announce((seg.lead || "Not this one.") + " " + msg);
        }
      });
      passage.appendChild(b);
      if (seg.after) passage.appendChild(document.createTextNode(seg.after));
    });
    wrap.appendChild(el("p", { class: "sc-meta", text: need > 1 ? "Select " + need + " phrases." : "Select one phrase." }));
    wrap.appendChild(passage);
    wrap.appendChild(fb);
    return wrap;
  }

  // ---------- REVISE (click a phrase, choose a replacement) ----------

  function stepRevise(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var passage = el("div", { class: "sc-passage sc-passage--block" });
    var panels = el("div", { class: "sc-revise-panels" });
    var targets = cfg.segments.filter(function (s) { return typeof s !== "string"; });
    var solved = 0, n = 0;
    var currentLine = el("p");
    passage.appendChild(currentLine);
    cfg.segments.forEach(function (seg) {
      if (typeof seg === "string") {
        var parts = seg.split("\n");
        parts.forEach(function (part, k) {
          if (k > 0) { currentLine = el("p"); passage.appendChild(currentLine); }
          if (part) currentLine.appendChild(el("span", { html: part }));
        });
        return;
      }
      n += 1;
      var panelId = nextId("rev");
      var label = targets.length > 1 ? "Replacement options for highlighted text " + n : "Replacement options";
      var target = el("button", {
        type: "button", class: "sc-target", "aria-expanded": "false", "aria-controls": panelId
      }, [el("span", { class: "sc-target-text", text: seg.text }), el("span", { class: "sr-only", text: " (choose a replacement)" })]);
      var panel = el("div", { class: "sc-revise-panel", id: panelId, hidden: true }, [
        el("p", { class: "sc-revise-label", id: panelId + "-l", text: seg.prompt || "Replace “" + seg.text + "” with:" })
      ]);
      var stepCtx = {
        announce: ctx.announce,
        done: function () {
          target.classList.add("is-revised");
          target.querySelector(".sc-target-text").textContent = seg.options.filter(function (o) { return o.correct; })[0].text;
          target.setAttribute("aria-expanded", "false");
          target.disabled = true;
          solved++;
          if (solved === targets.length) ctx.done();
        }
      };
      panel.appendChild(stepChoice({ options: seg.options, shuffle: seg.shuffle, _labelId: panelId + "-l" }, stepCtx));
      target.addEventListener("click", function () {
        var open = target.getAttribute("aria-expanded") === "true";
        target.setAttribute("aria-expanded", open ? "false" : "true");
        panel.hidden = open;
        if (!open) { var first = panel.querySelector(".sc-option"); if (first) first.focus(); }
      });
      currentLine.appendChild(target);
      panels.appendChild(panel);
    });
    wrap.appendChild(el("p", { class: "sc-meta", text: targets.length > 1 ? "Select each highlighted phrase to revise it." : "Select the highlighted phrase to revise it." }));
    wrap.appendChild(passage);
    wrap.appendChild(panels);
    return wrap;
  }

  // ---------- MULTI (select all that apply) ----------

  function stepMulti(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var fieldset = el("fieldset", { class: "sc-multi" }, [el("legend", { class: "sr-only", text: stripTags(cfg.prompt || "Select all that apply") })]);
    var boxes = cfg.options.map(function (o) {
      var id = nextId("cb");
      var cb = el("input", { type: "checkbox", id: id });
      var fb = el("p", { class: "sc-multi-fb", hidden: true });
      fieldset.appendChild(el("div", { class: "sc-multi-row" }, [cb, el("label", { for: id, text: o.text }), fb]));
      return { cb: cb, o: o, fb: fb };
    });
    var summary = el("div", { class: "sc-feedback", role: "status" });
    var check = el("button", { type: "button", class: "sc-btn sc-btn--primary", text: "Check answers" });
    check.addEventListener("click", function () {
      var allRight = true;
      boxes.forEach(function (b) {
        var right = b.cb.checked === !!b.o.correct;
        if (!right) allRight = false;
        b.fb.hidden = false;
        b.fb.className = "sc-multi-fb " + (b.o.correct ? "is-should" : "is-shouldnt");
        b.fb.textContent = (b.o.correct ? "Should be selected. " : "Should not be selected. ") + (b.o.feedback || "");
      });
      if (allRight) {
        correctFb(summary, cfg.correctFeedback || "You selected all the right answers.");
        boxes.forEach(function (b) { b.cb.disabled = true; });
        check.disabled = true;
        ctx.announce("Correct. " + (cfg.correctFeedback || ""));
        ctx.done();
      } else {
        retryFb(summary, cfg.retryFeedback || "Review the notes under each option, adjust your selections, and check again.");
        ctx.announce("Not quite. Review the notes under each option and try again.");
      }
    });
    wrap.appendChild(fieldset);
    wrap.appendChild(el("div", { class: "sc-toolbar" }, [check]));
    wrap.appendChild(summary);
    return wrap;
  }

  // ---------- NUMBER ----------

  function stepNumber(cfg, ctx) {
    var wrap = el("div", { class: "sc-step-body" });
    var id = nextId("num");
    var input = el("input", { type: "text", inputmode: "numeric", id: id, class: "sc-number", autocomplete: "off" });
    var fb = el("div", { class: "sc-feedback", role: "status" });
    var check = el("button", { type: "button", class: "sc-btn sc-btn--primary", text: "Check" });
    function go() {
      var v = parseFloat(String(input.value).replace(/[, ]/g, ""));
      if (v === cfg.answer) {
        input.disabled = true; check.disabled = true; input.classList.remove("is-wrong"); input.classList.add("is-correct");
        correctFb(fb, cfg.correctFeedback);
        ctx.announce("Correct. " + cfg.correctFeedback);
        ctx.done();
      } else {
        input.classList.add("is-wrong");
        retryFb(fb, cfg.retryFeedback);
        ctx.announce("Not quite. " + cfg.retryFeedback);
      }
    }
    check.addEventListener("click", go);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") go(); });
    wrap.appendChild(el("p", { class: "sc-fill" }, [
      el("label", { for: id, html: cfg.before || "" }), " ", input, " ", el("span", { html: cfg.after || "" }), " ", check
    ]));
    wrap.appendChild(fb);
    return wrap;
  }

  var STEPS = {
    sort: stepSort, label: stepLabel, choice: stepChoice, match: stepMatch, fill: stepFill,
    highlight: stepHighlight, revise: stepRevise, multi: stepMulti, number: stepNumber
  };

  // ---------- ACTIVITY ----------

  function renderActivity(cfg, idx) {
    var section = el("section", { class: "sc-activity", "aria-labelledby": "act" + idx + "-title" });
    var live = el("div", { class: "sr-only", "aria-live": "polite", "aria-atomic": "true" });
    function announce(msg) { live.textContent = ""; window.setTimeout(function () { live.textContent = msg; }, 30); }

    section.appendChild(el("h2", { id: "act" + idx + "-title", text: cfg.title }));
    if (cfg.meta) section.appendChild(el("p", { class: "sc-meta", text: cfg.meta }));
    if (cfg.instructions) section.appendChild(el("p", { class: "sc-instructions", html: cfg.instructions }));
    if (cfg.figure) section.appendChild(el("div", { class: "sc-figure", html: cfg.figure }));
    var holder = section;
    if (cfg.layout === "side") { holder = el("div", { class: "sc-side" }); section.appendChild(holder); }
    if (cfg.context) holder.appendChild(htmlBlock("sc-context", cfg.context));

    var steps = cfg.steps || [cfg];
    var remaining = steps.length;
    var complete = cfg.completion ? el("div", { class: "sc-complete", hidden: true, tabindex: "-1" }, [
      el("h3", { text: cfg.completionHeading || "Key takeaway" }),
      el("div", { html: cfg.completion })
    ]) : null;

    steps.forEach(function (step, i) {
      var r = STEPS[step.type];
      if (!r) { console.error("Unknown step type:", step.type); return; }
      var box = el("div", { class: "sc-step" });
      if (cfg.steps && step.heading) box.appendChild(el("h3", { class: "sc-step-heading", text: step.heading }));
      if (cfg.steps && step.instructions) box.appendChild(el("p", { class: "sc-instructions", html: step.instructions }));
      if (step.figure) box.appendChild(el("div", { class: "sc-figure", html: step.figure }));
      if (cfg.steps && step.context) box.appendChild(htmlBlock("sc-context", step.context));
      if (step.prompt) box.appendChild(el("p", { class: "sc-prompt", html: step.prompt }));
      var reveal = revealBlock(step);
      var done = false;
      box.appendChild(r(step, {
        announce: announce,
        done: function () {
          if (done) return;
          done = true;
          if (reveal) reveal.hidden = false;
          remaining -= 1;
          if (remaining === 0 && complete) { complete.hidden = false; complete.focus(); }
        }
      }));
      if (reveal) box.appendChild(reveal);
      holder.appendChild(box);
    });

    if (complete) section.appendChild(complete);
    section.appendChild(el("div", { class: "sc-toolbar" }, [
      el("button", {
        type: "button", class: "sc-btn", text: "Start over",
        onclick: function () {
          var fresh = renderActivity(cfg, idx);
          section.replaceWith(fresh);
          var h = fresh.querySelector("h2"); h.setAttribute("tabindex", "-1"); h.focus();
        }
      })
    ]));
    section.appendChild(live);
    return section;
  }

  // ---------- TEXT VERSION ----------
  // The same content as a reading list, with answers behind "Show answer".

  function answer(children) {
    return el("details", { class: "sc-answer" }, [el("summary", { text: "Show answer" })].concat(children));
  }
  function ans(label, text) { return el("p", null, [el("strong", { text: label + " " }), text]); }
  function fbp(text) { return text ? el("p", { text: text }) : null; }

  var TEXT = {
    sort: function (s) {
      var catLabel = {};
      s.categories.forEach(function (c, i) { catLabel[c.id] = (i + 1) + ". " + c.label; });
      return [
        el("p", { class: "sc-text-label", text: "Categories" }),
        el("ol", { class: "sc-text-list" }, s.categories.map(function (c) { return el("li", { text: c.label }); })),
        el("p", { class: "sc-text-label", text: "Decide which category fits each one" }),
        el("ol", { class: "sc-text-items" }, s.cards.map(function (c) {
          return el("li", null, [el("p", { text: c.text }), answer([ans("Category:", catLabel[c.category]), fbp(c.feedback)])]);
        }))
      ];
    },
    label: function (s) {
      return [
        el("p", { class: "sc-text-label", text: "Labels: " + s.labels.join(" or ") }),
        el("ol", { class: "sc-text-items" }, s.items.map(function (it) {
          return el("li", null, [el("p", { text: it.text || stripTags(it.html) }), answer([ans("Answer:", it.answer), fbp(it.feedback)])]);
        }))
      ];
    },
    choice: function (s) {
      var right = s.options.filter(function (o) { return o.correct; })[0];
      return [
        el("ol", { class: "sc-text-list", type: "A" }, s.options.map(function (o) { return el("li", { text: o.text || stripTags(o.html) }); })),
        answer([ans("Answer:", right.text || stripTags(right.html)), fbp(right.feedback)].concat(
          s.options.filter(function (o) { return !o.correct && o.feedback; }).map(function (o) {
            return el("p", { class: "sc-text-other" }, [el("em", { text: (o.text || stripTags(o.html)) + ": " }), o.feedback]);
          })))
      ];
    },
    match: function (s) {
      var shared = s.options ? [el("p", { class: "sc-text-label", text: "Options: " + s.options.join(" · ") })] : [];
      return shared.concat([el("ol", { class: "sc-text-items" }, s.items.map(function (it) {
        var opts = it.options;
        var right = opts ? opts.filter(function (o) { return o.correct; })[0].text : it.answer;
        var rightFb = opts ? opts.filter(function (o) { return o.correct; })[0].feedback : null;
        return el("li", null, [
          el("p", { text: (it.text || stripTags(it.html)) }),
          opts ? el("p", { class: "sc-text-opts", text: (it.selectLabel ? it.selectLabel + " " : "Options: ") + opts.map(function (o) { return o.text; }).join(" / ") }) : null,
          answer([ans("Answer:", right), fbp(rightFb || it.feedback)])
        ]);
      }))]);
    },
    fill: function (s) {
      var sentence = s.segments.map(function (g) { return typeof g === "string" ? stripTags(g) : "______"; }).join("");
      var n = 0;
      return [el("p", { class: "sc-text-sentence", text: sentence }),
        el("ol", { class: "sc-text-items" }, s.segments.filter(function (g) { return typeof g !== "string"; }).map(function (g) {
          n++;
          var right = g.options.filter(function (o) { return o.correct; })[0];
          return el("li", null, [
            el("p", { text: (g.label || "Blank " + n) + ": " + g.options.map(function (o) { return o.text; }).join(" / ") }),
            answer([ans("Answer:", right.text), fbp(right.feedback || g.correctFeedback)])
          ]);
        }))];
    },
    highlight: function (s) {
      var text = s.segments.map(function (g) { return typeof g === "string" ? stripTags(g) : "[" + g.text + "]" + (g.after || ""); }).join("");
      return [el("p", { class: "sc-text-sentence", text: text }),
        answer(s.segments.filter(function (g) { return typeof g !== "string"; }).map(function (g) {
          return el("p", null, [el("strong", { text: g.text + " " }), (g.correct ? "(select) " : "(leave) ") + g.feedback]);
        }))];
    },
    revise: function (s) {
      var out = [el("p", { class: "sc-text-sentence", text: s.segments.map(function (g) { return typeof g === "string" ? stripTags(g) : "[" + g.text + "]"; }).join("") })];
      s.segments.filter(function (g) { return typeof g !== "string"; }).forEach(function (g) {
        out = out.concat([el("p", { class: "sc-text-label", text: "Replace “" + g.text + "” with:" })]).concat(TEXT.choice(g));
      });
      return out;
    },
    multi: function (s) {
      return [el("ul", { class: "sc-text-list" }, s.options.map(function (o) { return el("li", { text: o.text }); })),
        answer(s.options.map(function (o) {
          return el("p", null, [el("strong", { text: (o.correct ? "Select: " : "Don’t select: ") }), o.text + ". " + (o.feedback || "")]);
        }))];
    },
    number: function (s) {
      return [el("p", { class: "sc-text-sentence", text: stripTags(s.before) + " ____ " + stripTags(s.after || "") }),
        answer([ans("Answer:", String(s.answer)), fbp(s.correctFeedback)])];
    }
  };

  function renderTextActivity(cfg, idx) {
    var section = el("section", { class: "sc-activity sc-activity--text", "aria-labelledby": "act" + idx + "-title" });
    section.appendChild(el("h2", { id: "act" + idx + "-title", text: cfg.title }));
    if (cfg.instructions) section.appendChild(el("p", { class: "sc-instructions", html: cfg.instructions }));
    if (cfg.figure) section.appendChild(el("div", { class: "sc-figure", html: cfg.figure }));
    if (cfg.context) section.appendChild(htmlBlock("sc-context", cfg.context));
    (cfg.steps || [cfg]).forEach(function (step) {
      var box = el("div", { class: "sc-step" });
      if (cfg.steps && step.heading) box.appendChild(el("h3", { class: "sc-step-heading", text: step.heading }));
      if (cfg.steps && step.instructions) box.appendChild(el("p", { class: "sc-instructions", html: step.instructions }));
      if (step.figure) box.appendChild(el("div", { class: "sc-figure", html: step.figure }));
      if (cfg.steps && step.context) box.appendChild(htmlBlock("sc-context", step.context));
      if (step.prompt) box.appendChild(el("p", { class: "sc-prompt", html: step.prompt }));
      var r = TEXT[step.type];
      (r ? r(step) : []).forEach(function (n) { if (n) box.appendChild(n); });
      if (step.reveal || step.grid) {
        var rv = el("div", { class: "sc-reveal" });
        if (step.grid) rv.appendChild(dotGrid(step.grid));
        if (step.reveal) rv.appendChild(el("div", { html: step.reveal }));
        box.appendChild(el("details", { class: "sc-answer" }, [el("summary", { text: "Show what comes next" }), rv]));
      }
      section.appendChild(box);
    });
    if (cfg.completion) {
      section.appendChild(el("div", { class: "sc-complete" }, [el("h3", { text: "Key takeaway" }), el("div", { html: cfg.completion })]));
    }
    return section;
  }

  // ---------- page ----------

  function findLecture(id) {
    var C = window.CATALOG, parts = (id || "").split("/");
    if (!C || parts.length !== 3) return null;
    var course = C.courses.filter(function (c) { return c.id === parts[0]; })[0];
    var mod = course && course.modules.filter(function (m) { return m.id === parts[1]; })[0];
    var lec = mod && mod.lectures.filter(function (l) { return l.id === parts[2]; })[0];
    return lec ? { course: course, module: mod, lecture: lec } : null;
  }

  function isTextView() { return /(^|[?&])view=text(&|$)/.test(window.location.search); }

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
      L.intro ? el("p", { html: L.intro }) : null,
      el("div", { class: "sc-hero-row" }, [
        el("span", { class: "sc-tag", text: textView ? "Text version · not graded" : "Optional practice · not graded" }),
        switcher
      ])
    ]));

    if (!hasActivities) {
      var nat = meta.lecture.status === "coursera";
      main.appendChild(el("section", { class: "sc-activity" }, [
        el("h2", { text: nat ? "Practice is in Coursera" : "Coming soon" }),
        el("p", { text: nat ? "This lecture’s practice questions are a practice quiz in the Coursera course."
                            : "Practice activities for this lecture are being prepared." })
      ]));
    } else {
      L.activities.forEach(function (a, i) {
        main.appendChild(textView ? renderTextActivity(a, i + 1) : renderActivity(a, i + 1));
      });
    }
    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(el("footer", { class: "sc-footer", text: "Rice University · " + window.CATALOG.specialization }));
    reportHeight();
  }

  function renderIndex() {
    var C = window.CATALOG, root = document.getElementById("app");
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
          var ready = l.status === "ready", native = l.status === "coursera";
          return el("li", null, [el("a", { href: course.id + "/" + m.id + "/" + l.id + "/index.html" }, [
            "Lecture " + l.number + ": " + l.title,
            el("span", {
              class: "sc-status " + (ready ? "is-ready" : "is-todo"),
              text: ready ? "Ready" : native ? "Practice quiz in Coursera" : "Coming soon"
            })
          ])]);
        })));
      });
      main.appendChild(sec);
    });
    root.appendChild(el("header", { class: "sc-header" }, [el("span", { text: C.specialization })]));
    root.appendChild(main);
  }

  function reportHeight() {
    if (window.parent === window) return;
    var post = function () {
      window.parent.postMessage({ type: "sc-height", height: document.documentElement.scrollHeight }, "*");
    };
    post();
    if (window.ResizeObserver) new ResizeObserver(post).observe(document.body);
  }

  window.SC = { renderPage: renderPage, renderIndex: renderIndex, renderActivity: renderActivity, steps: STEPS };

  document.addEventListener("DOMContentLoaded", function () {
    if (window.LECTURE) renderPage(window.LECTURE);
    else if (document.getElementById("app") && document.getElementById("app").hasAttribute("data-index")) renderIndex();
  });
})();
