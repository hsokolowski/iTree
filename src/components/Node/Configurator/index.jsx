import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TabC45 from './TabC45';
import TabTSP from './TabTSP';
import TabTSPW from './TabTSPW';

const algorithms = ['C45', 'TSP', 'TSPW'];
function Configurator({ onChange, attribute, pivot, weight }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({
    attribute,
    pivot,
    weight,
    algorithm: [algorithms[tabIndex]],
  });

  useEffect(() => {
    setState({ ...state, algorithm: [algorithms[tabIndex]] });
  }, [tabIndex]); // eslint-disable-line

  useEffect(() => {
    onChange({ ...state });

    console.log('Zmienił się stan ###########');
  }, [state]);

  function handleConfirmChange() {
    onChange({ ...state });
  }
  const handleValuesChange = values => {
    setState({ ...state, ...values });
  };

  return (
    <div>
      <Tabs isFitted variant="line" colorScheme="blackAlpha" value={tabIndex} onChange={setTabIndex}>
        <TabList mb="1em">
          <Tab>C 4.5</Tab>
          <Tab>TSP</Tab>
          <Tab>TSP Weight</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TabC45 attribute={state.attribute} value={state.pivot} changeValues={handleValuesChange} />
          </TabPanel>
          <TabPanel>
            <TabTSP attribute={state.attribute} value={state.pivot} changeValues={handleValuesChange} />
          </TabPanel>
          <TabPanel>
            <TabTSPW
              attribute={state.attribute}
              value={state.pivot}
              weight={state.weight ? state.weight : 1}
              changeValues={handleValuesChange}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Button colorScheme="blue" onClick={handleConfirmChange}>
        Confirm
      </Button> */}
    </div>
  );
}

export default Configurator;
