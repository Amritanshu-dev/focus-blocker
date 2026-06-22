// 1. Hard Block List for entirely distracting domains
const BLOCKED_DOMAINS = [
  "instagram.com",
  "netflix.com",
  "primevideo.com",
  "twitter.com",
  "x.com",
  "facebook.com",
  "tiktok.com",
  "reddit.com",
  "twitch.tv"
];

// 2. Safe categories that we will ALLOW on YouTube. 
const ALLOWED_YT_CATEGORIES = [
  "Education",
  "Science & Technology",
  "Howto & Style",
  "Nonprofits & Activism"
];

// Function to forcefully hunt down the video category
function getYouTubeCategory() {
  // Method A: Check standard meta tag
  const metaCategory = document.querySelector('meta[itemprop="genre"]');
  if (metaCategory && metaCategory.content) {
    return metaCategory.content;
  }

  // Method B: Check LD-JSON (Highly effective for Movies, Gaming, and Trailers)
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  for (let schema of schemas) {
    try {
      const data = JSON.parse(schema.textContent);
      if (data.genre) return data.genre;
      if (Array.isArray(data)) {
        const videoObj = data.find(item => item.genre);
        if (videoObj) return videoObj.genre;
      }
    } catch(e) { }
  }

  // Method C: Regex search YouTube's raw internal data for the category string
  const scripts = document.querySelectorAll('script');
  for (let script of scripts) {
    if (script.textContent.includes('"category":"')) {
      const match = script.textContent.match(/"category":"([^"]+)"/);
      if (match && match[1]) {
        return match[1];
      }
    }
  }

  return null; // Category hasn't loaded yet
}

function checkFocusRules() {
  // Prevent the script from looping if we are already on the blocked page
  if (window.location.protocol === "chrome-extension:") return;

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  // LAYER 1: Hard block distracting domains instantly
  if (BLOCKED_DOMAINS.some(domain => hostname.includes(domain))) {
    window.location.replace(chrome.runtime.getURL("blocked.html"));
    return;
  }

  // LAYER 2: YouTube Specific Rules
  if (hostname.includes("youtube.com")) {
    // Instantly block YouTube Shorts
    if (pathname.includes('/shorts')) {
      window.location.replace(chrome.runtime.getURL("blocked.html"));
      return;
    }

    // Check category if watching a standard video
    if (pathname.includes('/watch')) {
      const category = getYouTubeCategory();
      
      // If we successfully found the category and it's NOT safe, block it!
      if (category && !ALLOWED_YT_CATEGORIES.includes(category)) {
        console.log("Blocking YouTube Video. Category detected:", category);
        window.location.replace(chrome.runtime.getURL("blocked.html"));
      }
    }
  }
}

// Trigger 1: Run check immediately
checkFocusRules();

// Trigger 2: Aggressive Polling for YouTube
// Because YouTube is a Single Page Application, navigating to a gaming or movie video 
// from the homepage often delays the metadata loading. We check every 1 second.
if (window.location.hostname.includes("youtube.com")) {
    setInterval(checkFocusRules, 1000);
}