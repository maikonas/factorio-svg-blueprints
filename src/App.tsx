import '@mantine/core/styles.css';
import { AppShell, Button, MantineProvider, Modal, Stack, Text } from '@mantine/core';
import { GlyphProvider } from '~GlyphProvider';
import { BlueprintCanvas } from '~BlueprintCanvas';
import { ExportBlueprint } from '~ExportBlueprint';
import { GeneralSettings } from '~GeneralSettings';
import { ShapeDropdown } from '~ShapeDropdown';
import { GeneralSettingsProvider } from '~GeneralSettingsProvider';

const App = () => {
  return (
    <MantineProvider>
      <GlyphProvider>
        <GeneralSettingsProvider>
        <AppShell
          header={{ height: 16 * 4 }}
          navbar={{ width: 300, breakpoint: 'sm' }}
          aside={{ width: 400, breakpoint: 'sm' }}
          padding="md"
        >
          <AppShell.Header>
            <Text fw={500} pt='xs' pl='xs'>Factorio shapes</Text>
            <Text fz="xs" opacity={0.6} pl='xs'>Export SVG shapes as Factorio blueprints</Text>
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
            <ExportBlueprint/>
          </AppShell.Aside>
        </AppShell>
        </GeneralSettingsProvider>
      </GlyphProvider>
    </MantineProvider>
  );
}

export default App;