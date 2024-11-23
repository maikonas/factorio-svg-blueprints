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
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let ratio = ctx.canvas.width / glyph.width;
        ratio = ratio >= 10 ? 10 : ratio; 

        for(let x = 0; x < glyph.width; x++) {
          for(let y = 0; y < glyph.height; y++) {
            let index = (x + y * glyph.width) * 4;
            const fill = glyph.data[index+3]
            if (fill < 64) {
              ctx.fillStyle = 'white';
            } else 
            {
              ctx.fillStyle = `rgb(${glyph.data[index+0]} ${glyph.data[index+1]} ${glyph.data[index+2]} / ${100}%)`;
            }
            ctx.fillRect(
              (x - glyph.width/2)*ratio + ctx.canvas.width/2, 
              (y - glyph.height/2)*ratio + ctx.canvas.height/2, 
              ratio, 
              ratio
            );
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