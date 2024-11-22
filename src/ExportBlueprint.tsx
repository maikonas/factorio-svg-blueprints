import { Button, Textarea } from "@mantine/core";
import { useRef } from "react";
import { useGeneralSettings } from "~GeneralSettingsProvider";
import { useGlyph } from "~GlyphProvider";
import { exportBlueprint, generateBlueprintObject } from "~utils";

const ExportBlueprint = () => {
  const exportArea = useRef<HTMLTextAreaElement>(null);
  const {glyph} = useGlyph();
  const {settings} = useGeneralSettings();

  const exportData = () => {
    if (glyph) {
      const obj = generateBlueprintObject(glyph, settings);
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