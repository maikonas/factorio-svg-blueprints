import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
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
      ctx.strokeStyle = 'black';
      ctx.arc(0, 0, settings.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fill();
    }, 2*settings.radius, 2*settings.radius);
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

