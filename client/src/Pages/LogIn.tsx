import {
  TabList,
  Tabs,
  VStack,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React from "react";
import LogInComp from "../components/LogInComp";
import RegisterComp from "../components/RegisterComp";

function LogIn() {
  return (
    <VStack  h={"100%"} >
      <Tabs isFitted variant="enclosed" w="100%">
        <TabList mb="3em">
          <Tab>Log In</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LogInComp />
          </TabPanel>
          <TabPanel>
            <RegisterComp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

export default LogIn;
