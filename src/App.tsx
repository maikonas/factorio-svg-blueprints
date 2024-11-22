import '@mantine/core/styles.css';
import { AppShell, MantineProvider, Stack, Text } from '@mantine/core';
import { GlyphProvider } from '~GlyphProvider';
import { BlueprintCanvas } from '~BlueprintCanvas';
import { ExportBlueprint } from '~ExportBlueprint';
import { GeneralSettings } from '~GeneralSettings';
import { ImportedBlueprintProvider } from '~ImportedBlueprintProvider';
import { ImportBlueprint } from '~ImportBlueprint';
import { ShapeDropdown } from '~ShapeDropdown';
import { GeneralSettingsProvider } from '~GeneralSettingsProvider';

const App = () => {
  return (
    <MantineProvider>
      <GlyphProvider>
        <ImportedBlueprintProvider><GeneralSettingsProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm' }}
          aside={{ width: 400, breakpoint: 'sm' }}
          padding="md"
        >
          <AppShell.Header>
            <Text size='xl' p='md'>Bluepring generator</Text>
          </AppShell.Header>
          <AppShell.Navbar p='md'>
          <Stack gap='md'>
            <GeneralSettings/>
            <ShapeDropdown/>
          </Stack>
          </AppShell.Navbar>
          <AppShell.Main>
            <BlueprintCanvas/>
          </AppShell.Main>
          <AppShell.Aside p="md">
            <ImportBlueprint/>
            <ExportBlueprint/>
          </AppShell.Aside>
        </AppShell>
        </GeneralSettingsProvider></ImportedBlueprintProvider>
      </GlyphProvider>
    </MantineProvider>
  );
}

export default App;