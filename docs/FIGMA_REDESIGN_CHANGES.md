# PaceCar: Figma redesign (Login, Register, Header, Footer, Home, Car list)

Figma file: `EXE` (file key `MzJmnwSOMaJoPBpZGC5cD3`)
Scope: `client/` only. No backend or API changes.

## Change log

Newest first. Every change to the Figma redesign work is recorded here and in the sections below.

| Date | Change |
|---|---|
| 2026-10-15 | Car detail page (`CarDetail`, Figma 2:1226, content frame 2:3133): top bar, single photo with thumbnails, spec card, owner trust card, rules grid, reviews and the booking/price card. Quote, favorite, share and booking logic unchanged. |
| 2026-10-15 | Repaired `Cars` after the merge with `main`: the conflict resolution had put the old filter dropdowns and old light card markup back inside the new Figma layout. Restored the Figma filters and `FeaturedCarCard` list cards and kept main's `Pickup` / `Van` / `8 chỗ` options and its "Tiền thuê tạm tính" estimate wording. |
| 2026-10-14 | Car list page (`Cars`, Figma 2:572): new hero strip, filters, car grid and pagination. Search panel is now shared by Home and the car list. `FeaturedCarCard` gained `to`, `days`, `total` and `badges` props. |
| 2026-10-14 | Home page (Figma 2:2) and button hover/error states from the Figma button frames. |
| 2026-10-13 | Login, Register, dark Header and Footer, design tokens, fonts and logo. |

## Summary

Implements the Figma design for the shared Header/Footer, Login, Register and Home pages,
plus the button hover and error states from the Figma button frames. The site moves from the
old light theme to the dark/blue Figma look for these pages. Page logic (auth, validation,
search, favorites, API calls) is unchanged.

| Figma frame | Node id | Where it lives now |
|---|---|---|
| Login page | 2:3530 | `Login` in `client/src/pages.jsx` |
| Register page | 2:3773 | `Register` in `client/src/pages.jsx` |
| Home page | 2:2 | `Landing` in `client/src/pages.jsx` |
| Car list (Danh sách xe) | 2:572 | `Cars` in `client/src/pages.jsx` |
| Car detail (Chi tiết Xe) | 2:1226 (content 2:3133) | `CarDetail` in `client/src/pages.jsx` |
| Header / Footer | 30:29 / 30:151 (also inside the frames above) | `Navbar`, `Footer` in `client/src/components/UI.jsx` |
| Button hover/error states | 30:2002, 30:339, 30:33, 30:101, 30:188 | Login, Register, Navbar, Footer classes |

## Files changed

| File | Change |
|---|---|
| `client/src/pages.jsx` | `Login`, `Register`, `Landing`, `Cars` and `CarDetail` rebuilt; new helpers `FilterGroup`, `FilterSelect`, `pagerButton`, `QuoteRow`; new imports (`LogoMark`, `FeaturedCarCard`, `ChevronDown`); `KeyRound` import removed |
| `client/src/components/UI.jsx` | `Navbar` and `Footer` rewritten (dark); notification bell/panel colors fixed for the dark header; imports `PaceLogo` |
| `client/src/components/SearchBar.jsx` | Both variants (Home and the compact one on `/cars`) now render the Figma search panel; only the shadow differs. Search logic is unchanged |
| `client/src/components/LogoMark.jsx` | **New.** `LogoMark` (sizeable "P" mark) and `PaceLogo` (mark + PACECAR wordmark + tagline) |
| `client/src/components/FeaturedCarCard.jsx` | **New.** Car card used on Home ("Xe nổi bật") and on the car list. Optional props: `to`, `days`, `total`, `badges`, `onFavorite` |
| `client/tailwind.config.js` | New `pace-*` colors, `font-display` / `font-ui`, `shadow-card-pop`, `shadow-tab` |
| `client/src/main.jsx` | Imports self-hosted fonts (see below) |
| `client/src/index.css` | New `.pace-check` custom checkbox class |
| `client/package.json`, `client/package-lock.json` | Adds `@fontsource/barlow-condensed` and `@fontsource/manrope` |

`client/index.html` is unchanged (fonts are bundled, not loaded from Google).

