import { ChangeEvent, useState } from 'react';
import { Combobox, InputBase, useCombobox, Image, Group, Stack, Checkbox, Slider, Text } from '@mantine/core';
import { useGeneralSettings } from '~GeneralSettingsProvider';

type GeneralSettingsType = {
  tile: string,
  addSpacePlatformHub: boolean,
  platformHubX: number,
  platformHubY: number,
}

const selectionList: {[key: string]: string[]} = {
  'Space Age': ['space-platform-foundation', 'foundation', 'ice-platform'],
  'Vanilla':   ['landfill', 'stone-path', 'concrete', 'hazard-concrete-left', 'refined-concrete', 'refined-hazard-concrete-left', ],
}

const options = Object.entries(selectionList).map(([key, value]) => {
  const subOptions = value.map((option) => (
    <Combobox.Option value={option} key={option}>
      <Group><Image src={`/icons/${option}.png`} fit='contain' h='2rem'/>{option}</Group>
    </Combobox.Option>
  ))
  return(
    <Combobox.Group label={key} key={key}>
      {subOptions}
    </Combobox.Group>
  )
});

const GeneralSettings = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const {settings, setSettings} = useGeneralSettings()

  const [hubX, setHubX] = useState<number>(settings.platformHubX);
  const [hubY, setHubY] = useState<number>(settings.platformHubY);

  const commitHubX = (value: number) => {
    setSettings((prevSettings) => ({...prevSettings, platformHubX: value}));
  }

  const commitHubY = (value: number) => {
    setSettings((prevSettings) => ({...prevSettings, platformHubY: value}));
  }

  const commitTile = (value: string) => {
    setSettings((prevSettings) => ({...prevSettings, tile: value, addSpacePlatformHub: value === 'space-platform-foundation'}));
  }

  const spaceTile = (): boolean => {
    return settings.tile === 'space-platform-foundation'
  }

  const commitHubPresence = (event: ChangeEvent<HTMLInputElement>): void => {
    const val = event.currentTarget.checked
    setSettings((prevSettings) => ({...prevSettings, addSpacePlatformHub: val}));
  }

  return (
    <Stack>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          commitTile(val);
          combobox.closeDropdown();
      }}>
        <Combobox.Target>
          <InputBase
            component='button'
            type='button'
            pointer
            description='Select tile'
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none">

            <Group wrap='nowrap'><Image src={`/icons/${settings.tile}.png`} fit='contain' h='1rem'/>{settings.tile}</Group>
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>  
        </Combobox.Dropdown>
      </Combobox>    
      <Checkbox disabled={!spaceTile()} checked={settings.addSpacePlatformHub} label="Add Space Platform Hub" onChange={commitHubPresence}/>
      <Text fz='xs'>Space Platform Hub Position</Text>
      <Slider min={-100} max={100} step={1} onChange={setHubX} value={hubX} onChangeEnd={commitHubX} disabled={!settings.addSpacePlatformHub}/>
      <Slider min={-100} max={100} step={1} onChange={setHubY} value={hubY} onChangeEnd={commitHubY} disabled={!settings.addSpacePlatformHub}/>
    </Stack>
  )
}

export { GeneralSettings, GeneralSettingsType }