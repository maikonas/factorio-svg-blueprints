import '@mantine/core/styles.css';
import { AppShell, Button, MantineProvider, Image, Stack, Text, Group } from '@mantine/core';
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
            <Group justify='flex-start' p={0}>
              <Stack justify='' p={0} gap={0} pt='xs'>
                <Text fw={500} pl='xs'>Factorio shapes</Text>
                <Text fz="xs" opacity={0.6} pl='xs'>Export SVG shapes as Factorio blueprints</Text>
              </Stack>
              <a href='https://github.com/maikonas/factorio-svg-blueprints' target='_blank'><Image src='https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png' w='2rem' h='2rem' /></a>
            </Group>
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