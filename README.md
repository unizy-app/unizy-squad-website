# UniZy Squad website

The website for UniZy Squad members, hosted on GitHub Pages at squad.unizy.app.
It's plain HTML, CSS and JavaScript, with no framework and no build step.

## What's in each file

| File | What it does |
|---|---|
| `index.html` | All the page content. The site has four sections (Home, My code, Guide, Rules) in this one file, each marked with a comment like `<!-- ===== GUIDE ===== -->`. |
| `css/style.css` | The design. Colours are at the top, in `:root`, followed by a dark mode version, then a section for each part of the site. |
| `js/main.js` | How the site behaves: switching sections, the Squad Code box, the QR code and the full-screen view. The settings you're most likely to change are at the top. |
| `js/qrcode.js` | The QR code generator ([qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase, MIT licence). You don't need to edit it. |
| `images/` | Logo, favicon, home screen icon, the hero image, the two app screenshots and the image shown when the link is shared. |
| `404.html` | The page shown for a broken link. |

## Common changes

**Updating the rules.** Edit the Do and Don't lists in the RULES section of `index.html`, change `RULES_UPDATED` at the top of `js/main.js`, and paste the same rules into the WhatsApp community description so both match.

**Changing Guide text.** Edit the GUIDE section of `index.html`.

**Changing the download link.** Edit `DOWNLOAD_LINK` at the top of `js/main.js`. The QR code updates automatically.

**Changing the code part of the link.** The QR code points to `DOWNLOAD_LINK?code=ABC`. If the devs want a different word than `code`, change `CODE_PARAM` at the top of `js/main.js`.

**Replacing a screenshot.** Overwrite the file in `images/` with one of the same name. Keep it about 600 px wide so the page stays fast.

**Changing colours.** Edit the variables at the top of `css/style.css`. The dark mode colours are in the two blocks just below.

## Links that fill in a member's code

`https://squad.unizy.app/?code=ABC#code` opens the My code page with the code ABC already filled in and saved on that device. This is the link to use in the joining email.

## Publishing on GitHub Pages

1. In the UniZy Squad GitHub account, create a **public** repository, for example `squad-site`.
2. Choose **Add file**, then **Upload files**, and drag in everything from this folder, keeping the folders as they are. `index.html` must be at the top level, not inside another folder.
3. Go to **Settings**, then **Pages**. Under Build and deployment, set Source to **Deploy from a branch**, Branch to **main** and the folder to **/ (root)**, then save.
4. Once the domain is verified and the devs' DNS records are live, enter `squad.unizy.app` under **Custom domain** and save. GitHub adds a file called `CNAME` to the repository; leave it there.
5. When the option appears, tick **Enforce HTTPS**. The site won't load on squad.unizy.app until this is done, because .app addresses only work over HTTPS.

After that, any file you change or upload goes live within a minute or two.

## Analytics (Umami)

The code is already in `index.html` but switched off. Sign up for Umami, add the site, then in the `<head>` of `index.html` paste your website ID in place of `YOUR-WEBSITE-ID` and remove the `<!--` and `-->` around that script line. The buttons already carry `data-umami-event` labels, so Umami will count uses of Show full screen and Copy download link.

## Trying it on your computer

Double-click `index.html` to open it in your browser. Everything works offline except the font, which loads from Google Fonts.

## Copyright

© UNIZY LTD. All rights reserved.

`js/qrcode.js` is © Kazuhiko Arase and is used under the MIT licence.
