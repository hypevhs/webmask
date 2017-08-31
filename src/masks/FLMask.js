/**
 * @class FLMask
 * @see https://github.com/zqad/zmask/blob/master/src/org/zkt/zmask/masks/FL.java
 */
class FLMask {
  applyMask(ctx, sel) {
    ctx.save();

    // get parameters
    var width = sel.w;
    var height = sel.h;
    var cellWidth = width / 8;
    var cellHeight = height / 8;

    // no bullshit selection sizes
    console.assert(height % 8 === 0);
    console.assert(width % 8 === 0);

    // get FLTable
    var table = this.buildTable(cellWidth, cellHeight);

    // extract into source buffer
    var srcData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);

    // create empty destination buffer
    var destData = ctx.createImageData(srcData);

    // srcData buffer -> magical rearrangement dictionary -> destData buffer
    for (var y = 0; y < cellHeight; y++) {
      for (var x = 0; x < cellWidth; x++) {
        var tr = this.tableTransform(table, x, y);
        this.transferCell(srcData, destData, x*8, y*8, tr.x*8, tr.y*8, tr.inv);
      }
    }

    // draw destination buffer back to the canvas
    ctx.putImageData(destData, sel.x, sel.y);

    ctx.restore();
  }

  /**
   * transfer an 8x8 cell starting from x,y from one buffer to another
   * @param {ImageData} src image buffer we copy from
   * @param {ImageData} dest image buffer we copy to
   * @param {number} srcX pixel coordinate X of source cell's topleftmost pixel
   * @param {number} srcY pixel coordinate Y of destination cell's topleftmost pixel
   * @param {number} destX pixel coordinate X of source cell's topleftmost pixel
   * @param {number} destY pixel coordinate Y of destination cell's topleftmost pixel
   * @param {boolean} invert whether to invert the RGB of this cell
   */
  transferCell(src, dest, srcX, srcY, destX, destY, invert) {
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
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
      table[y][x] = this.FLCell(i, width * height - i - 1);
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

    return this.FLTable(table, xMap, yMap);
  }

  tableTransform(table, x, y) {
    var rx = table.xMap[table.table[y][x].pair];
    var ry = table.yMap[table.table[y][x].pair];
    var rinv = table.table[y][x].no !== table.table[y][x].pair;
    if (!rinv)
      console.log(`no rinv for ${rx},${ry}: ${rinv}`);
    return this.FLTransformResult(rx, ry, rinv);
  }

  FLTransformResult(x, y, inv) {
    console.assert(typeof x === "number");
    console.assert(typeof y === "number");
    console.assert(typeof inv === "boolean");
    return { x:x, y:y, inv:inv };
  }

  FLTable(table, xMap, yMap) {
    console.assert(table instanceof Array);
    console.assert(table.length);
    console.assert(table[0] instanceof Array);
    console.assert(table[0].length);
    console.assert(table[0][0] instanceof Object); // FLCell

    console.assert(xMap instanceof Array);
    console.assert(xMap.length);
    console.assert(typeof xMap[0] === "number");

    console.assert(yMap instanceof Array);
    console.assert(yMap.length);
    console.assert(typeof yMap[0] === "number");

    return { table:table, xMap:xMap, yMap:yMap };
  }

  FLCell(no, pair) {
    console.assert(typeof no === "number");
    console.assert(typeof pair === "number");
    return { no:no, pair:pair };
  }
}

export default FLMask;
