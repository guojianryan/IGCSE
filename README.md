# Cambridge IGCSE Computer Science 0478

Interactive revision for the CIE course, covering all ten chapters of the 2026–2028 syllabus.

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

Topics 5.1 and 5.2 are the original lesson pages. Each other topic is a lesson in the same style: a syllabus map, teaching for both columns of the content table, a worked example where the topic needs one, an activity, a short quiz, and a checklist saved in the browser.

To regenerate the shared topic pages after editing `js/content/`:

```bash
node scripts/build-topic-pages.mjs
```
