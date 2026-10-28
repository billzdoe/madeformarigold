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
     The block from the logo quilt: dark corners, hourglass patches and a
     centre square, with cream sashing and a gold cornerstone. Each palette
     is [corners, hourglass points, centre]; the rest of the patch is white. */
  var C = {
    slate: "#61666A", terra: "#C98B7B", peach: "#F3D5C3", sage: "#8DA483",
    gold: "#E8C45A", cream: "#FBF7F2", white: "#FFFFFF"
  };

  var PALETTES = [
    [C.slate, C.terra, C.peach],
    [C.terra, C.slate, C.peach],
    [C.sage, C.terra, C.cream],
    [C.slate, C.peach, C.gold],
    [C.peach, C.terra, C.slate],
    [C.sage, C.slate, C.peach]
  ];

  // One block, 3 units square, drawn at x0,y0 with unit u.
  function block(pal, x0, y0, u) {
    var out = '<rect x="' + x0 + '" y="' + y0 + '" width="' + 3 * u + '" height="' + 3 * u + '" fill="' + C.white + '"/>';
    [[0, 0], [2, 0], [0, 2], [2, 2]].forEach(function (p) {
      out += '<rect x="' + (x0 + p[0] * u) + '" y="' + (y0 + p[1] * u) + '" width="' + u + '" height="' + u + '" fill="' + pal[0] + '"/>';
    });
    out += '<rect x="' + (x0 + u) + '" y="' + (y0 + u) + '" width="' + u + '" height="' + u + '" fill="' + pal[2] + '"/>';
    var h = u / 2, pts = [];
    // hourglasses above and below the centre point up and down
    [0, 2].forEach(function (r) {
      var x = x0 + u, y = y0 + r * u;
      pts.push([x, y, x + u, y, x + h, y + h], [x, y + u, x + u, y + u, x + h, y + h]);
    });
    // hourglasses beside the centre point left and right
    [0, 2].forEach(function (c) {
      var x = x0 + c * u, y = y0 + u;
      pts.push([x, y, x, y + u, x + h, y + h], [x + u, y, x + u, y + u, x + h, y + h]);
    });
    pts.forEach(function (t) {
      out += '<polygon points="' + t[0] + "," + t[1] + " " + t[2] + "," + t[3] + " " + t[4] + "," + t[5] + '" fill="' + pal[1] + '"/>';
    });
    return out;
  }

  // Stand-in art for a piece that has no photo yet: four blocks with sashing.
  function placeholder(i) {
    var pal = PALETTES[i % PALETTES.length];
    var u = 20, s = 8, step = 3 * u + s, size = 2 * step + s;
    var off = -step / 2;
    var out = '<svg viewBox="0 0 ' + size + " " + size + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Quilt block pattern">';
    out += '<rect width="' + size + '" height="' + size + '" fill="' + C.cream + '"/>';
    for (var r = 0; r < 3; r++) {
      for (var c = 0; c < 3; c++) {
        var x = off + s + c * step, y = off + s + r * step;
        out += block(pal, x, y, u);
        out += '<rect x="' + (x - s) + '" y="' + (y - s) + '" width="' + s + '" height="' + s + '" fill="' + C.gold + '"/>';
      }
    }
    return out + "</svg>";
  }

  /* ---------- ribbon under the hero ---------- */
  (function () {
    var words = (S.categories || []).map(function (c) { return c.label; }).concat(["Sewn one at a time", "Handmade with care"]);
    var run = words.map(function (w) { return "<span>" + esc(w) + "</span>"; }).join("");
    $("ribbon").innerHTML = run + run + run + run;
  })();

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
      var sold = /^sold$/i.test(piece.status || "");
      html += '<li class="piece' + (wide ? " wide" : "") + (sold ? " is-sold" : "") + '">' +
        '<button type="button" class="piece-open" data-piece="' + i + '">' +
        '<span class="piece-photo">' + photoHTML(piece, i) + (sold ? '<span class="sold-tag">Sold</span>' : "") + "</span>" +
        '<span class="piece-info"><span class="piece-title">' + esc(piece.title) + "</span>" +
        '<span class="piece-price' + (piece.price ? "" : " pending") + '">' + esc(piece.price || "Price coming soon") + "</span></span>" +
        "</button></li>";
    });
    $("pieces").innerHTML = html || '<li class="pieces-empty">Nothing here right now. Send a custom inquiry and I can make one for you.</li>';
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
  function openPiece(i) {
    var piece = pieces[i];
    if (!piece) return;
    $("pd-photo").innerHTML = photoHTML(piece, i);
    $("pd-title").textContent = piece.title;
    $("pd-price").textContent = piece.price || "Price coming soon";
    $("pd-meta").textContent = [categoryLabel(piece.category), piece.status].filter(Boolean).join(", ");
    $("pd-desc").textContent = piece.description || "";
    var sold = /^sold$/i.test(piece.status || "");
    var actions = "";
    if (piece.buyUrl && !sold) actions += '<a class="btn" href="' + esc(piece.buyUrl) + '" target="_blank" rel="noopener">Buy this piece</a>';
    actions += '<button type="button" class="btn' + (piece.buyUrl && !sold ? " btn-quiet" : "") + '" data-ask="' + i + '">' +
      (sold ? "Ask for one like it" : (piece.buyUrl ? "Ask a question" : "Ask to buy this piece")) + "</button>";
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
    var sold = /^sold$/i.test(piece.status || "");
    $("f-kind").value = sold ? "A custom piece" : "Buying a piece from the shop";
    var message = $("f-message");
    if (!message.value) message.value = (sold ? "I'd like one like the " : "I'd like to buy the ") + piece.title + (piece.price ? " (" + piece.price + ")" : "") + ". ";
    $("contact").scrollIntoView();
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
      var w = entry.when;
      var full = w.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
      return '<li class="fair reveal">' +
        '<time class="fair-date" datetime="' + esc(entry.fair.date) + '" aria-label="' + esc(full) + '">' +
        '<span class="fair-month">' + esc(w.toLocaleDateString("en-US", { month: "short" })) + "</span>" +
        '<span class="fair-day">' + w.getDate() + "</span>" +
        '<span class="fair-weekday">' + esc(w.toLocaleDateString("en-US", { weekday: "short" })) + "</span></time>" +
        "<span>" +
        '<span class="fair-name">' + (entry.fair.url
          ? '<a href="' + esc(entry.fair.url) + '" target="_blank" rel="noopener">' + esc(entry.fair.name) + "</a>"
          : esc(entry.fair.name)) + "</span>" +
        '<span class="fair-detail">' + esc([entry.fair.place, entry.fair.note].filter(Boolean).join(". ")) + "</span>" +
        "</span></li>";
    }).join("");

    var next = upcoming[0];
    var link = $("next-fair");
    link.innerHTML = "<span>Next craft fair: <strong>" + esc(next.fair.name) + "</strong>, " +
      esc(next.when.toLocaleDateString("en-US", { month: "short", day: "numeric" })) + "</span>";
    link.hidden = false;
  }

  /* ---------- about ---------- */
  function renderAbout() {
    var about = S.about || {};
    $("about-photo").innerHTML = about.photo
      ? '<img src="' + esc(about.photo) + '" alt="The maker behind Made for Marigold" loading="lazy">'
      : '<span class="flower"></span>';
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
      setStatus("Add your name, a working email and a message.", true);
      firstBad.focus();
      return;
    }
    if (form.botcheck.checked) return;

    var data = {
      name: $("f-name").value.trim(),
      email: $("f-email").value.trim(),
      kind: $("f-kind").value,
      message: $("f-message").value.trim()
    };
    var subject = "Website message: " + data.kind + " (" + data.name + ")";

    if (!S.web3formsKey) {
      var body = [
        "Name: " + data.name,
        "Email: " + data.email,
        "About: " + data.kind,
        "",
        data.message
      ].join("\n");
      window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      setStatus("Your email app should have opened with your message filled in. Press send there to finish.");
      return;
    }

    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Sending your message…");
    data.access_key = S.web3formsKey;
    data.subject = subject;
    data.from_name = "Made for Marigold website";
    var payload = new FormData();
    Object.keys(data).forEach(function (k) { payload.append(k, data[k]); });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload
    }).then(function (res) { return res.json(); }).then(function (json) {
      if (!json.success) throw new Error(json.message || "Not sent");
      form.reset();
      setStatus("Message sent. I'll write back to " + data.email + " soon.");
    }).catch(function () {
      setStatus("The message didn't send. Try again, or email " + S.email + " directly.", true);
    }).then(function () { button.disabled = false; });
  });

  renderFilters();
  renderPieces();
  renderFairs();
  renderAbout();
  renderFooter();

  /* ---------- reveal on scroll ---------- */
  var seen = typeof IntersectionObserver === "function" && new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      seen.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  function watch() {
    var items = document.querySelectorAll(".reveal:not(.in), .piece:not(.in)");
    Array.prototype.forEach.call(items, function (el, i) {
      if (!seen) { el.classList.add("in"); return; }
      if (el.classList.contains("piece")) el.style.transitionDelay = (i % 4) * 70 + "ms";
      seen.observe(el);
    });
  }
  watch();
  // pieces redrawn by a filter click are already on screen
  $("filters").addEventListener("click", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".piece"), function (el) { el.classList.add("in"); });
  });
})();
