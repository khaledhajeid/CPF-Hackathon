## Design Context

This project has `PRODUCT.md` and `DESIGN.md` at the repo root — read both before any design/UI work.

- **Register:** brand (public marketing/institutional site is primary; Login/Admin Dashboard are secondary, product-register surfaces).
- **North Star:** "The National Atrium" — prestigious/national/aspirational + warm/empowering/youthful + confident/modern/results-driven, held together, not traded off.
- **Colors:** CPF Red `#721F31` (flat surfaces) + Interactive Red `#8a1538` (buttons/links/active states) + Gold `#C08F2D` (rationed to badges/seams/single CTAs — never a fill color). See DESIGN.md's Red Duality Rule and Gold Discipline Rule.
- **Hard constraint:** RTL-first Arabic (`dir="rtl"`), and animations must stay smooth on low-end mobile + older desktops — hardware-accelerated `transform`/`opacity` only, no animated `box-shadow`/layout properties, no heavy `backdrop-filter` by default.
- **Avoid:** gradient text, side-stripe borders, uppercase tracked eyebrows, icon-in-a-circle card grids, hero-metric templates — full list in DESIGN.md's Do's and Don'ts.

`/impeccable` commands (critique, audit, polish, live, etc.) auto-load these files.
