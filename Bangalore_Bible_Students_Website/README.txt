THE BANGALORE BIBLE STUDENTS — WEBSITE
======================================

HOW TO VIEW
  Double-click index.html (keep all folders next to it).

FOLDER MAP
  index.html            Page layout and fixed text for every tab
  css/style.css         Colours, fonts, sizes, spacing, light/dark themes
  css/effects.css       Animations: moving images, hover zoom, gold dust,
                        HD logo, confetti, Visit-Us language fonts
  js/content.js         ★ Sermons, announcements, books, taglines, timings,
                        address, email, phone  (the file editors change)
  js/new-sermons.js     Extra sermons waiting to be merged (normally empty)
  js/translations.js    Kannada / Tamil / Hindi for the fixed page text
  js/app.js             Site logic: tabs, search, language, dark mode …
  js/effects.js         Golden confetti around the logo
  admin/index.html      ★ Admin dashboard (edit content without code)
  images/               All photos, named by where they appear
                        (e.g. visit-banner.jpg) – replace with a file of
                        the SAME NAME to change a picture
  pdfs/                 Studies in the Scriptures PDFs

WEEKLY UPDATE (no coding)
  1. Open admin/index.html
  2. Add the sermon / announcement (all 4 languages optional)
  3. "Save draft & preview" – check the site
  4. "Download content.js" – replace js/content.js with it
  5. Upload the site folder to your hosting (or push to GitHub)

COMMON TWEAKS
  Hover zoom strength   css/effects.css → .photo:hover img{scale:1.22}
  Gold colour           css/effects.css → #C9A227 (light) / #E6C35C (dark)
  Image movement speed  css/effects.css → kenC 22s / 18s (bigger = slower)
  Turn off confetti     delete the js/effects.js line in index.html

NOTE
  This is a static website – there is no server or database. The
  "back end" is js/content.js edited through the admin dashboard.
  Drafts are saved only in the browser used for editing; visitors see
  changes only after the new content.js is uploaded.
