import React, { useState } from 'react';
import { Combobox, InputBase, useCombobox, Group, Text } from '@mantine/core';
import { Circle } from '~components/Circle';
import { Triangle } from '~components/Triangle';
import { Ellipse } from '~components/Ellipse';
import { CustomShape } from '~components/CustomShape';
import { CustomShapeSettings } from '~utils';
import { CreateCustomShape } from '~CreateCustomShape';

const shapeList: { [key: string]: JSX.Element } = {
  'Circle': <Circle/>,
  'Triangle': <Triangle/>,
  'Ellipse': <Ellipse/>,
  'Falcon': <CustomShape key='falcon' scale={1/140} path='M -77 0 A 1 1 0 0 0 76 0 C 76 -10 75 -21 69 -32 L 77 -37 L 77 -56 L 73 -71 L 62 -71 L 58 -58 L 58 -50 L 54 -54 L 20 -131 L 12 -131 L 12 -76 L 9 -76 L 9 -92 L -9 -92 L -9 -76 L -12 -76 L -12 -131 L -19 -131 L -54 -55 C -66 -42 -77 -22 -77 -4 Z'/>,
  'Enterprise': <CustomShape key='enterprise' scale={1/100} path='M0-50C10-50 27-43 27-23 27-2 14 1 6 5 7 9 6 13.6667 6 18L16 28 17 11C17 8 21 8 21 11L22 66 17 69 16 40 5 24 4 35C4 37 2 38 0 38Z' horizontalMirror={true}/>,
  'Ship': <CustomShape key='ship' scale={1/30} path='M0-13 2-12 3-9 5-7 8-5 8-3 7-2 6 0 6 2 9 6 4 6 3 8 5 9 5 14 0 12Z' horizontalMirror={true}/>,
}

const ShapeDropdown = () => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [selection, setSelection] = useState<string>("Circle");
  const [customShape, setCustomShape] = useState<CustomShapeSettings | null>(null);

  const options = Object.entries(shapeList).map(([key, value]) => (
    <Combobox.Option value={key} key={key}>
      {key}
    </Combobox.Option>
  ));

  return (
    <>
    <CreateCustomShape callback={setCustomShape}/>
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setSelection(val);
        setCustomShape(null);
        combobox.closeDropdown();
    }}>
      <Combobox.Target>
        <InputBase
          description='Select shape'
          component='button'
          type='button'
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none">
          {selection}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>  
      </Combobox.Dropdown>
    </Combobox>
    {customShape ? <CustomShape {...customShape!}/> : shapeList[selection]}
    </>
  )
}

export { ShapeDropdown }