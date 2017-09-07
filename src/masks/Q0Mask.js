import { VertGlassMask, HorizGlassMask } from './GlassMask.js';
import InvertMask from './InvertMask.js';

class Q0Mask {
  applyMask(ctx, sel) {
    new VertGlassMask().applyMask(ctx, sel);
    new HorizGlassMask().applyMask(ctx, sel);
    new InvertMask().applyMask(ctx, sel);
  }
}

export default Q0Mask;
