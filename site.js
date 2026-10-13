(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  /* ---------- quilt blocks ----------
     Each pattern is a grid of patches. "a" is a plain square in colour a.
     "ab1" / "ab2" is a half-square triangle: colour a sits in the lower
     triangle, b in the upper; 1 and 2 are the two diagonal directions. */
  var C = {
    peach: "#FBCDB2", apricot: "#F4A582", rose: "#E3A6AE", lilac: "#D6C1DC",
    mauve: "#A66F86", paper: "#FFFAF6", blush: "#FFE3D3", marigold: "#EBA937"
  };

  var PATTERNS = {
    star: ["c ac1 ac2 c", "ca1 b b ca2", "ac2 b b ac1", "c ca2 ca1 c"],
    pinwheel: ["ab1 ba2", "ab2 ba1"],
    shoofly: ["ac2 b ac1", "b a b", "ca1 b ca2"],
    diamond: ["ab2 ab1", "ba1 ba2"],
    ninepatch: ["a c a", "c b c", "a c a"],
    checker: ["a b", "b a"]
  };
  var PATTERN_NAMES = Object.keys(PATTERNS);

  var PALETTES = [
    [C.apricot, C.rose, C.paper],
    [C.mauve, C.peach, C.paper],
    [C.rose, C.lilac, C.paper],
    [C.peach, C.mauve, C.blush],
    [C.lilac, C.apricot, C.paper],
    [C.rose, C.peach, C.paper]
  ];

  function block(name, pal, x0, y0, size) {
    var rows = PATTERNS[name].map(function (r) { return r.split(" "); });
    var u = size / rows.length;
    var key = { a: pal[0], b: pal[1], c: pal[2] };
    var out = "";
    rows.forEach(function (row, r) {
      row.forEach(function (cell, c) {
        var x = x0 + c * u, y = y0 + r * u, X = x + u, Y = y + u;
        var base = cell.length === 1 ? key[cell] : key[cell[1]];
        out += '<rect x="' + x + '" y="' + y + '" width="' + (u + 0.4) + '" height="' + (u + 0.4) + '" fill="' + base + '"/>';
        if (cell.length === 3) {
          var pts = cell[2] === "1"
            ? x + "," + y + " " + x + "," + Y + " " + X + "," + Y
            : X + "," + y + " " + X + "," + Y + " " + x + "," + Y;
          out += '<polygon points="' + pts + '" fill="' + key[cell[0]] + '"/>';
        }
      });
    });
    return out;
  }

  // Stand-in art for a piece that has no photo yet.
  function placeholder(i) {
    var name = PATTERN_NAMES[i % PATTERN_NAMES.length];
    var pal = PALETTES[i % PALETTES.length];
    var out = '<svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" shape-rendering="crispEdges" role="img" aria-label="Quilt block pattern">';
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) out += block(name, pal, c * 40, r * 40, 40);
    }
    return out + "</svg>";
  }

  function heroQuilt() {
    var layout = [
      ["star", "pinwheel", "shoofly", "diamond"],
      ["ninepatch", "star", "pinwheel", "star"],
      ["pinwheel", "diamond", "star", "shoofly"],
      ["star", "shoofly", "ninepatch", "pinwheel"],
      ["diamond", "star", "pinwheel", "star"]
    ];
    var size = 100, gap = 6, edge = 20;
    var w = edge * 2 + 4 * size + 3 * gap;
    var h = edge * 2 + 5 * size + 4 * gap;
    var out = '<svg viewBox="0 0 ' + w + " " + h + '">';
    out += '<rect width="' + w + '" height="' + h + '" rx="10" fill="' + C.mauve + '"/>';
    out += '<rect x="' + (edge - 4) + '" y="' + (edge - 4) + '" width="' + (w - 2 * edge + 8) + '" height="' + (h - 2 * edge + 8) + '" fill="' + C.paper + '"/>';
    layout.forEach(function (row, r) {
      row.forEach(function (name, c) {
        var n = r * 4 + c;
        // the one marigold patch, for the name
        var pal = (r === 2 && c === 2) ? [C.apricot, C.marigold, C.paper] : PALETTES[(n + r) % PALETTES.length];
        var x = edge + c * (size + gap), y = edge + r * (size + gap);
        out += '<g class="blk" style="animation-delay:' + (n * 45) + 'ms">' + block(name, pal, x, y, size) + "</g>";
      });
    });
    out += '<rect x="9" y="9" width="' + (w - 18) + '" height="' + (h - 18) + '" rx="5" fill="none" stroke="' + C.paper + '" stroke-opacity="0.7" stroke-width="1.5" stroke-dasharray="6 5"/>';
    return out + "</svg>";
  }

  $("hero-quilt").innerHTML = heroQuilt();

  /* ---------- gallery ---------- */
  var pieces = S.pieces || [];
  var categories = S.categories || [];
  var activeFilter = "all";

  function categoryLabel(id) {
    for (var i = 0; i < categories.length; i++) if (categories[i].id === id) return categories[i].label;
    return "";
  }

  function photoHTML(piece, i) {
    if (piece.photo) return '<img src="' + esc(piece.photo) + '" alt="' + esc(piece.title) + '" loading="lazy">';
    return placeholder(i) + '<span class="soon">Photo coming soon</span>';
  }

  function renderFilters() {
    var all = [{ id: "all", label: "Everything" }].concat(categories);
    $("filters").innerHTML = all.map(function (cat) {
      return '<button type="button" data-filter="' + esc(cat.id) + '" aria-pressed="' + (cat.id === activeFilter) + '">' + esc(cat.label) + "</button>";
    }).join("");
  }

  function renderPieces() {
    var html = "";
    pieces.forEach(function (piece, i) {
      if (activeFilter !== "all" && piece.category !== activeFilter) return;
      var wide = piece.featured && activeFilter === "all";
      var side = piece.price || piece.status || "";
      html += '<li class="piece' + (wide ? " wide" : "") + '">' +
        '<button type="button" class="piece-open" data-piece="' + i + '">' +
        '<span class="piece-photo">' + photoHTML(piece, i) + "</span>" +
        '<span class="piece-info"><span class="piece-title">' + esc(piece.title) + "</span>" +
        '<span class="piece-status">' + esc(side) + "</span></span>" +
        "</button></li>";
    });
    $("pieces").innerHTML = html || '<li class="pieces-empty">Nothing here yet. Request an order and I can make one for you.</li>';
  }

  $("filters").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    activeFilter = btn.getAttribute("data-filter");
    renderFilters();
    renderPieces();
  });

  /* ---------- piece dialog ---------- */
  var dialog = $("piece-dialog");
  var kindForCategory = {
    "quilts": "A custom quilt",
    "totes": "A tote bag",
    "bible-covers": "A Bible cover",
    "makeup-bags": "A makeup bag"
  };

  function openPiece(i) {
    var piece = pieces[i];
    if (!piece) return;
    $("pd-photo").innerHTML = photoHTML(piece, i);
    $("pd-title").textContent = piece.title;
    $("pd-meta").textContent = [categoryLabel(piece.category), piece.price, piece.status].filter(Boolean).join(", ");
    $("pd-desc").textContent = piece.description || "";
    var sold = /^sold$/i.test(piece.status || "");
    var actions = "";
    if (piece.buyUrl && !sold) actions += '<a class="btn" href="' + esc(piece.buyUrl) + '" target="_blank" rel="noopener">Buy this piece</a>';
    actions += '<button type="button" class="btn' + (piece.buyUrl && !sold ? " btn-quiet" : "") + '" data-ask="' + i + '">' +
      (sold ? "Ask for one like it" : "Ask about this piece") + "</button>";
    $("pd-actions").innerHTML = actions;
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
  }

  $("pieces").addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-piece]");
    if (btn) openPiece(Number(btn.getAttribute("data-piece")));
  });

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) { dialog.close(); return; }
    var ask = e.target.closest("button[data-ask]");
    if (!ask) return;
    var piece = pieces[Number(ask.getAttribute("data-ask"))];
    dialog.close();
    $("f-kind").value = kindForCategory[piece.category] || "A piece from the gallery";
    var message = $("f-message");
    if (!message.value) message.value = "I'm interested in the " + piece.title + ". ";
    $("order").scrollIntoView();
    $("f-name").focus({ preventScroll: true });
  });

  /* ---------- craft fairs ---------- */
  function renderFairs() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var upcoming = (S.fairs || []).map(function (fair) {
      var parts = String(fair.date || "").split("-");
      return { fair: fair, when: new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])) };
    }).filter(function (entry) {
      return !isNaN(entry.when) && entry.when >= today;
    }).sort(function (a, b) { return a.when - b.when; });

    if (!upcoming.length) {
      $("fair-list").innerHTML = '<li class="fair-empty">No fairs on the calendar right now. New dates go up here as soon as they\'re booked.</li>';
      return;
    }
    $("fair-list").innerHTML = upcoming.map(function (entry) {
      var date = entry.when.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return '<li class="fair"><span class="fair-date">' + esc(date) + "</span><span>" +
        '<span class="fair-name">' + esc(entry.fair.name) + "</span><br>" +
        '<span class="fair-detail">' + esc([entry.fair.place, entry.fair.note].filter(Boolean).join(". ")) + "</span>" +
        "</span></li>";
    }).join("");
  }

  /* ---------- about ---------- */
  function renderAbout() {
    var about = S.about || {};
    $("about-photo").innerHTML = about.photo
      ? '<img src="' + esc(about.photo) + '" alt="Brittany Doolittle" loading="lazy">'
      : placeholder(4);
    var html = (about.paragraphs || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    if (about.nameStory) html += '<p class="name-story">' + esc(about.nameStory) + "</p>";
    $("about-body").innerHTML = html;
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    $("year").textContent = new Date().getFullYear();
    if (S.email) {
      $("foot-email").textContent = S.email;
      $("foot-email").href = "mailto:" + S.email;
    }
    var social = S.social || {};
    var names = { instagram: "Instagram", facebook: "Facebook", etsy: "Etsy" };
    $("social").innerHTML = Object.keys(names).filter(function (k) { return social[k]; }).map(function (k) {
      return '<a href="' + esc(social[k]) + '" target="_blank" rel="noopener">' + names[k] + "</a>";
    }).join("");
  }

  /* ---------- order form ---------- */
  var form = $("order-form");
  var statusEl = $("form-status");

  function setStatus(text, isError) {
    statusEl.textContent = text;
    statusEl.classList.toggle("error", !!isError);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var required = [$("f-name"), $("f-email"), $("f-message")];
    var firstBad = null;
    required.forEach(function (el) {
      var bad = !el.value.trim() || !el.checkValidity();
      el.classList.toggle("invalid", bad);
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      setStatus("Add your name, a working email and a few words about what you'd like.", true);
      firstBad.focus();
      return;
    }
    if (form.botcheck.checked) return;

    var data = {
      name: $("f-name").value.trim(),
      email: $("f-email").value.trim(),
      kind: $("f-kind").value,
      needed_by: $("f-date").value,
      colors: $("f-colors").value.trim(),
      message: $("f-message").value.trim()
    };
    var subject = "Order request: " + data.kind + " (" + data.name + ")";

    if (!S.web3formsKey) {
      var body = [
        "Name: " + data.name,
        "Email: " + data.email,
        "Looking for: " + data.kind,
        data.needed_by ? "Needed by: " + data.needed_by : "",
        data.colors ? "Colors or fabrics: " + data.colors : "",
        "",
        data.message
      ].filter(function (line, i) { return line || i === 5; }).join("\n");
      window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus("Your email app should have opened with your request filled in. Press send there to finish.");
      return;
    }

    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Sending your request…");
    data.access_key = S.web3formsKey;
    data.subject = subject;
    data.from_name = "Made for Marigold website";
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data)
    }).then(function (res) { return res.json(); }).then(function (json) {
      if (!json.success) throw new Error(json.message || "Not sent");
      form.reset();
      setStatus("Request sent. I'll write back to " + data.email + " soon.");
    }).catch(function () {
      setStatus("The request didn't send. Try again, or email " + S.email + " directly.", true);
    }).then(function () { button.disabled = false; });
  });

  renderFilters();
  renderPieces();
  renderFairs();
  renderAbout();
  renderFooter();
})();
