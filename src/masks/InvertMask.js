/**
 * @class InvertMask
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
 */
class InvertMask {
  applyMask(ctx, sel) {
    ctx.save();
    var myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (var y = 0; y < sel.h; y++) {
      for (var x = 0; x < sel.w; x++) {
        var idxRed   = (y * sel.w + x) * 4;
        var idxGreen = idxRed+1;
        var idxBlue  = idxRed+2;
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

export default InvertMask;
