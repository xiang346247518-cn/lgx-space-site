# LGX · Architecture / Space / Digital

Personal architecture portfolio for Lv Guoxiang / 吕国祥. A static, bilingual website hosted at <https://xiang346247518-cn.github.io/lgx-space-site/>.

## Content updates

Edit `data/projects.json` to add or update projects. GitHub Pages publishes changes pushed to `main`.

- Keep each project’s `id` unique and stable, so shared project links keep working.
- `name`, `englishName`, `year`, `date`, `location`, `category`, `role`, `originalDescription`, `keywords`, `image` and `linkedinUrl` retain the source record.
- `translations.zh` contains the Chinese display name, location and description. `translations.en.location` provides the English location when the source is Chinese. Update a translation alongside its source when the content changes.
- A missing year displays “未注明 / Not specified”; do not invent dates. Status statements in source documents describe the time the documents were written.
- `gallery` is optional. Entries have an `image` path and `caption: {zh, en}`. Keep original PDFs private unless deliberately approved for publication.
- New images go in `assets/projects/`. The website automatically falls back to the original image if an optimised WebP version is unavailable.

The home-page selection is configured in `selectedIDs` inside `assets/site.js`. Interface translations are in `COPY`. Layout and visual styles are in `assets/site.css`.

## Language and project links

Use `?lang=zh` or `?lang=en` to share a language-specific version. The visitor’s choice is remembered on their device.

Projects have links such as `?lang=en#project/exhibition-building-1`. Native dialogs support keyboard navigation, Escape, browser Back and image enlargement. The archive supports bilingual keyword search, category filters and list/grid views.

## Development

No npm packages or build step are required. Start a local static server, for example `python3 -m http.server 8000`, then open the site in a browser.

Optional image optimisation: install Pillow and run `python scripts/build_assets.py`. Original images remain available. Motion follows `prefers-reduced-motion`; there is no forced scrolling, autoplay audio or third-party analytics.

## Design direction

Warm paper, charcoal and terracotta; a restrained typographic hierarchy; full-colour project imagery; asymmetrical editorial pacing. The interactive spatial drawing expresses the author’s perspective on behaviour, cycles and possibilities, rather than presenting a scientific simulation.

The redesign follows the design, usability, creativity and content dimensions of leading website awards. This is a design objective, not an award or certified rating.
