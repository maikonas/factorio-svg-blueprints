import { Button, Textarea } from "@mantine/core";
import { useRef } from "react";
import { useGlyph } from "~GlyphProvider";
import { exportBlueprint, generateBlueprintObject } from "~utils";

const ExportBlueprint = () => {
  const exportArea = useRef<HTMLTextAreaElement>(null);
  const {glyph, setGlyph} = useGlyph();

  const exportData = () => {
    console.log(glyph);
    if (glyph) {
      const obj = generateBlueprintObject(glyph);
      exportArea.current!.value = exportBlueprint(obj)
    }
  }
  
  return (
    <>
      <Textarea ref={exportArea} rows={10}/>
      <Button onClick={exportData}>Export</Button>
    </>
  );
}

export { ExportBlueprint }