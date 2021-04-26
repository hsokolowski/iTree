import React from 'react';
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';

function DrawerRoll({ ignoredAttributes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

  return (
    <>
      <Button onClick={onOpen}>Open Drawer</Button>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Your all ignored attributes:</DrawerHeader>
          <DrawerBody>
            <OrderedList>
              {ignoredAttributes.sort(collator.compare).map(item => (
                <ListItem>
                  <p>{item}</p>
                </ListItem>
              ))}
            </OrderedList>
            {/* <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerRoll;
export const DrawerMemo = React.memo(DrawerRoll);
