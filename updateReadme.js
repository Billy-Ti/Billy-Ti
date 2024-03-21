import { readFileSync, writeFileSync } from 'fs';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

const RSS_FEED_URL = 'https://medium.com/feed/@Ti';
const README_PATH = './README.md';

(async () => {
  const feed = await parser.parseURL(RSS_FEED_URL);
  let newContent = '### ✨Latest posts\n';
  feed.items.slice(0, 5).forEach((item) => {
    newContent += `- [${item.title}](${item.link})\n`;
  });

  const readmeContent = readFileSync(README_PATH, 'utf8');
  const updatedContent = readmeContent.replace(
    /(### ✨Latest posts\n)([\s\S]*?)(\n###)/,
    `$1${newContent}$3`
  );

  writeFileSync(README_PATH, updatedContent);
  console.log('README Update');
})();
