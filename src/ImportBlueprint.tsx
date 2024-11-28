import { Button, Textarea } from "@mantine/core";
import { useRef } from "react";
import { generateBlueprintObject, importBlueprint, KeyValue } from "~utils";

const entityColors: KeyValue = {
  'space-platform-foundation': '#ff8181',
  'belt': '#FFAA00',
}

const ImportBlueprint = () => {
  const importArea = useRef<HTMLTextAreaElement>(null);

  const importData = () => {
    if (importArea.current) {
      const blueprint = importBlueprint(importArea.current.value);

      console.log(blueprint);
    }
  }

  return (
    <>
      <Textarea ref={importArea} rows={10}/>
      <Button onClick={importData}>Import</Button>
    </>
  );
}

export { ImportBlueprint }