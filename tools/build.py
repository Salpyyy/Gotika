"""Build Gotika into one self-contained file: docs/index.html.

Usage:  python tools/build.py
Needs only the Python standard library. Open docs/index.html in a browser afterwards,
or publish the docs/ folder (Netlify / GitHub Pages).
"""
import base64, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
JS_ORDER = ["i18n.js", "data.js", "scene.js", "translit.js", "scan.js", "app.js"]

font = base64.b64encode((ROOT / "assets/fonts/UnifrakturMaguntia.woff2").read_bytes()).decode()
shell = (SRC / "shell.html").read_text(encoding="utf-8").replace("__FONT__", font)
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in JS_ORDER)

# shell.html = head part (title, meta, styles) + body part (from <div id="app">)
cut = shell.index('<div id="app">')
head, body = shell[:cut], shell[cut:]

HEAD_EXTRA = """<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Gotika">
<link rel="apple-touch-icon" href="icon-192.png">
<link rel="icon" type="image/png" href="icon-192.png">
"""
page = ("<!doctype html>\n<html lang=\"lv\">\n<head>\n" + HEAD_EXTRA + head.strip() +
        "\n</head>\n<body>\n" + body.strip() + "\n<script>\n" + js + "\n</script>\n</body>\n</html>\n")

out = ROOT / "docs" / "index.html"
out.parent.mkdir(exist_ok=True)
out.write_text(page, encoding="utf-8")
print(f"built {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")
