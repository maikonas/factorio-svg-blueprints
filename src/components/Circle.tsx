import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

const Circle = () => {
  const { glyph, setGlyph } = useGlyph();
  const [radius, setRadiusValue] = useState<number>(20);
  const [slider, setSlider] = useState<number>(radius);
  
  useEffect(() => {
    const imageData = drawCanvas(radius, (ctx) => {
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    setGlyph({data: imageData, boundary: radius});
  }, [radius]);

  return (
    <div>
      Radius
      <Slider min={1} max={99} value={slider} onChangeEnd={setRadiusValue} onChange={setSlider}/>
    </div>
  );
}
export { Circle }

