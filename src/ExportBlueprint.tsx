import { Button, Stack, Textarea } from "@mantine/core";
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
      const obj = generateBlueprintObject(glyph.data, settings);
      console.log(obj);

      exportArea.current!.value = exportBlueprint(obj)
    }
  }
  
  return (
    <Stack>
      <Textarea ref={exportArea} rows={10}/>
      <Button onClick={exportData}>Generate Blueprint</Button>
    </Stack>
  );
}

export { ExportBlueprint }