# صنعة — San3a Pages video ad

A short vertical (9:16) video ad for **[San3a Pages](https://san3apages.com)** —
the SaaS that gives Algerian artisans a professional portfolio page on a single
link, with WhatsApp appointment booking, PDF invoices and QR codes
(annual activation key, 4500 DZD/year).

Built with [Remotion](https://remotion.dev). Fully Arabic / RTL, using the Cairo
font and the site's own "Nature Distilled" terracotta‑and‑cream palette.

![poster](out/poster.png)

## What's in it (≈28s, 1080×1080 square, 30fps)

| # | Scene | Message |
|---|-------|---------|
| 1 | Hook | عندك صنعة؟ أعطيها حضور رقمي في دقائق |
| 2 | **Scroll showcase** | Phone scrolls the real page on the left while the headline on the right swaps per section: **الملف** (profile/photo/description/buttons) → **الخدمات** (services + prices) → **المعرض** (gallery) → **الموعد** (date picker + WhatsApp booking) |
| 3 | Invoices | فواتير PDF احترافية — animated PDF invoice mockup (في لوحة التحكم) |
| 4 | QR code | رمز QR لمشاركة سهلة — a **real, scannable** QR to `san3apages.com/it9an-demo` |
| 5 | Pricing | 4500 دج في السنة — مفتاح تفعيل تشريه كاش |
| 6 | CTA | ابدأ اليوم — san3apages.com |

> The QR is generated at render time with `qrcode-generator` (`src/components/QrCode.tsx`)
> and verified to decode back to the demo URL — not a decorative graphic.

### The scrolling page

The phone scrolls the **actual screenshot** of the live public page
[`san3apages.com/it9an-demo`](https://san3apages.com/it9an-demo) — *ورشة الإتقان*
(نجار, قسنطينة). The image lives at `public/demo.png` (430×1662, captured at the
430×932 mobile viewport) and is shown inside an exact **430×932** phone screen,
loaded via `src/components/DemoPage.tsx`.

To update it, replace `public/demo.png` with a new full-page screenshot at 430px
width and adjust the four scroll stops in `SECTION_Y` (in `DemoPage.tsx`) and
`PAGE_HEIGHT` to match the new image height.

## Run it

```bash
npm install
npm run dev      # open Remotion Studio to preview/edit
npm run render   # render to out/san3a-ad.mp4
```

The rendered ad is committed at [`out/san3a-ad.mp4`](out/san3a-ad.mp4).

### Rendering notes for this sandbox

This project was rendered inside a restricted environment. Two flags were needed
that you typically **don't** need on a normal machine:

- `--browser-executable=...` — point Remotion at a Chrome Headless Shell binary
  (the default download host was not in the network allowlist; one was fetched
  via `npx puppeteer browsers install chrome-headless-shell`).
- `--ignore-certificate-errors` — the egress proxy intercepted TLS, so Chrome
  rejected `fonts.gstatic.com` until cert errors were ignored.

On your own machine, plain `npm run render` works without either flag.

## Structure

```
src/
  Root.tsx            registers the <SanaAd> composition (1080×1080, 30fps)
  SanaAd.tsx          the scene timeline (durations + cross‑fades)
  theme.ts            brand palette (hex of the site's oklch tokens)
  fonts.ts            Cairo (Arabic subset)
  components/         Background, Scene wrapper, Rise/IconBadge, QrCode,
                      PhoneFrame (device chrome) + DemoPage (the scrollable page)
  scenes/             Hook, Brand, ScrollShowcase, FeatureInvoice, FeatureQr,
                      Pricing, Cta
```

> Brand colors are derived from `src/app/globals.css` of the
> [san3a repo](https://github.com/aissamzz/san3a) (`--primary: oklch(0.59 0.15 45)`,
> warm cream background, sand/amber accents). The QR graphic is decorative, not a
> scannable code.
