import { Group, Text, Textarea, Stack, TextInput, NumberInput, Modal, Button, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRef, useEffect, useState, ChangeEvent, useDebugValue, useCallback } from 'react';
import { CustomShapeSettings, drawShape } from '~utils';

const CreateCustomShape = ({callback}: {callback:(settings: CustomShapeSettings) => void}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [shapeSettings, setShapeSettings] = useState<CustomShapeSettings>({
    path: 'M0-20C5-20 10-15 10-10L30-5C30-15 24-30 15-30L15-40C30-40 40-21 40 0 40 20 30 40 15 40L15 30C24 30 30 15 30 5L10 10C10 15 5 20 0 20Z',
    scale: 0.019,
    horizontalMirror: true,
    verticalMirror: false,
    rotations: 1,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const context = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height).getContext('2d')!;

        context.fillStyle = 'white';
        context.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        context.translate(100, 100);

        context.strokeStyle = 'gray'
        context.lineWidth = 0.2;

        context.beginPath();
        context.moveTo(0.5, -100.5);
        context.lineTo(0.5, 100.5);
        context.stroke();

        context.beginPath();
        context.moveTo(100.5, 0.5)
        context.lineTo(-100.5, 0.5);
        context.stroke();

        context.scale(100, 100);

        context.fillStyle = 'rgba(0 0 0 / 40%)';
        context.strokeStyle = 'black';
        context.lineWidth = 0.3

        drawShape(context, shapeSettings, (path) => {
          context.fill(path);
          context.stroke(path);
        });
        ctx.drawImage(context.canvas, 0, 0);
      }
    }
  }, [shapeSettings, opened]);

  const changePath = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const val = event.currentTarget.value;
    setShapeSettings((prev) => ({...prev, path: val}));
  }

  const changeRotations = (value: string | number) => {
    if (typeof value === 'number') {
      setShapeSettings((prev) => ({ ...prev, rotations: value }));
    }
  }

  const changeScale = (value: string | number) => {
    if (typeof value === 'number') {
      setShapeSettings((prev) => ({ ...prev, scale: value }));
    }
  }

  const changeHorizontalMirror = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.checked
    setShapeSettings((prev) => ({...prev, horizontalMirror: val}));
  }

  const changeVerticalMirror = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.checked
    setShapeSettings((prev) => ({...prev, verticalMirror: val}));
  }

  const clickApply = () => {
    callback(shapeSettings);
    close();
  }

  return(
    <>
    <Button onClick={open}>Import SVG Shape</Button>
    <Modal keepMounted={true} opened={opened} onClose={close} title="Custom shape" size='auto'>
      <Group grow>
        <Stack>
          <Text fz='xs'>Preview</Text> 
          <><canvas ref={canvasRef} width={201} height={201} style={{border: '1px solid gray'}}></canvas></>
        </Stack>
        <Stack>
          <Text fz='xs'>Create custom SVG shapes with <a href='https://yqnn.github.io/svg-path-editor/' target='_blank'>SVG Path Editor</a></Text> 
          <Textarea label='SVG shape' rows={6} value={shapeSettings.path} radius='md' onChange={changePath}/>
          <NumberInput label='Scale' value={shapeSettings.scale} description='Resize to fit the shape into the box, otherwise it will be clipped' min={0} max={100} onChange={changeScale} />
          <NumberInput label='Rotations' value={shapeSettings.rotations} min={1} max={20} onChange={changeRotations} />
          <Checkbox label='Mirror horizontally' checked={shapeSettings.horizontalMirror} onChange={changeHorizontalMirror}  />
          <Checkbox label='Mirror vertically' checked={shapeSettings.verticalMirror} onChange={changeVerticalMirror}  />
          <Button onClick={clickApply}>Apply</Button>
        </Stack>
      </Group>
    </Modal>
    </>
  )
}

export { CreateCustomShape }