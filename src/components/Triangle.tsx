import { Slider } from '@mantine/core';
import { createContext, useState, useContext, useMemo } from 'react';
import { useGlyph } from '~GlyphProvider';

type TriangleSettings = {
  radius: number;
}

const Triangle = () => {
  const [settings, setSettings] = useState<TriangleSettings>({ radius: 20 });
  const { glyph, setGlyph } = useGlyph();

  const handleRadiusChange = (radius: number) => {
    setSettings((prev) => ({ ...prev, radius }));
  }

  const updateRadius = (radius: number) => {
    handleRadiusChange(radius);
  }

  let contextValue = useMemo(() => {
    const canvas = new OffscreenCanvas(settings.radius * 2, settings.radius * 2);
    const ctx = canvas.getContext('2d');
    if (ctx != null) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = 'black';
      ctx.fill();

      setGlyph(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    return {
      settings,
      updateRadius: handleRadiusChange,
    }
  }, [settings]);

  return (
    <div>
    <div>Triangle</div>
      Radius
      <Slider min={1} max={200} value={settings.radius} onChangeEnd={updateRadius}/>
    </div>
  );
}

export { Triangle }