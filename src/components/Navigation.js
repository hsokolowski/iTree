import React from "react";
import "../css/main.scss";
import { IconButton, Button,Stack } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import FileReader from "./FileReader";

function Navigation() {
  return (
    <div id="navigation-navbar" className="center-horizontal">
      <div style={{ padding: "10px" }}>
        <Stack spacing={4} direction="row" align="center">
          <Button colorScheme="teal" size="md">
            <FileReader/>
          </Button>
          <Button colorScheme="teal" size="md">
            Button
          </Button>
          <Button colorScheme="teal" size="md">
            Button
          </Button>
          <Button colorScheme="teal" size="md">
            Button
          </Button>
        </Stack>
        <IconButton aria-label="Search database" icon={<SearchIcon />} />
        Hello there
        <IconButton aria-label="Search database" icon={<AddIcon />} />
        Hello there
        <IconButton aria-label="Search database" icon={<WarningIcon />} />
        Hello there
        <IconButton aria-label="Search database" icon={<PhoneIcon />} />
        Hello there
      </div>
    </div>
  );
}

export default Navigation;
