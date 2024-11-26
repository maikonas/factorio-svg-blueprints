import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { CustomShapeSettings, drawCanvas, drawShape } from '~utils';

const CustomShape = (settings: CustomShapeSettings) => {
  const { glyph, setGlyph } = useGlyph();
  const [radius, setRadiusValue] = useState<number>(30);
  const [slider, setSlider] = useState<number>(radius);
  
  useEffect(() => {
    const imageData = drawCanvas(radius, (ctx) => {
      ctx.scale(radius, radius);
      drawShape(ctx, settings, (path) => {
        ctx.fill(path);
      });
    });
    setGlyph({data: imageData, boundary: Math.round(radius)});
  }, [radius, settings]);

  return (
    <div>
      Radius
      <Slider min={1} max={99} step={0.5} value={slider} onChangeEnd={setRadiusValue} onChange={setSlider}/>
    </div>
  );
}
export { CustomShape }

