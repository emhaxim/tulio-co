const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');

function collectImages(dir, exts) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(full, exts));
    } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

async function convert() {
  const images = collectImages(publicDir, ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.avif']);

  for (const input of images) {
    const output = input.replace(/\.(jpg|jpeg|png|gif|bmp|tiff|avif)$/i, '.webp');
    if (fs.existsSync(output)) {
      console.log(`Skip (already exists): ${path.relative(publicDir, output)}`);
      continue;
    }
    await sharp(input).webp({ quality: 85 }).toFile(output);
    const before = (fs.statSync(input).size / 1024).toFixed(0);
    const after = (fs.statSync(output).size / 1024).toFixed(0);
    console.log(`Converted: ${path.relative(publicDir, input)} → .webp  (${before}KB → ${after}KB)`);
  }
}

convert().catch(console.error);
