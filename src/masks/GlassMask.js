import { FlipBlockVert, FlipBlockHoriz } from './Common.js';

class VertGlassMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h / 8; y++) {
      for (let x = 0; x < sel.w / 8; x++) {
        FlipBlockVert(myImageData, x * 8, y * 8);
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

class HorizGlassMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h / 8; y++) {
      for (let x = 0; x < sel.w / 8; x++) {
        FlipBlockHoriz(myImageData, x * 8, y * 8);
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

export { VertGlassMask, HorizGlassMask };
