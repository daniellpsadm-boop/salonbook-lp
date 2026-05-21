import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'public', 'favicon.png');
const output = input;

/** Remove near-black pixels so the favicon works on any browser tab background. */
function keyBlackToAlpha(data, threshold = 48) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
keyBlackToAlpha(data);

await sharp(data, { raw: info })
  .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(output);

console.log('wrote', path.relative(root, output));
