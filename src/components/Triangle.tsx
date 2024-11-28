import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

const Triangle = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [rotationSlider, setRotationSlider] = useState<number>(rotation);
  const [radius, setRadius] = useState<number>(20);
  const [radiusSlider, setRadiusSlider] = useState<number>(radius); 
  
  const { glyph, setGlyph } = useGlyph();

  useEffect(() => {
    const imageData = drawCanvas(radius, (ctx) => {
      ctx.beginPath();
      ctx.rotate(rotation*Math.PI/180);
      ctx.moveTo(0, -radius);
      ctx.lineTo(-radius*Math.sin(60*Math.PI/180), radius*Math.cos(60*Math.PI/180));
      ctx.lineTo( radius*Math.sin(60*Math.PI/180), radius*Math.cos(60*Math.PI/180));
      ctx.closePath();
      ctx.fill();
    });
    setGlyph({data: imageData, boundary: radius});
  }, [radius, rotation]);

  return (
    <div>
    <div>Triangle</div>
      Radius
      <Slider min={1} max={99} value={radiusSlider} onChange={setRadiusSlider} onChangeEnd={setRadius}/>
      Rotation
      <Slider min={0} max={359} value={rotationSlider} onChange={setRotationSlider} onChangeEnd={setRotation}/>
    </div>
  );
}

export { Triangle }