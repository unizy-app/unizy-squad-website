# UniZy Squad website

The website for UniZy Squad members, UniZy's referral programme. It explains how the Squad works, gives each member a page with their Squad Code and a QR code to show students, and answers the questions students commonly ask.

It's a static site built with plain HTML, CSS and JavaScript, with no framework and no build step. It's hosted on GitHub Pages at squad.unizy.app.

## Project structure

```
index.html        All page content
404.html          Page shown for addresses that don't exist
css/style.css     Styles, including dark mode
js/main.js        Site behaviour and settings
js/qrcode.js      QR code generator (third-party library)
images/           Logo, icons, hero image, app screenshots and link preview image
```

## Pages

The site is a single HTML file with four sections, each marked with a comment in `index.html`:

- **Home**: what the Squad is, how it works, what members get, who can join and how to apply by email.
- **My code**: the member's Squad Code and a QR code for downloading UniZy, with a full-screen view for showing students in person.
- **Guide**: what UniZy is, its categories, how it differs from competitors, the sign-up and home screens with numbered explanations, payments and verification codes, Featured Listings, Stripe onboarding and where to get help.
- **Rules**: the Squad rules, with a link to the full Terms and Conditions on unizy.app.

The part of the address after `#` decides which section is shown, for example `squad.unizy.app/#rules`. An address with no `#`, or one that doesn't match a section, shows Home.

## How the Squad Code works

Squad Codes are three characters followed by a fixed `❤️UniZy` ending. Members type their three characters on the My code page, and the page shows the full code.

The code is saved in the browser's local storage on that device, so it's still there when the member comes back. It isn't sent anywhere, and the site has no server or database. Opening the site with a code in the address, such as `squad.unizy.app/?code=ABC#code`, fills the code in and saves it automatically.

## How the QR code works

The QR code points to the unified UniZy download link. Once a member has entered their code, the link includes it, for example `https://api.unizy.app/download?code=ABC`. The QR code is drawn in the browser by `js/qrcode.js` and updates as soon as the code changes.

## Settings

The values most likely to change are at the top of `js/main.js`:

| Setting | Purpose |
|---|---|
| `DOWNLOAD_LINK` | The unified UniZy download link used by the QR code and the Copy download link button |
| `CODE_PARAM` | The name used for the code in the download link (`code`) |
| `RULES_UPDATED` | The date shown at the top of the Rules page |

Colours are defined as variables at the top of `css/style.css`, with separate values for dark mode.

## Design

The site is designed for phones first and adapts to larger screens. It follows the device's light or dark mode setting. The font is Plus Jakarta Sans, loaded from Google Fonts, and the colours follow the UniZy brand gradient.

## External resources

- **Google Fonts** for the Plus Jakarta Sans font.
- **[qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)** by Kazuhiko Arase, included as `js/qrcode.js`.

No analytics, cookies or tracking are used.

## Hosting

The site is published by GitHub Pages from the root of the `main` branch, with squad.unizy.app as the custom domain over HTTPS. Changes pushed to `main` go live automatically.

## Copyright

© UNIZY LTD. All rights reserved.

`js/qrcode.js` is © Kazuhiko Arase and is used under the MIT licence.
