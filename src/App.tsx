import '@mantine/core/styles.css';
import { AppShell, MantineProvider, Combobox, Input, InputBase, Button } from '@mantine/core';
import { GlyphProvider, useGlyph } from '~GlyphProvider';
import { BlueprintCanvas } from '~BlueprintCanvas';
import { Circle } from '~components/Circle';
import { Triangle } from '~components/Triangle';
import { Ellipse } from '~components/Ellipse';
import { ExportBlueprint } from '~ExportBlueprint';

const App = () => {
  const {glyph, setGlyph} = useGlyph();

  const options = ['circle', 'triangle'].map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  const importData = () => {
  }

  return (
    <MantineProvider>
      <GlyphProvider>
        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm' }}
          aside={{ width: 300, breakpoint: 'sm' }}
          padding="md"
        >
          <AppShell.Header>
            
          </AppShell.Header>
          <AppShell.Navbar p="md">
            <Combobox
              withinPortal={false}
              onOptionSubmit={(val) => {
            }}
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                >
                  {<Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>  
              </Combobox.Dropdown>
            </Combobox>
            <Circle/>
            <Triangle/>
            <Ellipse/>
          </AppShell.Navbar>
          <AppShell.Main>
            <BlueprintCanvas/>
          </AppShell.Main>
          <AppShell.Aside p="md">
            <textarea rows={10}></textarea>
            <Button onClick={importData} >Import</Button>
            <ExportBlueprint/>
          </AppShell.Aside>
        </AppShell>
      </GlyphProvider>
    </MantineProvider>
  );
}

export default App;