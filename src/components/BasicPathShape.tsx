import { Slider } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useGlyph } from '~GlyphProvider';
import { drawCanvas } from '~utils';

type BasicPathShapeSettings = {
  radius: number;
}

const BasicPathShape = ({ shape, scale }: { shape: Path2D, scale: number }) => {
  const [settings, setSettings] = useState<BasicPathShapeSettings>({ radius: 40 });
  const { glyph, setGlyph } = useGlyph();
  const [radiusValue, setRadiusValue] = useState<number>(settings.radius);

  const commitRadius = (radius: number) => {
    setSettings((prev) => ({ ...prev, radius }));
  }

  useEffect(() => {
    const imageData = drawCanvas((ctx) => {
      const ratio = settings.radius * scale;
      ctx.scale(ratio, ratio);
      ctx.fill(shape);
    }, 2*settings.radius, 2*settings.radius);
    imageData && setGlyph(imageData);
  }, [settings]);

  return (
    <div>
      Radius
      <Slider min={1} max={200} value={radiusValue} onChangeEnd={commitRadius} onChange={setRadiusValue}/>
    </div>
  );
}

export { BasicPathShape }

