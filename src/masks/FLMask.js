import { CopyBlock } from './Common.js';

/**
 * @class FLMask
 * @see https://github.com/zqad/zmask/blob/master/src/org/zkt/zmask/masks/FL.java
 */
class FLMask {
  applyMask(ctx, sel) {
    ctx.save();

    var width = sel.w;
    var height = sel.h;
    var cellWidth = width / 8;
    var cellHeight = height / 8;

    // no bullshit selection sizes
    console.assert(height % 8 === 0);
    console.assert(width % 8 === 0);

    var table = this.buildTable(cellWidth, cellHeight);
    var srcData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    var destData = ctx.createImageData(srcData); // create empty destination buffer

    // srcData buffer -> magical rearrangement table -> destData buffer
    for (var y = 0; y < cellHeight; y++) {
      for (var x = 0; x < cellWidth; x++) {
        var tr = this.tableTransform(table, x, y);
        CopyBlock(srcData, destData, x*8, y*8, tr.x*8, tr.y*8, tr.inv);
      }
    }

    // draw destination buffer back to the canvas
    ctx.putImageData(destData, sel.x, sel.y);

    ctx.restore();
  }

  /**
   * Build an FL transformation table that can operate on images of a given width and height.
   * This is mostly magic math stuff.
   *
   * @param {number} width
   * @param {number} height
   * @returns
   * @memberof FLMask
   */
  buildTable(width, height) {
    var dx = [ 1, 0, -1, 0 ];
    var dy = [ 0, -1, 0, 1 ];

    var table = Array(height).fill(0).map(y => Array(width).fill(null));
    console.assert(table.length === height);
    console.assert(table[0].length === width);
    console.assert(table[0][0] === null);
    var xMap = Array(width * height).fill(null);
    var yMap = Array(width * height).fill(null);
    console.assert(xMap.length === width*height);
    console.assert(xMap[0] === null);
    console.assert(yMap.length === width*height);
    console.assert(yMap[0] === null);

    var x,y,d,i;

    for (x = d = i = 0, y = height - 1; i < width * height; i++) {
      xMap[i] = x;
      yMap[i] = y;
      table[y][x] = {
        no: i,
        pair: width * height - i - 1
      };
      x += dx[d];
      y += dy[d];
      if (x < 0 || width <= x || y < 0 || height <= y || (table[y][x] !== null && 0 <= table[y][x].no)) {
        x -= dx[d];
        y -= dy[d];
        d = ( d + 1 ) % 4;
        x += dx[d];
        y += dy[d];
      }
    }

    return { table, xMap, yMap };
  }

  /**
   * Given an FL Tranformation table and X and Y source position (in block coordinates), look up the intended destination block coordinates, and whether to invert the colors.
   *
   * @param {object} table
   * @param {number} x
   * @param {number} y
   * @returns
   * @memberof FLMask
   */
  tableTransform(table, x, y) {
    var rx = table.xMap[table.table[y][x].pair];
    var ry = table.yMap[table.table[y][x].pair];
    var rinv = table.table[y][x].no !== table.table[y][x].pair;
    return { x:rx, y:ry, inv:rinv };
  }
}

export default FLMask;
