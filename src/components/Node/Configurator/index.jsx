import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';

function Configurator({ onChange }) {
  const algoritms = ['C45', 'TSP', 'TSPW'];
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({
    param1: 'a',
    param2: 'b',
    param3: 'c',
    algorithm: algoritms[tabIndex],
  });

  function handleConfirmChange() {
    let newState = state;
    newState = { ...state, algorithm: algoritms[tabIndex] };
    setState(newState);
    onChange(newState);
  }

  return (
    <div>
      <Tabs isFitted variant="line" colorScheme="blackAplha" onChange={index => setTabIndex(index)}>
        <TabList mb="1em">
          <Tab>C 4.5</Tab>
          <Tab>TSP</Tab>
          <Tab>TSP Weight</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={handleConfirmChange}>Confirm</Button>
    </div>
  );
}

export default Configurator;