## Design tokens added (`tailwind.config.js`)

- Colors under `pace`: `blue #1769ff`, `ink #0a0a0b`, `muted #65686f`, `line #d9dadd`,
  `tab #f2f5fa`, `sky #8fafff`, `dark #111112`, `page #e7e8eb`, `ice #edf3ff`, `hint #8994a7`,
  `pale #9dbdf8`, `car #72a4ff`, `tag #aeb0b5`, `foot-link #c7cede`, `foot-text #b9c1d3`,
  `star #dc201d`, `err #e41616`
- Fonts: `font-display` (Barlow Condensed), `font-ui` (Manrope, falls back to Be Vietnam Pro)
- Shadows: `shadow-card-pop`, `shadow-tab`
- Existing `brand` / `signal` tokens are untouched, so pages not yet redesigned look as before.

## Fonts

Self-hosted through `@fontsource` (includes Vietnamese glyphs), imported in `main.jsx`:
Barlow Condensed 700, 800, 900, 900 italic; Manrope 400, 600, 700, 800
(latin, latin-ext and vietnamese subsets each).
After pulling, run `npm install` in `client/`.

Fonts are applied through `font-display` / `font-ui` on the redesigned pages only. The rest of
the site still uses Be Vietnam Pro.

## Behavior notes

- **Header:** links are now Hỗ trợ, Đăng kí, Đăng nhập (or Bảng điều khiển when signed in)
  and a CTA. "Tìm xe" and "Vì sao PaceCar?" were removed from the header per the design.
  Notifications, logout and the mobile menu still work.
- **Footer:** links and contact details are unchanged; styling is the Figma dark footer.
- **Login:** same logic, new layout. The error message is plain red text under the button
  (Figma "Variant3").
- **Register:** same validation and submit logic. The 3-bullet list on the photo panel and
  the "Đã có tài khoản? Đăng nhập" line were removed per the design. The show/hide password
  buttons were kept. The submit button looks pale (Figma disabled look) until the terms box
  is ticked, but it is not actually disabled, so submitting early still shows the terms error.
- **Home:** stats, promotions and featured cars still come from the API (`/cars`,
  `/promotions`). The heart on car cards uses the same favorites endpoint as `/cars`
  (redirects to login when signed out). The Figma sample text "3 ngày" on cards is replaced by
  the car's seat count. Section icons are lucide icons, not the exact Figma icons.
  `DriftScene` is no longer used on Home (the component file is still in the repo).
- **Car list (`/cars`):** the data flow is unchanged (URL query params drive `/search/cars`,
  filters, sort, pagination, favorites). New look: photo strip with the search panel, grey results
  area, filter card on the left, 2-column car grid, pagination buttons. Details:
  - Copy changed to the design: "Giá thuê minh bạch, đã kiểm tra thông tin cơ bản".
  - Car cards are the shared `FeaturedCarCard`. The estimated total ("Tạm tính N ngày") is kept
    on the card when a start date is set, because transparent pricing is a core feature; the
    Figma card only shows "N ngày".
  - The favorite heart and the "Đặt nhanh" / "Giao xe" badges are kept although the car list frame
    does not show them (they are existing features and the filters depend on them).
  - The "trips" count and the old rating count were dropped from the card per the design.
  - On screens below 1024px the filter card collapses behind a "Bộ lọc" button, as before.
  - The error state (when a search fails) still uses the old simple layout under the new search
    panel; it was not in the Figma frame.
- **Car detail (`/cars/:id`):** data, quote requests (`/quotes`), promo codes, favorite, share,
  the mobile sticky price bar and the link to `/booking/:id?quoteId=...` are unchanged. New look:
  white top bar with "← Quay lại" / Yêu thích / Chia sẻ, one large photo, grey content area, spec
  card, description, owner and trust card, rules grid, reviews, and the booking card with the blue
  top edge. Details:
  - Below 1024px the layout is one column like the Figma frame (booking card at the bottom). From
    1024px the booking card moves to a sticky column on the right, as before.
  - The Figma frame shows one photo. When a car has more photos, small thumbnails under the photo
    switch the main image, and the photo credit line is kept.
  - The Figma sample text (price, dates, 3 ngày, review text) is replaced by real car and quote data.
  - The trust and risk pills keep their color logic (green / amber / red by score and level) in the
    Figma pill style. The "Đặt nhanh" badge is kept next to the verified mark.
  - The extra amenity chips, the weekend / driver / outside-hours / delivery quote lines and the
    deposit note are kept although the frame omits them, so the full price breakdown stays visible.
  - The fuel rule keeps main's longer wording ("không gồm trong giá thuê").
  - Icons are lucide icons, not the exact Figma icons.
