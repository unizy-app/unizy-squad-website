/* =========================================================
   UniZy Squad website
   Plain JavaScript, no framework. The settings below are the
   things you are most likely to change.
   ========================================================= */

// The unified UniZy download link. The QR code points here.
const DOWNLOAD_LINK = "https://api.unizy.app/download";

// Name of the part added to the download link for a member's code,
// e.g. https://api.unizy.app/download?code=ABC
const CODE_PARAM = "code";

// Shown at the top of the Rules page. Change it whenever the rules change.
const RULES_UPDATED = "15 November 2026";

/* ========================================================= */

/* Small pop-up message at the bottom of the screen */

const toastEl = document.getElementById("toast");
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

/* Copies text to the clipboard, with a fallback for older browsers */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {}
  try {
    const t = document.createElement("textarea");
    t.value = text;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.opacity = "0";
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand("copy");
    t.remove();
    return ok;
  } catch (e) {
    return false;
  }
}

/* Download link and QR code. With a code, the link becomes .../download?code=ABC */
function downloadLinkFor(part) {
  return part ? DOWNLOAD_LINK + "?" + CODE_PARAM + "=" + encodeURIComponent(part) : DOWNLOAD_LINK;
}

// Builds the QR code as an SVG image, using the qrcode-generator library in js/qrcode.js
function qrSvg(text) {
  const qr = qrcode(0, "M"); // 0 = pick the size automatically, M = medium error correction
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  let path = "";
  for (let y = 0; y < n; y++) {
    let x = 0;
    while (x < n) {
      if (qr.isDark(y, x)) {
        const start = x;
        while (x < n && qr.isDark(y, x)) x++;
        path += "M" + start + " " + y + "h" + (x - start) + "v1h-" + (x - start) + "z";
      } else {
        x++;
      }
    }
  }
  return (
    '<svg viewBox="0 0 ' +
    n +
    " " +
    n +
    '" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" role="img" aria-label="QR code to download UniZy"><path fill="#000263" d="' +
    path +
    '"/></svg>'
  );
}

function drawQr(part) {
  const svg = qrSvg(downloadLinkFor(part));
  document.querySelectorAll(".qr-tile").forEach((tile) => (tile.innerHTML = svg));
}

/* Squad Code
   Members type the three characters once. They are saved in the browser's local storage
   on that device (nothing is sent anywhere). A link like squad.unizy.app/?code=ABC#code,
   for example from the joining email, fills the code in automatically. */
const codeInput = document.getElementById("code-input");

function cleanPart(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .slice(0, 3);
}

function showCode(part) {
  drawQr(part);
  document.querySelectorAll(".code-part").forEach((el) => (el.textContent = part));
  document.querySelectorAll(".code-filled").forEach((el) => (el.hidden = !part));
  document.querySelectorAll(".code-missing").forEach((el) => (el.hidden = !!part));
}

function saveCode(part) {
  try {
    localStorage.setItem("squadCode", part);
  } catch (e) {}
}

let squadCode = "";
try {
  squadCode = cleanPart(localStorage.getItem("squadCode"));
} catch (e) {}
const fromLink = cleanPart(new URLSearchParams(location.search).get("code"));
if (fromLink) {
  squadCode = fromLink;
  saveCode(fromLink);
}
codeInput.value = squadCode;
showCode(squadCode);

// Once a code is saved, the box is tucked away so the page is ready to show
const codeKit = document.getElementById("code-kit");
const changeBtn = document.getElementById("change-code");
function setEditing(editing) {
  codeKit.hidden = !!squadCode && !editing;
  changeBtn.hidden = !codeKit.hidden;
}
setEditing(false);
changeBtn.addEventListener("click", () => {
  setEditing(true);
  codeInput.focus();
  codeInput.select();
});

codeInput.addEventListener("input", () => {
  squadCode = cleanPart(codeInput.value);
  saveCode(squadCode);
  showCode(squadCode);
});

document.getElementById("copy-link").addEventListener("click", async () => {
  const link = downloadLinkFor(squadCode);
  toast((await copyText(link)) ? "Download link copied" : "Couldn’t copy. The link is " + link);
});

/* Full-screen view */
const showcode = document.getElementById("showcode");
document.getElementById("fullscreen-btn").addEventListener("click", () => {
  if (!squadCode) toast("Showing the QR code only. Add your code to show it too.");
  document.documentElement.classList.add("code-open"); // hides the page behind, including under the browser's toolbars
  showcode.showModal();
});
document.getElementById("showcode-close").addEventListener("click", () => showcode.close());
showcode.addEventListener("close", () => document.documentElement.classList.remove("code-open"));

/* Pages
   The site is one HTML file with four sections (Home, My code, Guide, Rules).
   The part of the address after # decides which one is shown, e.g. squad.unizy.app/#rules */
function setUpdated(id, date) {
  const el = document.getElementById(id);
  if (date) el.textContent = "Last updated " + date;
  else el.hidden = true;
}
setUpdated("rules-updated", RULES_UPDATED);

const VIEWS = ["home", "code", "guide", "rules"];
function showView() {
  const name = location.hash.slice(1);
  const view = VIEWS.includes(name) ? name : "home";
  document.querySelectorAll("[data-view]").forEach((v) => (v.hidden = v.dataset.view !== view));
  document
    .querySelectorAll("[data-view-link]")
    .forEach((l) =>
      l.dataset.viewLink === view
        ? l.setAttribute("aria-current", "page")
        : l.removeAttribute("aria-current"),
    );
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", showView);
showView();
