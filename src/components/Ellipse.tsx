import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

type EllipseSettings = {
  radiusA: number;
  radiusB: number;
}

const Ellipse = () => {
  const [settings, setSettings] = useState<EllipseSettings>({ radiusA: 40, radiusB: 20 });
  const { glyph, setGlyph } = useGlyph();
  const [radiusValueA, setRadiusAValue] = useState<number>(settings.radiusA);
  const [radiusValueB, setRadiusBValue] = useState<number>(settings.radiusB);

  const commitRadiusA = (radiusA: number) => {
    setSettings((prev) => ({ ...prev, radiusA }));
  }

  const commitRadiusB = (radiusB: number) => {
    setSettings((prev) => ({ ...prev, radiusB }));
  }

  const radiusAChange = (radius: number) => {
    setRadiusAValue(radius);
  }

  const radiusBChange = (radius: number) => {
    setRadiusBValue(radius);
  }

  useEffect(() => {
    let width = settings.radiusA > settings.radiusB ? settings.radiusA : settings.radiusB;

    const imageData = drawCanvas((ctx) => {
      ctx.ellipse(0, 0, settings.radiusA, settings.radiusB, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'gray';
      ctx.stroke
      ctx.fill();
    }, 2*width, 2*width);
    imageData && setGlyph(imageData);
  }, [settings]);

  return (
    <div>
      Radius A
      <Slider min={1} max={200} value={radiusValueA} onChangeEnd={commitRadiusA} onChange={radiusAChange}/>
      Radius B
      <Slider min={1} max={200} value={radiusValueB} onChangeEnd={commitRadiusB} onChange={radiusBChange}/>
    </div>
  );
}
export { Ellipse }

