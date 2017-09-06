function swap(array, idxA, idxB) {
  const temp = array[idxA];
  array[idxA] = array[idxB];
  array[idxB] = temp;
}

class FlipVertMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h / 2; y++) {
      // TODO: copying line-by-line... is it faster?
      const otherY = sel.h - y - 1;
      for (let x = 0; x < sel.w; x++) {
        const idxRed      = (y      * sel.w + x) * 4;
        const idxRedOther = (otherY * sel.w + x) * 4;
        swap(myImageData.data, idxRed + 0, idxRedOther + 0);
        swap(myImageData.data, idxRed + 1, idxRedOther + 1);
        swap(myImageData.data, idxRed + 2, idxRedOther + 2);
        swap(myImageData.data, idxRed + 3, idxRedOther + 3);
        // swap alpha too
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

class FlipHorizMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h; y++) {
      for (let x = 0; x < sel.w / 2; x++) {
        const otherX = sel.w - x - 1;
        const idxRed      = (y * sel.w + x     ) * 4;
        const idxRedOther = (y * sel.w + otherX) * 4;
        swap(myImageData.data, idxRed + 0, idxRedOther + 0);
        swap(myImageData.data, idxRed + 1, idxRedOther + 1);
        swap(myImageData.data, idxRed + 2, idxRedOther + 2);
        swap(myImageData.data, idxRed + 3, idxRedOther + 3);
        // swap alpha too
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

export { FlipVertMask, FlipHorizMask };
