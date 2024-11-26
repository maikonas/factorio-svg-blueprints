import { useEffect, useRef } from "react";
import { useGeneralSettings } from "~GeneralSettingsProvider";
import { useGlyph } from "~GlyphProvider";

const BlueprintCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { glyph } = useGlyph();
  const { settings } = useGeneralSettings();

  useEffect(() => {
    if (canvasRef.current) {    
      const ctx = canvasRef.current.getContext('2d');
      if (glyph && ctx) {
        const image = glyph.data;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let ratio = ctx.canvas.width / (2*glyph.boundary);
        ratio = ratio >= 10 ? 10 : ratio;

        for(let x = -glyph.boundary; x < glyph.boundary; x++) {
          for(let y = -glyph.boundary; y < glyph.boundary; y++) {
            if (x > -100 && x < 100 && y > -100 && y < 100) {
              const index = (x + 100 + (y + 100) * image.width) * 4;
              const fill = image.data[index+3]

              if (fill > 64) {
                ctx.fillStyle = 'black';
                ctx.fillRect(
                  x * ratio + ctx.canvas.width/2, 
                  y * ratio + ctx.canvas.height/2, 
                  ratio, 
                  ratio
                );
              }
            }
          }
        }

        if (settings.addSpacePlatformHub) {
          const dx = settings.platformHubX || 0;
          const dy = settings.platformHubY || 0;

          for(let x = -4; x < 4; x++) {
            for(let y = -4; y < 4; y++) {
              ctx.fillStyle = 'green';
              ctx.fillRect(
                (x + dx) * ratio + ctx.canvas.width/2, 
                (y + dy) * ratio + ctx.canvas.height/2, 
                ratio, 
                ratio
              );
            }
          }
        }
      }
    }
  }, [glyph, settings])

  return (
    <canvas ref={canvasRef} width={500} height={500} style={{border: '1px solid black'}}></canvas>
  );
};

export { BlueprintCanvas }