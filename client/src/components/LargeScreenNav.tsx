import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Show,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { BiLogOut, BiLogIn, BiHomeAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MyProfileComp from "./MyProfileComp";


function LargeScreenNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const navigate = useNavigate();
  return (
    <Flex
      h={["20vh", "20vh", "100%", "100%"]}
      direction={"column"}
      as={"nav"}
      w={["100%", "100%", "20vw", "20vw"]}
      align="center"
      p={3}
      // visibility={["hidden", "hidden", "visible", "visible"]}
    >
      <Flex w="100%" align={"center"}>
        <Text color={"blue.400"} fontWeight="bold" fontSize={"4xl"}>
          Bluer
        </Text>
        <Spacer />
        <IconButton
          aria-label=""
          icon={isDark ? <FaSun /> : <FaMoon />}
          onClick={toggleColorMode}
        />
      </Flex>

      <Divider mb={10} />
      {localStorage.getItem("token") ? <MyProfileComp /> : ""}
      <VStack w={"100%"} rowGap="4">
        <Button
          leftIcon={<BiHomeAlt />}
          variant="ghost"
          colorScheme="blue"
          w={"100%"}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        {!localStorage.getItem("token") ? (
          <Button
            leftIcon={<BiLogIn />}
            variant="ghost"
            colorScheme="blue"
            w={"100%"}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        ) : (
          <Button
            leftIcon={<BiLogOut />}
            variant="ghost"
            colorScheme="red"
            w={"100%"}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Log Out
          </Button>
        )}
      </VStack>
    </Flex>
  );
}

export default LargeScreenNav;