- **Layout:** `Login`, `Register`, `/cars` and `/cars/:id` content sections use `-mb-20` to sit flush against the footer
  (the footer keeps its `mt-20` for all other pages).
- **Hover states (from Figma button frames):** header CTA turns white with blue text; form
  buttons turn light grey-blue with a blue border and text; header text links and footer links
  turn `#1769ff`.

## Image assets to commit (`client/public/images/`)

These were exported from Figma, not generated. Make sure they are added in the commit:

| File | Used by |
|---|---|
| `login-bg.jpg` | Login background |
| `register-side.png` | Register left photo panel |
| `footer-swoosh-right.svg`, `footer-swoosh-left.svg` | Footer |
| `home-hero` (jpg) | Home hero |
| `home-promo-1`, `home-promo-2` (jpg) | Home promo cards |
| `home-dest-hadong`, `-caugiay`, `-mydinh`, `-hoalac` (png) | Home destinations |
| `home-swoosh-benefits.svg`, `home-swoosh-steps.svg` | Home decorative swooshes |
| `search-hero` (jpg) | Photo behind the search panel on `/cars` (Figma image `16f3a.png`) |

Extensions must match the references in `pages.jsx` (in the repo: hero and promo images are `.jpg`,
destination images are `.png`). The car detail page needs no new image files (it shows the car's
own photos). Missing images fail silently (dark
background only), so check them in the browser.

## Not done yet / known gaps

- Pages not yet redesigned still use the light theme under the new dark header/footer:
  booking / "Xác minh thuê xe", dashboards, profile and the other pages.
- The Figma "Xác minh thuê xe" frame (node 12:4419) is next.
- Heading fallback font is `Impact`, which has no Vietnamese letters, so there is a brief
  mismatched flash while Barlow Condensed loads. Optional fix: set the `display` fallback in
  `tailwind.config.js` to `"Arial Narrow"`.
- The submit buttons use the Figma 36px / 42px heights, which are shorter than the 44px touch
  target in `DESIGN_SYSTEM.md`.
- Not visually verified against Figma by pixel comparison; checked by build and screenshots only.

## Testing checklist

1. `cd client && npm install && npm run dev`
2. `/login`: sign in as each role; wrong password shows the red message under the button.
3. `/register`: submit empty (field errors), tick terms (button turns blue), register a user.
4. `/`: stats show numbers, promo cards show, destination links go to `/cars?location=...`,
   heart works when signed in and redirects to login when signed out, search form submits.
5. Header: signed out vs signed in (bell, logout), and the mobile menu below 768px.
6. Footer links: `/cars`, `/#how-it-works`, `/help`.
7. `/cars`: open from the Home search and from a destination tile; change each filter and the sort
   and confirm the URL and results update; "Đặt lại" clears filters but keeps dates and location;
   pagination works; heart works; on a phone-width window the "Bộ lọc" button opens the filters.
8. `/cars/:id`: open a car from the list (dates carry over), change dates and pickup option and
   confirm the price lines update, apply a promo code, heart and share work, thumbnails switch the
   photo, "Tiếp tục đặt xe" opens the booking page, and below 1024px the sticky price bar shows.
9. `npm run build` completes without errors.

## Git notes

- Source files use CRLF line endings. Keep your editor / `core.autocrlf` consistent so the diff
  only shows real changes.
- Do not commit `client/node_modules` or `client/dist`.
- Suggested commits:
  1. `feat(ui): design tokens, fonts and logo components from Figma`
  2. `feat(ui): dark header and footer`
  3. `feat(auth): redesign login and register pages`
  4. `feat(home): redesign home page and search panel`
  5. `chore: add Figma image assets`
