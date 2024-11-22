import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

type TriangleSettings = {
  radius: number;
  rotation: number;
}

const Triangle = () => {
  const [settings, setSettings] = useState<TriangleSettings>({ radius: 20, rotation: 0 });
  const [rotationValue, setRotationValue] = useState<number>(settings.rotation);
  const [radiusValue, setRadiusValue] = useState<number>(settings.radius);
  const { glyph, setGlyph } = useGlyph();

  const commitRadius = (radius: number) => {
    setSettings((prev) => ({ ...prev, radius }));
  }

  const updateRadius = (radius: number) => {
    setRadiusValue(radius);
  }

  const commitRotation = (rotation: number) => {
    setSettings((prev) => ({ ...prev, rotation }));
  }

  const updateRotation = (rotation: number) => {
    setRotationValue(rotation);
  }  

  useEffect(() => {
    const imageData = drawCanvas((ctx) => {
      const r = settings.radius;

      ctx.beginPath();
      ctx.rotate(settings.rotation*Math.PI/180);
      ctx.moveTo(0, -r);
      ctx.lineTo(-r*Math.sin(60*Math.PI/180), r*Math.cos(60*Math.PI/180));
      ctx.lineTo( r*Math.sin(60*Math.PI/180), r*Math.cos(60*Math.PI/180));
      ctx.closePath();

      ctx.fillStyle = 'black';
      ctx.fill();
    }, 2*settings.radius, 2*settings.radius);
    imageData && setGlyph(imageData);
  }, [settings]);

  return (
    <div>
    <div>Triangle</div>
      Radius
      <Slider min={1} max={100} value={settings.radius} onChange={updateRadius} onChangeEnd={commitRadius}/>
      Rotation
      <Slider min={0} max={359} value={rotationValue} onChange={updateRotation} onChangeEnd={commitRotation}/>
    </div>
  );
}

export { Triangle }