/**
 * Swap RGBA components between source and destination cordinates.
 *
 * @param {ImageData} imageData
 * @param {number} srcX
 * @param {number} srcY
 * @param {number} dstX
 * @param {number} dstY
 */
function SwapPixel(imageData, srcX, srcY, dstX, dstY) {
  const srcIdx = (srcY * imageData.width + srcX) * 4;
  const dstIdx = (dstY * imageData.width + dstX) * 4;
  SwapRaw(imageData.data, srcIdx + 0, dstIdx + 0);
  SwapRaw(imageData.data, srcIdx + 1, dstIdx + 1);
  SwapRaw(imageData.data, srcIdx + 2, dstIdx + 2);
  SwapRaw(imageData.data, srcIdx + 3, dstIdx + 3);
}

/**
 * Swap two values in an array.
 *
 * @param {Array} array
 * @param {number} idxA
 * @param {number} idxB
 */
function SwapRaw(array, idxA, idxB) {
  const temp = array[idxA];
  array[idxA] = array[idxB];
  array[idxB] = temp;
}

/**
 * Copy pixel from source ImageData to destination ImageData with different coordinates for both.
 *
 * @param {ImageData} src
 * @param {ImageData} dest
 * @param {number} srcX
 * @param {number} srcY
 * @param {number} dstX
 * @param {number} dstY
 */
function CopyPixel(src, dest, srcX, srcY, dstX, dstY) {
  const idxRedSrc = (srcY * src.width + srcX) * 4;
  const idxRedDst = (dstY * src.width + dstX) * 4;
  dest.data[idxRedSrc + 0] = src.data[idxRedDst + 0];
  dest.data[idxRedSrc + 1] = src.data[idxRedDst + 1];
  dest.data[idxRedSrc + 2] = src.data[idxRedDst + 2];
  dest.data[idxRedSrc + 3] = src.data[idxRedDst + 3];
}

/**
 * Vertically flip an 8x8 block whose top-left pixel is at given coordinates.
 *
 * @param {ImageData} imageData
 * @param {number} startX
 * @param {number} startY
 */
function FlipBlockVert(imageData, startX, startY) {
  FlipVert(imageData, startX, startY, 8, 8);
}

/**
 * Horizontally flip an 8x8 block whose top-left pixel is at given coordinates.
 *
 * @param {ImageData} imageData
 * @param {number} startX
 * @param {number} startY
 */
function FlipBlockHoriz(imageData, startX, startY) {
  FlipHoriz(imageData, startX, startY, 8, 8);
}

 /**
  * Vertically flip an area whose top-left pixel is at given coordinates and whose size is given.

  * @param {ImageData} imageData
  * @param {number} startX
  * @param {number} startY
  * @param {number} width
  * @param {number} height
  */
function FlipVert(imageData, startX, startY, width, height) {
  // TODO: copying line-by-line... is it faster?
  const midwayPoint = Math.floor(height/2);
  for (let pixY = 0; pixY < midwayPoint; pixY++) {
    for (let pixX = 0; pixX < width; pixX++) {
      const srcX = startX + pixX;
      const srcY = startY + pixY;
      const dstX = srcX;
      const dstY = startY + (height - pixY - 1);
      SwapPixel(imageData, srcX, srcY, dstX, dstY);
    }
  }
}

/**
 * Horizontally flip an area whose top-left pixel is at given coordinates and whose size is given.
 *
 * @param {ImageData} imageData
 * @param {number} startX
 * @param {number} startY
 * @param {number} width
 * @param {number} height
 */
function FlipHoriz(imageData, startX, startY, width, height) {
  const midwayPoint = Math.floor(width/2);
  for (let pixY = 0; pixY < height; pixY++) {
    for (let pixX = 0; pixX < midwayPoint; pixX++) {
      const srcX = startX + pixX;
      const srcY = startY + pixY;
      const dstX = startX + (width - pixX - 1);
      const dstY = srcY;
      SwapPixel(imageData, srcX, srcY, dstX, dstY);
    }
  }
}

/**
 * Transfer an 8x8 pixel block from one buffer to another.
 *
 * @param {ImageData} src image buffer we copy from
 * @param {ImageData} dest image buffer we copy to
 * @param {number} srcX pixel coordinate X of source cell's topleftmost pixel
 * @param {number} srcY pixel coordinate Y of destination cell's topleftmost pixel
 * @param {number} destX pixel coordinate X of source cell's topleftmost pixel
 * @param {number} destY pixel coordinate Y of destination cell's topleftmost pixel
 * @param {boolean} invert whether to invert the RGB of this cell
 */
function CopyBlock(src, dest, srcX, srcY, destX, destY, invert) {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const srcRealX  = srcX  + x;
      const srcRealY  = srcY  + y;
      const destRealX = destX + x;
      const destRealY = destY + y;

      const srcIdx  = (srcRealY  * src.width  + srcRealX ) * 4;
      const destIdx = (destRealY * dest.width + destRealX) * 4;

      if (!invert) {
        dest.data[destIdx+0] = src.data[srcIdx+0];
        dest.data[destIdx+1] = src.data[srcIdx+1];
        dest.data[destIdx+2] = src.data[srcIdx+2];
      } else {
        dest.data[destIdx+0] = 255 - src.data[srcIdx+0];
        dest.data[destIdx+1] = 255 - src.data[srcIdx+1];
        dest.data[destIdx+2] = 255 - src.data[srcIdx+2];
      }
      // copy alpha unaffected by inversion rules
      dest.data[destIdx+3] = src.data[srcIdx+3];
    }
  }
}

export { SwapPixel, CopyPixel, FlipBlockVert, FlipBlockHoriz, FlipVert, FlipHoriz, CopyBlock };
