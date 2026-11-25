#!/usr/bin/env python3
"""Builds the design frames: inlines shared CSS, header, footer and script into each page.

Source:  design/src/site.css, design/src/pages/*.html
Output:  design/frames/*.html  (self-contained; open in Chrome, or import into Figma with html.to.design)

Each page starts with a meta comment:  <!-- title: Page title | active: home | page: Home -->
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
OUT = ROOT / "frames"
OUT.mkdir(exist_ok=True)

NAV = [
    ("home", "Home", "home.html"),
    ("about", "About", "about.html"),
    ("speaking", "Speaking", "speaking.html"),
    ("book", "Silent Screams", "silent-screams.html"),
    ("blog", "Blog", "blog.html"),
    ("contact", "Contact", "contact.html"),
]
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Marcellus&family=Manrope:wght@400;500;600;700&display=swap">'


def nav_links(active, cls=""):
    out = []
    for key, label, href in NAV:
        cur = ' aria-current="page"' if key == active else ""
        out.append(f'<a href="{href}"{cur}{cls}>{label}</a>')
    return "".join(out)


def header(active):
    m_links = "".join(
        f'<a class="m-link" href="{href}"{" aria-current=\"page\"" if key == active else ""}>{label}<small>0{i+1}</small></a>'
        for i, (key, label, href) in enumerate(NAV)
    )
    return f"""
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="home.html" aria-label="Nandita Speaks — home"><img src="../assets/logo-ivory.png" alt="Nandita Speaks" width="1073" height="753"></a>
    <nav class="nav" aria-label="Main">{nav_links(active)}</nav>
    <a class="btn btn--light btn--sm header-cta" href="contact.html" data-cta="header">Invite Nandita to Speak</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span></button>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  <div class="wrap">
    <nav aria-label="Mobile">{m_links}</nav>
  </div>
</div>"""


FOOTER = """
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <div class="stack" style="gap:28px">
        <img src="../assets/logo-ivory.png" alt="Nandita Speaks" width="1073" height="753" style="align-self:flex-start">
        <p class="muted" style="max-width:26em;color:var(--muted-dark)">Nandita Thakur speaks to women about rebuilding self-belief after life&rsquo;s setbacks.</p>
      </div>
      <nav class="footer-nav" aria-label="Footer">{nav}<a href="privacy-policy.html">Privacy Policy</a></nav>
      <div class="stack" style="gap:20px;align-items:flex-start">
        <p class="label">Speaking enquiries</p>
        <a class="btn btn--light" href="contact.html" data-cta="footer">Invite Nandita to Speak</a>
        <p class="note small"><b>Hidden</b><span>Enquiry email and social links appear here once the client confirms them.</span></p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> Nandita Thakur. All rights reserved.</span>
      <a href="privacy-policy.html">Privacy Policy</a>
    </div>
  </div>
</footer>"""

SCRIPT = """
<script>
(function () {
  // Preview modes: #public hides notes and hidden sections; #static turns off reveal motion (for Figma import)
  function mode() { var r = document.documentElement; r.classList.toggle('is-public', /public/.test(location.hash)); r.classList.toggle('is-static', /static/.test(location.hash)); }
  mode(); window.addEventListener('hashchange', mode);
  var still = /static/.test(location.hash) || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.self !== window.top;
  if (!still && 'IntersectionObserver' in window) {
    var els = [].slice.call(document.querySelectorAll('main section, main .reveal'));
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { if (el.getBoundingClientRect().top > vh) { el.classList.add('rv'); io.observe(el); } });
    document.documentElement.classList.add('js-reveal');
  }
  var y = document.querySelectorAll('[data-year]'); for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();
  // Mobile menu: toggle, Escape to close, focus restoration
  var btn = document.querySelector('.menu-btn'), menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open)); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open; document.body.style.overflow = open ? 'hidden' : '';
    if (open) { var f = menu.querySelector('a'); f && f.focus(); } else { btn.focus(); }
  }
  btn && btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn && btn.getAttribute('aria-expanded') === 'true') setMenu(false); });
  // FAQ accordion: buttons inside H3, aria-expanded + controlled panel
  var qs = document.querySelectorAll('.faq-item button');
  for (var j = 0; j < qs.length; j++) qs[j].addEventListener('click', function () {
    var open = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!open));
    document.getElementById(this.getAttribute('aria-controls')).hidden = open;
  });
})();
</script>"""


def faq(items, prefix, open_first=True):
    """items: list of (question, answer)."""
    rows = []
    for i, (q, a) in enumerate(items):
        is_open = open_first and i == 0
        pid = f"{prefix}-{i+1}"
        rows.append(
            f'<div class="faq-item"><h3><button type="button" aria-expanded="{str(is_open).lower()}" aria-controls="{pid}" id="{pid}-q">'
            f'<span>{q}</span><span class="faq-icon" aria-hidden="true"></span></button></h3>'
            f'<div class="faq-panel" id="{pid}" role="region" aria-labelledby="{pid}-q"{"" if is_open else " hidden"}><p>{a}</p></div></div>'
        )
    return '<div class="faq">' + "".join(rows) + "</div>"


def ph(caption, title="Photograph", ratio="4 / 5", dark=False, video=False, extra="", alt=""):
    """Photo slot until Nandita's real photographs are supplied. `alt` is the alt text from the Page Copy."""
    cls = "ph" + (" ph--dark" if dark else "") + (" ph--video" if video else "")
    mark = "mark-ivory.png" if dark else "mark-copper.png"
    inner = '<span class="play" aria-hidden="true"></span>' if video else f'<img class="ph-mark" src="../assets/{mark}" alt="" width="949" height="569">'
    alt_html = f'<br>Alt: &ldquo;{alt}&rdquo;' if alt else ""
    cap = f'<figcaption><b>{title}</b>{caption}{alt_html}</figcaption>' if (title or caption) else ""
    return f'<figure class="{cls}" style="aspect-ratio:{ratio};{extra}" role="img" aria-label="{alt or title}">{inner}{cap}</figure>'


