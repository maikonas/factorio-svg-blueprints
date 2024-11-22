import React, { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox, Image, Group } from '@mantine/core';
import { Circle } from '~components/Circle';
import { Triangle } from '~components/Triangle';
import { Ellipse } from '~components/Ellipse';
import { Falcon } from '~components/Falcon';

const shapeList: { [key: string]: React.FC } = {
  "Circle": Circle,
  "Triangle": Triangle,
  "Ellipse": Ellipse,
  'Falcon': Falcon,
}

const ShapeDropdown = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [selection, setSelection] = useState<string>("Circle");

  const options = Object.entries(shapeList).map(([key, value]) => (
    <Combobox.Option value={key} key={key}>
      <Group><Image src={'https://wow.osom.lt/icons/458173.jpg'} fit='contain' h='1rem'/><>{key}</></Group>
    </Combobox.Option>
  ));

  return (
    <>
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setSelection(val);
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
          {selection || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>  
      </Combobox.Dropdown>
    </Combobox>    
    {shapeList[selection] && React.createElement(shapeList[selection])}
    </>
  )
}

export { ShapeDropdown }