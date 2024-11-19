import { Slider } from '@mantine/core';
import { createContext, useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

type CircleSettings = {
  radius: number;
}

const Circle = () => {
  const [settings, setSettings] = useState<CircleSettings>({ radius: 20 });
  const { glyph, setGlyph } = useGlyph();
  const [radiusValue, setRadiusValue] = useState<number>(settings.radius);

  const commitRadius = (radius: number) => {
    setSettings((prev) => ({ ...prev, radius }));
  }

  const radiusChange = (radius: number) => {
    setRadiusValue(radius);
  }

  useEffect(() => {
    const imageData = drawCanvas((ctx) => {
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, settings.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
    });
    imageData && setGlyph(imageData);
  }, [settings]);

  return (
    <div>
      Radius
      <Slider min={1} max={200} value={radiusValue} onChangeEnd={commitRadius} onChange={radiusChange}/>
    </div>
  );
}
export { Circle }

