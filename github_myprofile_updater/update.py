import json
import sys
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
DATA_DIRECTORY = REPOSITORY_ROOT / "_data"
INCLUDES_DIRECTORY = REPOSITORY_ROOT / "_pages" / "includes"
DEFAULT_OUTPUT = Path(__file__).with_name("README.md")


def load_json(filename):
    with (DATA_DIRECTORY / filename).open(encoding="utf-8") as stream:
        return json.load(stream)


def read_include(filename):
    return (INCLUDES_DIRECTORY / filename).read_text(encoding="utf-8").strip()


def without_first_heading(markdown):
    lines = markdown.splitlines()
    if lines and lines[0].lstrip().startswith("#"):
        lines = lines[1:]
    return "\n".join(lines).strip()


def render_news(items):
    lines = ["### 🔥 News", ""]
    for item in sorted(items, key=lambda entry: entry["date"], reverse=True):
        date = item["date"].replace("-", ".")
        text = item["text"]
        if item.get("url"):
            text += f" [Details]({item['url']})"
        lines.append(f"- *{date}*: {text}")
    return "\n".join(lines)


def render_selected_publications(items):
    link_labels = {
        "project": "Project",
        "code": "Code",
        "dataset": "Dataset",
        "animation": "Animation",
    }
    selected = sorted(
        (item for item in items if item.get("featured")),
        key=lambda entry: (-entry["year"], entry["title"].casefold()),
    )

    lines = [
        "### 💻 Selected Publications",
        "",
        "The complete publication list is available on [my personal homepage](https://zhouyue.space/publications/).",
        "",
    ]
    for item in selected:
        links = item.get("links", {})
        title = item["title"]
        if links.get("paper"):
            title = f"[{title}]({links['paper']})"

        resources = [
            f"[**{label}**]({absolute_resource_url(links[key])})"
            for key, label in link_labels.items()
            if links.get(key)
        ]
        resource_text = f" {' | '.join(resources)}" if resources else ""
        note = f" **({item['note']})**" if item.get("note") else ""
        lines.append(
            f"- `{item['venue']} {item['year']}` {title}, {item['authors']}.{note}{resource_text}"
        )
    return "\n".join(lines)


def absolute_resource_url(url):
    if url.startswith("/"):
        return f"https://zhouyue.space{url}"
    return url


def build_profile():
    intro = read_include("intro.md")
    homepage = without_first_heading(read_include("homepage.md"))
    news = render_news(load_json("news.json"))
    publications = render_selected_publications(load_json("publications.json"))
    return "\n\n".join(
        [
            "## Hi there 👋",
            intro,
            f"### 🔗 Profiles\n\n{homepage}",
            news,
            publications,
        ]
    ) + "\n"


def main():
    output = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_OUTPUT
    output.write_text(build_profile(), encoding="utf-8")


if __name__ == "__main__":
    main()
