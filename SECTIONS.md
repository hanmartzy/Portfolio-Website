# Portfolio Website — Section Glossary

Shared vocabulary for instructions. Each name maps 1:1 to the code
(`src/App.tsx`, `src/index.css`). Use these names when requesting changes.

## Global — appears on every page

| Name | What it is | Code |
|---|---|---|
| **Header** | Top bar: circled home button + FILM / LIVE / POST tabs | `.site-header`, `Header()` |
| **Footer** | Bottom bar: "2026 © HANA MARTINEZ" + BACK TO TOP button | `.site-footer`, `Footer()` |
| **Project Modal** | Popup window (photo/video + description) opened from some action buttons | `.modal-backdrop` / `.modal` |
| **Gallery Lightbox** | Full-screen swipeable gallery viewer (opened via VIEW GALLERY) | `.gallery-backdrop`, `GalleryLightbox()` |

## Home page `/`

| Name | What it is | Code |
|---|---|---|
| **Banner** | Full-bleed photo behind "CREATED TO CREATE." at the top | `.channel-hero` / `.channel-banner` |
| **Selected Works section** | Heading + 3 work cards + 3 discipline cards (one block) | `.home-work`, `.section-heading` |
| **Work cards** | GAME NA?, COUNTER CULTURE, PLDT FIBER FEST thumbnails; deep-link to exact projects (`/{route}#project-{anchor}`) | `.video-card` / `.video-thumb` |
| **Discipline cards** | 01 FILM / 02 LIVE / 03 POST text boxes; link to their pages | `.discipline-card` |
| **Pair row** | One work card + its discipline card anchored together (work above, discipline below) | `.pair-row` inside `.pair-list` |
| **Phone carousel** | Mobile-only: swipeable pair rows + bottom arrows and dot indicators | `.pair-carousel`, `.carousel-controls`, `.carousel-arrow`, `.carousel-indicators` |
| **Showreel section** | Vertical grey "2025 SHOWREEL" label beside embedded YouTube player (auto-fitted to video height) | `.home-showreel`, `.showreel-row`, `.showreel-label`, `.video-container` |
| **Contact section** | "AVAILABLE FOR PROJECTS" / LET'S CREATE. / email link | `.contact` |

### Home data sources

- Work cards: `projects` array in `HomePage()`
- Discipline cards: `disciplines` record in `HomePage()`
- Deep-link anchors: `project-game-na`, `project-counter-culture`, `project-pldt-fiber-fest`

## Film page `/film`

| Name | What it is | Code |
|---|---|---|
| **Film title block** | "FILM PRODUCTION" heading + description + ARCHIVES tag | `.film-top` / `.film-title` |
| **Archive rows** | 3 alternating project entries: GAME NA?, RAGING RACHEL, THE WONDERFUL BLOOD | `.archive`, `.archive-row`, `.archive-list`; data from `filmProjects` |
| **Film showreel teaser** | Bottom clickable image strip with play icon (opens Project Modal) | `.showreel` (film-page scoped) |

## Live page `/live`

| Name | What it is | Code |
|---|---|---|
| **Live hero** | Full-width control-room photo with "LIVE PRODUCTION" title overlay | `.live-hero`, `.live-title` |
| **Event cards** | Grid of COUNTER CULTURE / HIGH SCHOOL CONFERENCE / WORSHIP CONFERENCE — photo + VIEW GALLERY pill + date under title | `.video-grid`, `.view-gallery`, `.card-year`; data from `liveProjects` |

## Post page `/post`

| Name | What it is | Code |
|---|---|---|
| **Post intro** | Eyebrow tag + "POST PRODUCTION" heading + paragraph | `.post-intro`, `.eyebrow` |
| **Post hero** | Parallax image below intro (currently empty) | `.post-hero` |
| **Post rows** | Numbered entries: PLDT FIBER FEST, SOMEWHERE IN THE CITY, FAVOR COLLEGE GETAWAY | `.post-works`, `.post-row`, `.post-copy`, `.post-image`; data from `postProjects` |

## Conventions

- Routes are real URLs (`/`, `/film`, `/live`, `/post`) via `getRoute()`.
- Verification after edits: `deno task typecheck && deno run -A npm:vite build`.
- Dev server: `http://localhost:5173` (phone: `http://192.168.100.209:5173`).
