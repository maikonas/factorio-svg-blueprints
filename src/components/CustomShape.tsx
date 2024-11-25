import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { CustomShapeSettings, drawCanvas, drawShape } from '~utils';

const CustomShape = (settings: CustomShapeSettings) => {
  const { glyph, setGlyph } = useGlyph();
  const [radius, setRadiusValue] = useState<number>(100);
  const [slider, setSlider] = useState<number>(radius);
  
  useEffect(() => {
    const imageData = drawCanvas(radius, (ctx) => {
      ctx.scale(radius/100, radius/100);
      drawShape(ctx, settings, (path) => {
        ctx.fill(path);
      });
    });
    setGlyph(imageData);
  }, [radius, settings]);

  return (
    <div>
      Radius
      <Slider min={1} max={200} value={slider} onChangeEnd={setRadiusValue} onChange={setSlider}/>
    </div>
  );
}
export { CustomShape }

