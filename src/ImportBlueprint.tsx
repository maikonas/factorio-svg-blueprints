import { Button, Textarea } from "@mantine/core";
import { useRef } from "react";
import { useImportedBlueprint } from "~ImportedBlueprintProvider";
import { generateBlueprintObject, importBlueprint, KeyValue } from "~utils";

const entityColors: KeyValue = {
  'space-platform-foundation': '#ff8181',
  'belt': '#FFAA00',
}

const ImportBlueprint = () => {
  const importArea = useRef<HTMLTextAreaElement>(null);
  const {setImported} = useImportedBlueprint();

  const importData = () => {
    if (importArea.current) {
      const blueprint = importBlueprint(importArea.current.value);

      let minX: number = Infinity;
      let minY: number = Infinity;
      let maxX: number= -Infinity; 
      let maxY: number = -Infinity;

      const updateDimensions = (position: KeyValue) => {
        minX = Math.min(minX, position['x']);
        maxX = Math.max(maxX, position['x']);
        minY = Math.min(minY, position['y']);
        maxY = Math.max(maxY, position['y']);
      }

      const pixel = (x: number, y: number, size: number, color?: number[]): void => {
        const index = (x + y * size) * 4;
        data[index + 0] = 255;
        if (color && color.length === 3) {
          data[index + 1] = color[0];
          data[index + 2] = color[1];
          data[index + 3] = color[2];
        } else {
          data[index + 1] = 129;
          data[index + 2] = 129;
          data[index + 3] = 129;
        }
      }

      const entities = new Set<string>();
      blueprint['blueprint']['entities'].forEach((element: KeyValue) => {
        entities.add(element['name']);
        updateDimensions(element['position']);
      });
      console.log(entities);

      blueprint['blueprint']['tiles'].forEach((element: KeyValue) => {
        updateDimensions(element['position']);
      });      
      console.log(minX, minY, maxX, maxY);
      // const width = Math.round(maxX) - Math.round(minX) + 2;
      // const height = Math.round(maxY) - Math.round(minY) + 2;
      const size = 2*Math.max(-Math.round(minX), -Math.round(minY), Math.round(maxX), Math.round(maxY)) + 2;
      const data = new Uint8ClampedArray(4 * size * size);

      console.log(size);

      blueprint['blueprint']['tiles'].forEach((element: KeyValue) => {
        //console.log(element);
        pixel(size/2 + element['position']['x'], size/2 + element['position']['y'], size);
      });      
      blueprint['blueprint']['entities'].forEach((element: KeyValue) => {
        let setting = [0, 0, 1, 1, 255, 0, 0];
        switch (true) {
          case element['name'] === 'space-platform-hub':
            setting = [-4, -4, 3, 3, 0, 255, 0];
            break;
          case element['name'] === 'thruster':
            setting = [-1, -2, 3, 5, 255, 192, 64];
            break;
          case /^-belt$/.test(element['name']):
            console.log('belt');
            break;
        }

        let actualColor = setting.slice(4, 7);
        console.log(element);
        for (let dx = setting[0]; dx < setting[2]; dx++) {
          for(let dy = setting[1]; dy < setting[3]; dy++) {
            pixel(
              size/2 + Math.round(element['position']['x']) -1 + dx, 
              size/2 + Math.round(element['position']['y']) -1 + dy, size, actualColor);
          }
        }
      });  
      
      const glyph = new ImageData(data, size);
      setImported({glyph, blueprint});
    }
  }

  //M -77 0 A 1 1 0 0 0 76 0 C 76 -10 75 -21 69 -32 L 77 -37 L 77 -56 L 73 -71 L 62 -71 L 58 -58 L 58 -50 L 54 -54 L 20 -131 L 12 -131 L 12 -76 L 9 -76 L 9 -92 L -9 -92 L -9 -76 L -12 -76 L -12 -131 L -19 -131 L -54 -55 C -66 -42 -77 -22 -77 -4 Z

  const bp = "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"
  
  return (
    <>
      <Textarea ref={importArea} rows={10} defaultValue={bp}/>
      <Button onClick={importData}>Import</Button>
    </>
  );
}

export { ImportBlueprint }