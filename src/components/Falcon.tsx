import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

type FalconSettings = {
  radius: number;
}

const falcon2d = new Path2D('M -77 0 A 1 1 0 0 0 76 0 C 76 -10 75 -21 69 -32 L 77 -37 L 77 -56 L 73 -71 L 62 -71 L 58 -58 L 58 -50 L 54 -54 L 20 -131 L 12 -131 L 12 -76 L 9 -76 L 9 -92 L -9 -92 L -9 -76 L -12 -76 L -12 -131 L -19 -131 L -54 -55 C -66 -42 -77 -22 -77 -4 Z');

const Falcon = () => {
  const [settings, setSettings] = useState<FalconSettings>({ radius: 40 });
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
      const ratio = settings.radius / 140;
      ctx.scale(ratio, ratio);
      ctx.fill(falcon2d);
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
export { Falcon }

