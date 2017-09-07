import { GetMekoAt } from '../resources/MekoKey.js';

class MekoPlusMask {
  applyMask(ctx, sel) {
    MekoCommon.runMeko(ctx, sel, true);
  }
}

class MekoMinusMask {
  applyMask(ctx, sel) {
    MekoCommon.runMeko(ctx, sel, false);
  }
}

export { MekoPlusMask, MekoMinusMask };

class MekoCommon {
  // maps a particular dimension to a transformation table which are expensive to create
  static cache = {};

  static getTable(width, height) {
    const key = `${width},${height}`;
    const table = this.cache[key] || this.newTable(width, height);
    this.cache[key] = table; // save to cache (if not already)
    return table;
  }

  static newTable(width, height) {
    const keyEntries = new Array(width * height);
    // we insert in order of "n"...
    for (let i = 0; i < width * height; i++) {
      const entryKey = GetMekoAt(i);
      keyEntries[i] = { n: i, key: entryKey };
    }
    // ...but eventually re-sort it by "key"
    keyEntries.sort((a, b) => {
      return a.key - b.key;
    });
    return { keyEntries, width, height };
  }

  static tableTransform(table, x, y) {
    const n = table.keyEntries[y * table.width + x].n;
    const tx = n % table.width;
    const ty = Math.floor(n / table.width);
    return { x: tx, y: ty };
  }

  static runMeko(ctx, unroundedSel, doPlus) {
    ctx.save();

    // no bullshit selection sizes
    const sel = {
      x: unroundedSel.x,
      y: unroundedSel.y,
      w: Math.floor(unroundedSel.w / 16) * 16,
      h: Math.floor(unroundedSel.h / 16) * 16
    };
    console.assert(sel.x % 8 === 0);
    console.assert(sel.y % 8 === 0);
    console.assert(sel.w % 16 === 0);
    console.assert(sel.h % 16 === 0);

    // get parameters
    const cellWidth = sel.w / 16;
    const cellHeight = sel.h / 16;

    // get transformation table
    const table = this.getTable(cellWidth, cellHeight);

    // extract into source buffer
    var srcData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);

    // create empty destination buffer
    var destData = ctx.createImageData(srcData);

    // srcData buffer -> magical rearrangement dictionary -> destData buffer
    for (var y = 0; y < cellHeight; y++) {
      for (var x = 0; x < cellWidth; x++) {
        const p = this.tableTransform(table, x, y);
        let srcX, srcY, dstX, dstY;
        if (doPlus) {
          srcX = x;
          srcY = y;
          dstX = p.x;
          dstY = p.y;
        }
        else {
          srcX = p.x;
          srcY = p.y;
          dstX = x;
          dstY = y;
        }
        srcX *= 16;
        srcY *= 16;
        dstX *= 16;
        dstY *= 16;
        console.assert(srcX % 8 === 0);
        console.assert(srcY % 8 === 0);
        console.assert(dstX % 8 === 0);
        console.assert(dstY % 8 === 0);
        this.transferCell(srcData, destData, srcX, srcY, dstX, dstY, true);
      }
    }

    // draw destination buffer back to the canvas
    ctx.putImageData(destData, sel.x, sel.y);
    ctx.restore();
  }

  /**
   * transfer an 16x16 cell starting from x,y from one buffer to another
   * @param {ImageData} src image buffer we copy from
   * @param {ImageData} dest image buffer we copy to
   * @param {number} srcX pixel coordinate X of source cell's topleftmost pixel
   * @param {number} srcY pixel coordinate Y of destination cell's topleftmost pixel
   * @param {number} destX pixel coordinate X of source cell's topleftmost pixel
   * @param {number} destY pixel coordinate Y of destination cell's topleftmost pixel
   * @param {boolean} invert whether to invert the RGB of this cell
   */
  static transferCell(src, dest, srcX, srcY, destX, destY, invert) {
    for (var y = 0; y < 16; y++) {
      for (var x = 0; x < 16; x++) {
        var srcRealX  = srcX  + x;
        var srcRealY  = srcY  + y;
        var destRealX = destX + x;
        var destRealY = destY + y;

        var srcIdx  = (srcRealY  * src.width  + srcRealX ) * 4;
        var destIdx = (destRealY * dest.width + destRealX) * 4;

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
}