def cta_band(line, title="Invite Nandita to speak", extra=""):
    """Closing band. Page Copy: H2 'Invite Nandita to speak' + one line + the primary button."""
    return f"""
<section class="cta-band" aria-labelledby="cta-h">
  <div class="wrap">
    <div class="stack" style="gap:22px">
      <img class="cta-mark" src="../assets/mark-copper.png" alt="" width="949" height="569" style="margin-bottom:6px">
      <h2 id="cta-h" class="page-title" style="max-width:12em">{title}</h2>
      <p class="lede muted" style="max-width:30em">{line}</p>{extra}
    </div>
    <a class="btn btn--light" href="contact.html" data-cta="band">Invite Nandita to Speak</a>
  </div>
</section>"""


def render(page_path):
    raw = page_path.read_text()
    m = re.match(r"<!--\s*title:(.*?)\|\s*active:(.*?)\|\s*page:(.*?)-->", raw)
    title, active, label = (s.strip() for s in m.groups())
    body = raw[m.end():]
    ctx = {"faq": faq, "ph": ph, "cta_band": cta_band}
    # {{py: expression}} blocks for repeated components
    body = re.sub(r"\{\{py:(.*?)\}\}", lambda mm: str(eval(mm.group(1), ctx)), body, flags=re.S)
    css = (SRC / "site.css").read_text()
    footer = FOOTER.replace("{nav}", nav_links(active))
    chrome_h = header(active) if active != "none" else ""
    chrome_f = footer if active != "none" else ""
    return f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="robots" content="noindex">
{FONTS}
<style>
{css}
</style>
</head>
<body>
{chrome_h}
<main id="main" data-frame="{label}">
{body}
</main>
{chrome_f}
{SCRIPT}
</body>
</html>
"""


def mirror_to_public():
    """Copy the review board into public/design-preview/ so a Vercel preview deployment serves it."""
    import shutil
    dest = ROOT.parent / "public" / "design-preview"
    if dest.exists():
        shutil.rmtree(dest)
    shutil.copytree(OUT, dest / "frames")
    shutil.copytree(ROOT / "assets", dest / "assets")
    idx = (ROOT / "index.html").read_text()
    head = '<!doctype html>\n<html lang="en-IN">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="robots" content="noindex, nofollow">\n'
    title_end = idx.index("</title>") + len("</title>")
    body = idx[title_end:]
    (dest / "index.html").write_text(head + idx[:title_end] + "\n" + body.split("<header", 1)[0] + "</head>\n<body>\n<header" + body.split("<header", 1)[1] + "\n</body>\n</html>\n")
    print("mirrored to", dest.relative_to(ROOT.parent))


if __name__ == "__main__":
    import sys
    for p in sorted((SRC / "pages").glob("*.html")):
        (OUT / p.name).write_text(render(p))
        print("built", p.name)
    if "--public" in sys.argv:
        mirror_to_public()
