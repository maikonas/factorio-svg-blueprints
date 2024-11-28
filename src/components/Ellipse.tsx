import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

const Ellipse = () => {
  const { glyph, setGlyph } = useGlyph();
  const [radiusA, setRadiusA] = useState<number>(20);
  const [radiusB, setRadiusB] = useState<number>(40);

  const [sliderA, setSliderA] = useState<number>(radiusA);
  const [sliderB, setSliderB] = useState<number>(radiusB);

  useEffect(() => {
    let width = radiusA > radiusB ? radiusA : radiusB;

    const imageData = drawCanvas(width, (ctx) => {
      ctx.ellipse(0, 0, radiusA, radiusB, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    setGlyph({data: imageData, boundary: width});
  }, [radiusA, radiusB]);

  return (
    <div>
      Radius A
      <Slider min={1} max={99} value={sliderA} onChangeEnd={setRadiusA} onChange={setSliderA}/>
      Radius B
      <Slider min={1} max={99} value={sliderB} onChangeEnd={setRadiusB} onChange={setSliderB}/>
    </div>
  );
}
export { Ellipse }

