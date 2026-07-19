# Yue Zhou’s academic homepage

Source for [zhouyue.space](https://zhouyue.space), built with Jekyll and published by GitHub Pages.

## Site structure

- `/` — research profile, recruitment, selected publications, news, open source, and contact
- `/publications/` — complete publication record with research-area and year filters
- `/cv/` — appointments, education, honors, service, internships, and open-source contributions

Publication and news content lives in `_data/publications.json` and `_data/news.json`. These files are the single source of truth for both the website and `github_myprofile_updater/update.py`.

## Local development

Use the GitHub Pages dependency set from `Gemfile.lock`:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000`.

To verify a production build:

```bash
JEKYLL_ENV=production bundle exec jekyll build
python scripts/validate_site.py _site
```

Pull requests also run the GitHub Pages build and static-site validator in `.github/workflows/site-check.yml`.

## Content updates

Each publication has a stable ID, year, venue, publisher title, authors, research topics, summary, optional image metadata, resource links, and a `featured` flag. Keep records ordered newest first and do not duplicate publications between Markdown files.

To preview the generated GitHub Profile section without overwriting its default output:

```bash
python github_myprofile_updater/update.py profile-preview.md
```

## Custom domain

The DNS and HTTPS release checklist is documented in [`docs/deployment.md`](docs/deployment.md). DNS changes are made at the domain provider; GitHub Pages settings are managed in the repository settings.
