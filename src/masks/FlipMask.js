import { FlipVert, FlipHoriz } from './Common';

class FlipVertMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    FlipVert(myImageData, 0, 0, myImageData.width, myImageData.height);
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

class FlipHorizMask {
  applyMask(ctx, sel) {
    ctx.save();
    const myImageData = ctx.getImageData(sel.x, sel.y, sel.w, sel.h);
    FlipHoriz(myImageData, 0, 0, myImageData.width, myImageData.height);
    ctx.putImageData(myImageData, sel.x, sel.y);
    ctx.restore();
  }
}

export { FlipVertMask, FlipHorizMask };
