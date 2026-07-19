#!/usr/bin/env python3
"""Small dependency-free validator for the generated Jekyll site."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.ids: list[str] = []
        self.images_without_alt = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"] or "")
        if tag == "a" and values.get("href"):
            self.references.append(("href", values["href"] or ""))
        if tag in {"img", "script", "source"} and values.get("src"):
            self.references.append(("src", values["src"] or ""))
        if tag == "link" and values.get("href"):
            self.references.append(("href", values["href"] or ""))
        if tag == "img" and "alt" not in values:
            self.images_without_alt += 1


def local_target(site_root: Path, document: Path, reference: str) -> Path | None:
    parts = urlsplit(reference)
    if parts.scheme or parts.netloc or reference.startswith(("mailto:", "tel:", "#", "data:")):
        return None
    raw_path = unquote(parts.path)
    if not raw_path:
        return None
    if raw_path.startswith("/"):
        target = site_root / raw_path.lstrip("/")
    else:
        target = document.parent / raw_path
    if raw_path.endswith("/"):
        target = target / "index.html"
    elif not target.suffix:
        target = target / "index.html"
    return target.resolve()


def main() -> int:
    site_root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    if not (site_root / "index.html").is_file():
        print("ERROR: generated index.html is missing")
        return 1

    errors: list[str] = []
    html_files = sorted(site_root.rglob("*.html"))
    for document in html_files:
        parser = DocumentParser()
        parser.feed(document.read_text(encoding="utf-8"))
        duplicate_ids = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
        if duplicate_ids:
            errors.append(f"{document.relative_to(site_root)}: duplicate ids {duplicate_ids}")
        if parser.images_without_alt:
            errors.append(
                f"{document.relative_to(site_root)}: {parser.images_without_alt} image(s) without alt"
            )
        for attribute, reference in parser.references:
            target = local_target(site_root, document, reference)
            if target is not None and not target.exists():
                errors.append(
                    f"{document.relative_to(site_root)}: missing {attribute} target {reference}"
                )

    if errors:
        print("Site validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Validated {len(html_files)} HTML files with no missing local assets or alt text.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

