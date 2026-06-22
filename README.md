# 🛡️ Deep Work Blocker

A lightweight, aggressive Chrome extension built with Manifest V3 to protect your focus. It natively blocks distracting websites and features a custom YouTube filter that allows educational content while blocking entertainment and Shorts.

## ✨ Features

* **Dual-Layer Blocking:** Uses Chrome's native `declarativeNetRequest` for instant network-level blocking, backed up by an aggressive content script.
* **YouTube Smart Filter:** Automatically reads YouTube's hidden metadata and JSON-LD schemas. Allows videos categorized under "Education" or "Science & Technology", but instantly blocks entertainment videos and Shorts.
* **Zero Distractions:** Hard-blocks major time-sinks including Instagram, Netflix, Twitter, Reddit, and TikTok.
* **Local & Fast:** Runs entirely in the browser with zero external API calls, background tracking, or heavy dependencies.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Browser API:** Chrome Extension Manifest V3
* **Key Mechanisms:** `declarativeNetRequest`, `MutationObserver`, DOM Parsing

## 🚀 How to Install (Developer Mode)

To test or use this extension locally:

1. Download or clone this repository to your computer.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Toggle **Developer mode** ON (top right corner).
4. Click the **Load unpacked** button (top left).
5. Select the folder containing these files.
6. The extension is now active! Pin it to your toolbar for easy access.

## 📁 Project Structure

* `manifest.json` - The core configuration, routing, and permissions file.
* `rules.json` - The declarative network-level blocklist for strictly prohibited domains.
* `content.js` - The DOM observer, URL parser, and YouTube categorization logic.
* `popup.html` / `popup.css` - The UI for the toolbar extension menu.
* `blocked.html` / `blocked.css` - The full-screen focus barrier interface.

## 💡 Technical Note: The YouTube Filter

Because YouTube operates as a Single Page Application (SPA), standard URL filtering is insufficient to distinguish between educational and entertainment content. This extension implements a `MutationObserver` to constantly monitor the DOM for asynchronous changes, cross-referencing hidden meta tags and internal JSON objects to accurately classify and block videos in real-time.