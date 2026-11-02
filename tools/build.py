"""Build Gotika into one self-contained file: docs/index.html.

Usage:  python tools/build.py
Needs only the Python standard library. Open docs/index.html in a browser afterwards,
or publish the docs/ folder with GitHub Pages.
"""
import base64, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
JS_ORDER = ["i18n.js", "data.js", "scene.js", "translit.js", "scan.js", "app.js"]

font = base64.b64encode((ROOT / "assets/fonts/UnifrakturMaguntia.woff2").read_bytes()).decode()
shell = (SRC / "shell.html").read_text(encoding="utf-8").replace("__FONT__", font)
js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in JS_ORDER)
out = ROOT / "docs" / "index.html"
out.parent.mkdir(exist_ok=True)
out.write_text(shell + "\n<script>\n" + js + "\n</script>\n", encoding="utf-8")
print(f"built {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")
