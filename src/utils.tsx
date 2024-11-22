import { deflate, inflate } from 'pako';

const drawCanvas = (callback: (ctx: OffscreenCanvasRenderingContext2D) => void, width?: number, height?: number) => {
    const canvas = new OffscreenCanvas(width ?? 201, height ?? 201);
    const ctx = canvas.getContext('2d');
    if (ctx != null) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width/2, canvas.height/2);
      callback(ctx);
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
}

const exportBlueprint = (blueprintObject: Blueprint): string => {
  const json = JSON.stringify(blueprintObject);
  const bytes = deflate(json, {level: 9});
  const output = btoa(String.fromCharCode.apply(null, Array.from(bytes)));
  return '0'+output;
}

const importBlueprint = (blueprintString: string): Blueprint => {
  const data = blueprintString.substring(1);
  const decodedArray = Uint8Array.from(atob(data), char => char.charCodeAt(0)); ;
  let out = inflate(decodedArray, { to: 'string' });
  return JSON.parse(out);
}

interface Blueprint {
  [key: string]: any;
}
interface KeyValue {
  [key: string]: any;
}

const emptyBlueprint: Blueprint = {
  "blueprint": {
    "icons": [],
    "entities": [],
    "tiles": [],
    "item": "blueprint",
    "version": 0
  }
}

const generateBlueprintObject = (glyph: ImageData, currentBlueprint?: Blueprint): Blueprint => {
  let blueprintObject = currentBlueprint ? { ...currentBlueprint } : { ...emptyBlueprint };

  const halfWidth = glyph.width / 2;
  const halfHeight = glyph.height / 2;

  for(let x=0; x<glyph.width; x++) {
    for(let y=0; y<glyph.height; y++) {
      let index = (x + y * glyph.width) * 4;
      if (glyph.data[index+3] >= 64) {
        blueprintObject['blueprint']['tiles'].push({position: {x: x-halfWidth, y: y-halfHeight}, name: 'space-platform-foundation'});
      }
    }
  }
  return blueprintObject;
}

export { drawCanvas, importBlueprint, exportBlueprint, generateBlueprintObject, Blueprint, KeyValue }