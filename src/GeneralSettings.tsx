import { ChangeEvent, useState } from 'react';
import { Combobox, Input, InputBase, useCombobox, Image, Group, Stack, Checkbox, Slider } from '@mantine/core';
import { useGeneralSettings } from '~GeneralSettingsProvider';

type GeneralSettingsType = {
  tile: string,
  addSpacePlatformHub: boolean,
  platformHubX?: number,
  platformHubY?: number,
}

const selectionList: {[key: string]: string[]} = {
  'Space Age': ['space-platform-foundation', 'foundation', 'ice-platform'],
  'Vanilla': ['landfill', 'stone-brick', 'concrete', 'hazard-concrete', 'refined-concrete', 'refined-hazard-concrete'],
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

  const [selection, setSelection] = useState<string>(selectionList['Space Age'][0]);
  const [hubX, setHubX] = useState<number>(0);
  const [hubY, setHubY] = useState<number>(0);

  const commitHubX = (value: number) => {
    setSettings({...settings, platformHubX: value})
  }

  const commitHubY = (value: number) => {
    setSettings({...settings, platformHubY: value})
  }

  const commitHubPresence = (event: ChangeEvent<HTMLInputElement>): void => {
    setSettings({...settings, addSpacePlatformHub: event.currentTarget.checked})
  }

  return (
    <Stack>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setSelection(val);
          setSettings({...settings, tile: val})
          combobox.closeDropdown();
      }}>
        <Combobox.Target>
          <InputBase
            component='button'
            type='button'
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none">
            {selection && <Group wrap='nowrap'><Image src={`/icons/${selection}.png`} fit='contain' h='1rem'/>{selection}</Group>}
            {!selection && <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>  
        </Combobox.Dropdown>
      </Combobox>    
      <Checkbox checked={settings.addSpacePlatformHub} label="Add Space Platform Hub" onChange={commitHubPresence}/>
      <Slider min={-100} max={100} step={1} onChange={setHubX} value={hubX} onChangeEnd={commitHubX} disabled={!settings.addSpacePlatformHub}/>
      <Slider min={-100} max={100} step={1} onChange={setHubY} value={hubY} onChangeEnd={commitHubY} disabled={!settings.addSpacePlatformHub}/>
    </Stack>
  )

}

export { GeneralSettings, GeneralSettingsType }