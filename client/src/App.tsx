import { Route, Routes } from "react-router-dom";
import { Box, Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import MyProfilePage from "./Pages/MyProfilePage";
import UserProfile from "./Pages/UserProfile";
import ProtectRoute from "./components/ProtectRoute";
import LogIn from "./Pages/LogIn";

function App() {
  return (
    <Flex
      h="100vh"
      columnGap={3}
      w={"100%"}
      direction={["column", "column", "row", "row"]}
    >
        <Nav />
      <Box w={["100%", "100%", "80vw", "80vw"]} h="100%" display={"table"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/details/:postID" element={<Details />} />
          <Route path="/userprofile/:userid" element={<UserProfile />} />
          <Route element={<ProtectRoute />}>
            <Route path="/myprofile" element={<MyProfilePage />} />
          </Route>
        </Routes>
        <Footer />
      </Box>
    </Flex>
  );
}

export default App;
