import { readFileSync, writeFileSync } from 'fs';
import RSSParser from 'rss-parser';

const parser = new RSSParser();

const RSS_FEED_URL = 'https://medium.com/feed/@show81728';
const README_PATH = './README.md';

(async () => {
  const feed = await parser.parseURL(RSS_FEED_URL);
  let newContent = '';
  feed.items.slice(0, 5).forEach((item) => {
    if (!item.title.toLocaleLowerCase().includes('面試')) {
      newContent += `- [${item.title}](${item.link})\n`;
    }
  });

  const readmeContent = readFileSync(README_PATH, 'utf8');
  const updatedContent = readmeContent.replace(
    /(\n### ✨Latest posts\n)([\s\S]*?)(?=\n###)/,
    `$1${newContent}`
  );

  writeFileSync(README_PATH, updatedContent);
  console.log('README Update');
})();
