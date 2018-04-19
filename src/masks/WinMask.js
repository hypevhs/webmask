import { CopyPixel } from './Common.js';

const TRANS = [12, 8, 6, 15, 9, 13, 2, 11, 1, 4, 14, 7, 0, 5, 10, 3];

export default class WinMask {
  applyMask(ctx, unroundedSel) {
    // no bullshit selection sizes
    // height can be anything, but only width is rounded down to 16pxs
    const sel = {
      x: unroundedSel.x,
      y: unroundedSel.y,
      w: Math.floor(unroundedSel.w / 16) * 16,
      h: unroundedSel.h
    };
    console.assert(sel.x % 8 === 0);
    console.assert(sel.y % 8 === 0);
    console.assert(sel.w % 16 === 0);
    console.assert(sel.h % 8 === 0);

    ctx.save();
    const srcData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    const destData = ctx.createImageData(srcData);
    for (let i = 0; i <= sel.w - 16; i += 16) {
      for (let j = 0; j < 16; j += 1) {
        const x = i + j;
        const newX = i + TRANS[j];
        for (let y = 0; y < sel.h; y++) {
          CopyPixel(srcData, destData, x, y, newX, y);
        }
      }
    }
    ctx.putImageData(destData, sel.x, sel.y);
    ctx.restore();
  }
}
