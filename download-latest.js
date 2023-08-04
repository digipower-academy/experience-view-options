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
  return `https://cdn.jsdelivr.net/npm/@hestia.ai/${experienceName}/src/${experienceName}-viewer.json`
}

// thanks bingai
function downloadFile(url, destinationDir) {
  console.log('Get', url)
  const fileName = path.basename(url)
  const filePath = path.join(destinationDir, fileName)
  const file = fs.createWriteStream(filePath)
  https.get(url, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download file ${url}\nstatus: ${response.statusCode}`);
      return;
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        console.log(`File ${url}\ndownloaded to ${filePath}`);
      });
    });
  }).on('error', (err) => {
    fs.unlink(filePath, () => {
      console.error(`Failed to download file ${url}\nmessage: ${err.message}`);
    });
  });
}

function main() {
  experiences.forEach(e =>
    downloadFile(viewerOptsUrl(e), 'viewer-options'))
}

main()
