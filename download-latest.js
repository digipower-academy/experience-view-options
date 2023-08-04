const fs = require('fs');
const https = require('https');
const path = require('path');

const experiences = [
    "ad-radar",
    "apple-tracker",
    "apple-tracker-agg",
    "chatgpt",
    "explorer",
    "facebook",
    "fitbit",
    "google",
    "google-agg",
    "her",
    "her-tinder-agg",
    "instagram",
    "linkedin",
    "linkedin-agg",
    "netflix",
    "other",
    "strava",
    "tiktok",
    "tinder",
    "tracker-control",
    "tracker-control-agg",
    "twitter",
    "twitter-agg",
    "uber",
    "uber-driver",
    "youtube"
]

function viewerOptsUrl (experienceName) {
  return `https://cdn.jsdelivr.net/npm/@hestia.ai/twitter/src/${experienceName}-viewer.json`
}

// thanks bingai
function downloadFile(url, destinationDir) {
  const fileName = path.basename(url)
  const filePath = path.join(destinationDir, fileName)
  const file = fs.createWriteStream(filePath)
  https.get(url, (response) => response.pipe(file))
  console.log('wrote ', filePath)
}

function main() {
  experiences.forEach(e =>
    downloadFile(viewerOptsUrl(e), 'viewer-options'))
}

main()
