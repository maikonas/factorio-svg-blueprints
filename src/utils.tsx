import { deflate, inflate } from 'pako';

const drawCanvas = (callback: (ctx: OffscreenCanvasRenderingContext2D) => void) => {
    const canvas = new OffscreenCanvas(201, 201);
    const ctx = canvas.getContext('2d');
    if (ctx != null) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      callback(ctx);
      return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
}

const exportBlueprint = (blueprintObject: object): string => {
  const json = JSON.stringify(blueprintObject);
  const bytes = deflate(json, {level: 9});
  const output = btoa(String.fromCharCode.apply(null, Array.from(bytes)));
  return '0'+output;
}

const importBlueprint = (blueprintString: string): object => {
  const data = blueprintString.substring(1);
  const decodedArray = Uint8Array.from(atob(data), char => char.charCodeAt(0)); ;
  let out = inflate(decodedArray, { to: 'string' });
  return JSON.parse(out);
}

export { drawCanvas }