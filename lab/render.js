/* ==========================================================================
   Style Lab — shared renderer
   Loads content.json, renders into <main id="app">, injects style switcher
   and language toggle. Each style page only provides <html data-style> +
   one stylesheet. Deleting a style = deleting its html + css + registry
   entry here; everything else keeps working.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- style registry (id, label EN, label ZH) ---- */
  var STYLES = [
    ["terminal", "Hacker Terminal", "黑客终端"],
    ["swiss", "Swiss International", "瑞士国际主义"],
    ["ink", "Chinese Ink Wash", "中国水墨"],
    ["academic", "Academic Rigour", "学术严谨"],
    ["magazine", "Editorial Magazine", "杂志风尚"]
  ];

  var STYLE = document.documentElement.getAttribute("data-style") || "terminal";
  var BASE = document.documentElement.getAttribute("data-base") || "";
  var IS_ROOT = BASE !== "";
  var LANG = localStorage.getItem("lab-lang") || (location.hash === "#zh" ? "zh" : "en");
  var DATA = null;

  function t() { return DATA[LANG]; }
  function otherLang() { return LANG === "en" ? "zh" : "en"; }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function link(cls, text, href, newTab) {
    var a = el("a", cls, text);
    a.href = href;
    if (newTab) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  /* ================= DOM build ================= */
  function render() {
    var c = t();
    var app = document.getElementById("app");
    app.innerHTML = "";
    app.setAttribute("data-style", STYLE);

    /* ---- header ---- */
    var hd = el("header", "hd");
    var nameBox = el("div", "hd-name");
    nameBox.appendChild(el("span", "hd-name-main", c.siteName));
    var nav = el("nav", "hd-nav");
    c.nav.forEach(function (n) { nav.appendChild(link("", n[0], n[1])); });
    var tools = el("div", "hd-tools");
    var langBtn = link("lang-btn", otherLang() === "zh" ? "中文" : "EN", "#");
    langBtn.addEventListener("click", function (e) {
      e.preventDefault();
      LANG = otherLang();
      localStorage.setItem("lab-lang", LANG);
      render();
    });
    tools.appendChild(langBtn);
    hd.appendChild(nameBox); hd.appendChild(nav); hd.appendChild(tools);
    app.appendChild(hd);

    /* ---- hero ---- */
    var hero = el("section", "hero");
    hero.id = "top";
    var heroText = el("div", "hero-text");
    if (c.status) heroText.appendChild(el("p", "status", c.status));

    /* job-seeking lead-in: right under the status badge (rendered only when set) */
    if (c.seekingIntro) {
      var seek = el("div", "seeking");
      seek.appendChild(el("p", "seeking-text", c.seekingIntro));
      var seekCta = link("btn primary seeking-cta", c.seekingCta + " ↓", "#contact");
      seek.appendChild(seekCta);
      var roles = el("div", "seeking-roles");
      (c.seekingRoles || []).forEach(function (r) { roles.appendChild(el("span", "", r)); });
      seek.appendChild(roles);
      heroText.appendChild(seek);
    }

    var h1 = el("h1", "hero-title");
    h1.appendChild(document.createTextNode(c.heroTitleA + " "));
    h1.appendChild(el("span", "accent", c.heroName));
    h1.appendChild(el("span", "hero-cn", " " + c.heroNameCn));
    heroText.appendChild(h1);
    heroText.appendChild(el("p", "hero-sub", c.heroSub));
    heroText.appendChild(el("p", "hero-bio", c.heroBio));
    var cta = el("div", "cta");
    cta.appendChild(link("btn primary", c.ctaPubs, "#publications"));
    heroText.appendChild(cta);
    var stats = el("div", "stats");
    (c.stats || []).forEach(function (s) {
      var d = el("div", "stat");
      d.appendChild(el("b", "", s.n));
      d.appendChild(el("span", "", s.label));
      stats.appendChild(d);
    });
    if ((c.stats || []).length) heroText.appendChild(stats);
    var social = el("div", "social");
    c.social.forEach(function (s) { social.appendChild(link("soc", s[0], s[1], true)); });
    heroText.appendChild(social);
    hero.appendChild(heroText);
    var vis = el("div", "hero-visual");
    var img = el("img", "avatar");
    img.src = "/images/Leizhen_Spain.jpg";
    img.alt = c.heroName;
    vis.appendChild(img);
    vis.appendChild(badge(c.badge1));
    vis.appendChild(badge(c.badge2));
    hero.appendChild(vis);
    app.appendChild(hero);

    /* ---- interests ---- */
    var ints = section(c.kickerInterests, c.titleInterests, "interests");
    var tags = el("div", "tags");
    c.tags.forEach(function (x) { tags.appendChild(el("span", "tag", x)); });
    var skills = el("div", "skills");
    c.skills.forEach(function (x) { skills.appendChild(el("span", "skill", x)); });
    ints.appendChild(tags); ints.appendChild(skills);
    app.appendChild(ints);

    /* ---- publications ---- */
    var pubs = section(c.kickerPubs, c.titlePubs, "publications");
    var grid = el("div", "cards");
    c.pubs.forEach(function (p) {
      var card = el("article", "card" + (p.review ? " review" : ""));
      card.appendChild(el("span", "venue", p.venue));
      card.appendChild(el("h3", "card-title", p.title));
      card.appendChild(el("p", "authors", p.authors));
      if (p.journal) card.appendChild(el("p", "journal", p.journal));
      if (p.note) card.appendChild(el("p", "note", p.note));
      var ct = el("div", "ctags");
      p.tags.forEach(function (x) { ct.appendChild(el("span", "", x)); });
      card.appendChild(ct);
      var links = el("div", "card-links");
      p.links.forEach(function (l) { links.appendChild(link("", l[0], l[1], true)); });
      card.appendChild(links);
      grid.appendChild(card);
    });
    pubs.appendChild(grid);
    var more = el("p", "more");
    more.appendChild(document.createTextNode(c.pubsMore + " → "));
    more.appendChild(link("", "Google Scholar", t().social[0][1], true));
    pubs.appendChild(more);
    app.appendChild(pubs);

    /* ---- experience ---- */
    var exp = section(c.kickerExp, c.titleExp, "experience");
    var tl = el("div", "tl");
    c.experience.forEach(function (x) {
      var item = el("div", "tl-item");
      item.appendChild(el("span", "tl-date", x.date));
      item.appendChild(el("h3", "", x.role));
      var ul = el("ul");
      x.points.forEach(function (p) { ul.appendChild(el("li", "", p)); });
      item.appendChild(ul);
      tl.appendChild(item);
    });
    exp.appendChild(tl);
    app.appendChild(exp);

    /* ---- education ---- */
    var edu = section(c.kickerEdu, c.titleEdu, "education");
    var eg = el("div", "edu-grid");
    c.education.forEach(function (x) {
      var d = el("div", "edu-card");
      d.appendChild(el("h3", "", x.school));
      d.appendChild(el("p", "degree", x.degree));
      d.appendChild(el("p", "year", x.year));
      if (x.note) d.appendChild(el("p", "note", x.note));
      eg.appendChild(d);
    });
    edu.appendChild(eg);
    var mg = el("div", "mini-grid");
    c.extras.forEach(function (x) {
      var d = el("div", "mini-card");
      d.appendChild(el("strong", "", x.title));
      d.appendChild(el("span", "", x.text));
      mg.appendChild(d);
    });
    edu.appendChild(mg);
    app.appendChild(edu);

    /* ---- contact ---- */
    var con = section(c.kickerContact, c.titleContact, "contact");
    var cc = el("div", "contact-card");
    cc.appendChild(el("p", "contact-text", c.contactText));
    cc.appendChild(link("btn primary", c.email, "mailto:" + c.email));
    var cs = el("div", "social center");
    c.social.forEach(function (s) { cs.appendChild(link("soc", s[0], s[1], true)); });
    cc.appendChild(cs);
    con.appendChild(cc);
    app.appendChild(con);

    app.appendChild(el("footer", "ft", c.footerNote));

    if (STYLE === "academic") academicLayout(app);
    if (STYLE === "terminal") typewriter();
    document.title = c.siteName + (LANG === "zh" ? " — 主页" : " — Home");
  }

  /* academic style: move portrait plate + social links into a sticky left
     sidebar; header stays full-width, everything else scrolls on the right */
  function academicLayout(app) {
    var hero = app.querySelector(".hero");
    if (!hero) return;
    var vis = hero.querySelector(".hero-visual");
    var soc = hero.querySelector(".social");
    var side = el("aside", "side");
    if (vis) side.appendChild(vis);
    if (soc) side.appendChild(soc);
    var layout = el("div", "layout");
    var main = el("div", "main-col");
    Array.prototype.slice.call(app.children).forEach(function (n) {
      if (n.classList && n.classList.contains("hd")) return;
      main.appendChild(n);
    });
    layout.appendChild(side);
    layout.appendChild(main);
    app.appendChild(layout);
  }

  function badge(pair) {
    var b = el("div", "badge");
    b.appendChild(el("strong", "", pair[0]));
    b.appendChild(el("span", "", pair[1]));
    return b;
  }

  function section(kicker, title, id) {
    var s = el("section", "sec");
    s.id = id;
    s.appendChild(el("p", "kicker", kicker));
    s.appendChild(el("h2", "sec-title", title));
    return s;
  }

  /* ---- terminal typewriter: two parallel chains ----
     Chain A: .status -> .seeking-text
     Chain B: .hero-title (prefix typed, styled name spans pop in) -> .hero-sub -> .hero-bio
     Both chains start at the same moment. */
  function typewriter() {
    /* reduced motion: skip the effect entirely, show everything */
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function q(s) { return document.querySelector(s); }
    function hide(n) { if (n) n.style.visibility = "hidden"; }
    function show(n) { if (n) n.style.visibility = "visible"; }

    var status = q(".status"), seek = q(".seeking-text"),
        title = q(".hero-title"), sub = q(".hero-sub"), bio = q(".hero-bio");
    [status, seek, title, sub, bio].forEach(hide);
    var titleSpans = title ? title.querySelectorAll("span") : [];
    titleSpans.forEach(hide);

    function typeText(n, speed, done) {
      if (!n) { done(); return; }
      show(n);
      var full = n.textContent;
      n.textContent = "";
      var k = 0;
      (function tick() {
        n.textContent = full.slice(0, ++k);
        if (k < full.length) setTimeout(tick, speed);
        else setTimeout(done, 180);
      })();
    }

    function typeTitle(done) {
      if (!title) { done(); return; }
      show(title);
      var textNode = title.firstChild;
      var full = textNode && textNode.nodeType === 3 ? textNode.nodeValue : "";
      if (!full) { titleSpans.forEach(show); done(); return; }
      textNode.nodeValue = "";
      var k = 0;
      (function tick() {
        if (k < full.length) {
          textNode.nodeValue = full.slice(0, ++k);
          setTimeout(tick, 22);
        } else {
          titleSpans.forEach(show); /* styled name pops in whole, keeps colors */
          setTimeout(done, 180);
        }
      })();
    }

    /* chain A: status -> seeking */
    setTimeout(function () {
      typeText(status, 16, function () {
        typeText(seek, 11, function () {});
      });
    }, 250);

    /* chain B: title -> sub -> bio (same start time as chain A) */
    setTimeout(function () {
      typeTitle(function () {
        typeText(sub, 13, function () {
          typeText(bio, 6, function () {});
        });
      });
    }, 250);
  }

  /* ================= fixed social rail ================= */
  function buildRail() {
    var old = document.querySelector(".social-rail");
    if (old) old.remove();
    var rail = el("aside", "social-rail");
    var map = {
      "Google Scholar": "GS", "GitHub": "GH", "LinkedIn": "in",
      "ORCID": "iD", "ResearchGate": "RG", "Email": "@", "邮箱": "@"
    };
    t().social.forEach(function (s) {
      var a = link("", map[s[0]] || s[0].slice(0, 2), s[1], true);
      a.title = s[0];
      rail.appendChild(a);
    });
    document.body.appendChild(rail);
  }

  /* ================= style switcher ================= */
  function buildSwitcher() {
    var sw = el("aside", "switcher");
    var btn = el("button", "sw-btn", "◧ " + (LANG === "zh" ? "风格" : "Styles"));
    var panel = el("div", "sw-panel");
    panel.appendChild(el("p", "sw-title", LANG === "zh" ? "选择风格" : "Pick a style"));
    STYLES.forEach(function (s) {
      var href = BASE + s[0] + ".html";
      if (IS_ROOT && s[0] === STYLE) href = "/";
      var a = link("sw-item" + (s[0] === STYLE ? " on" : ""), s[LANG === "zh" ? 2 : 1], href);
      panel.appendChild(a);
    });
    var gal = link("sw-item sw-gallery", LANG === "zh" ? "⧉ 全部对比" : "⧉ Compare all", BASE + "index.html");
    panel.appendChild(gal);
    btn.addEventListener("click", function () { sw.classList.toggle("open"); });
    sw.appendChild(btn); sw.appendChild(panel);
    document.body.appendChild(sw);
  }

  /* ================= boot ================= */
  fetch(BASE + "content.json")
    .then(function (r) { return r.json(); })
    .then(function (d) { DATA = d; render(); buildSwitcher(); })
    .catch(function (e) {
      document.getElementById("app").textContent = "Failed to load content.json: " + e;
    });
})();
