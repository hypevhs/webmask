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
    var bsWidth = 8;
    var bsHeight = 8;
    var cellWidth = width / bsWidth;
    var cellHeight = height / bsHeight;

    // no bullshit selection sizes
    console.assert(height % bsHeight === 0);
    console.assert(width % bsWidth === 0);

    // get FLTable
    var table = this.buildTable(cellWidth, cellHeight);

    // copy out our selection in 8x8 blocks
    var imageDatas = Array(cellHeight).fill().map(y => Array(cellWidth).fill(null));
    var x,y;
    for (y = 0; y < cellHeight; y++) {
      for (x = 0; x < cellWidth; x++) {
        imageDatas[y][x] = ctx.getImageData(sel.x + x * bsWidth, sel.y + y * bsHeight, bsWidth, bsHeight);
      }
    }

    // then using the magical rearrangement dictionary, draw them back to the canvas in strange orders
    for (y = 0; y < cellHeight; y++) {
      for (x = 0; x < cellWidth; x++) {
        // FLTransformResult
        var tr = this.tableTransform(table, x, y);
        ctx.putImageData(imageDatas[y][x], sel.x + tr.x * bsWidth, sel.y + tr.y * bsHeight);
      }
    }

    ctx.restore();
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
    console.log(`table: ${table.length},${table[0].length}`);

    console.assert(xMap instanceof Array);
    console.assert(xMap.length);
    console.assert(typeof xMap[0] === "number");
    console.log(`xMap: ${xMap.length}`);

    console.assert(yMap instanceof Array);
    console.assert(yMap.length);
    console.assert(typeof yMap[0] === "number");
    console.log(`yMap: ${yMap.length}`);

    return { table:table, xMap:xMap, yMap:yMap };
  }

  FLCell(no, pair) {
    console.assert(typeof no === "number");
    console.assert(typeof pair === "number");
    return { no:no, pair:pair };
  }
}

export default FLMask;
