function swap(array, idxA, idxB) {
  const temp = array[idxA];
  array[idxA] = array[idxB];
  array[idxB] = temp;
}

function flipBlock(array, blockX, blockY, arrayWidth, isVert) {
  const loopToY = isVert ? 4 : 8;
  const loopToX = isVert ? 8 : 4;
  for (let pixY = 0; pixY < loopToY; pixY++) {
    for (let pixX = 0; pixX < loopToX; pixX++) {
      const srcX = blockX*8 + pixX;
      const srcY = blockY*8 + pixY;
      let dstX, dstY;
      if (isVert) {
        dstX = srcX;
        dstY = blockY*8 + (8 - pixY - 1);
      } else {
        dstX = blockX*8 + (8 - pixX - 1);
        dstY = srcY;
      }
      const idxRedSrc = (srcY * arrayWidth + srcX) * 4;
      const idxRedDst = (dstY * arrayWidth + dstX) * 4;
      swap(array, idxRedSrc + 0, idxRedDst + 0);
      swap(array, idxRedSrc + 1, idxRedDst + 1);
      swap(array, idxRedSrc + 2, idxRedDst + 2);
      swap(array, idxRedSrc + 3, idxRedDst + 3);
    }
  }
}

class VertGlassMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    for (let y = 0; y < sel.h / 8; y++) {
      for (let x = 0; x < sel.w / 8; x++) {
        flipBlock(myImageData.data, x, y, sel.w, true);
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
        flipBlock(myImageData.data, x, y, sel.w, false);
      }
    }
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

export { VertGlassMask, HorizGlassMask };
