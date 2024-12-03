/**
 * @class InvertMask
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 */
export default class InvertMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h; y++) {
      for (let x = 0; x < sel.w; x++) {
        const idxRed   = (y * sel.w + x) * 4;
        const idxGreen = idxRed+1;
        const idxBlue  = idxRed+2;
        // and we leave alpha data unchanged
        myImageData.data[idxRed] = 255 - myImageData.data[idxRed];
        myImageData.data[idxGreen] = 255 - myImageData.data[idxGreen];
        myImageData.data[idxBlue] = 255 - myImageData.data[idxBlue];
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}
