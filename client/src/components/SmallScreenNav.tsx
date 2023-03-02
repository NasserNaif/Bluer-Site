import {
  Center,
  Flex,
  useDisclosure,
  IconButton,
  Text,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/react";
import { BiMenu } from "react-icons/bi";
import React, { useRef } from "react";
import LargeScreenNav from "./LargeScreenNav";

function SmallScreenNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  return (
    <Flex h={"8vh"} align="center" boxShadow={"md"} p="3">
      <Text color={"blue.400"} fontWeight="bold" fontSize={"4xl"}>
        Bluer
      </Text>
      <Spacer />
      <IconButton
        aria-label=""
        icon={<BiMenu />}
        onClick={onOpen}
        ref={btnRef}
        size="lg"
      />
      <Drawer
      
        isOpen={isOpen}
        placement={"right"}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={["xs", "sm", "sm", "sm"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <LargeScreenNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default SmallScreenNav;
