export default class XorMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h; y++) {
      for (let x = 0; x < sel.w; x++) {
        const idxRed   = (y * sel.w + x) * 4;
        const idxGreen = idxRed+1;
        const idxBlue  = idxRed+2;
        // and we leave alpha data unchanged
        myImageData.data[idxRed] ^= 0x80;
        myImageData.data[idxGreen] ^= 0x80;
        myImageData.data[idxBlue] ^= 0x80;
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}
