export default class ShiftRgbMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h; y++) {
      for (let x = 0; x < sel.w; x++) {
        const idxRed   = (y * sel.w + x) * 4;
        const idxGreen = idxRed+1;
        const idxBlue  = idxRed+2;
        // and we leave alpha data unchanged
        const newR = myImageData.data[idxGreen];
        const newG = myImageData.data[idxBlue];
        const newB = myImageData.data[idxRed];
        myImageData.data[idxRed] = newR;
        myImageData.data[idxGreen] = newG;
        myImageData.data[idxBlue] = newB;
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}
