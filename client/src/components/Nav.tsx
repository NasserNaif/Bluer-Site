import { Box, Show } from "@chakra-ui/react";

import SmallScreenNav from "./SmallScreenNav";
import LargeScreenNav from "./LargeScreenNav";

function Nav() {
  return (
    <Box>
      <Show above="md">
        <LargeScreenNav />
      </Show>

      <Show below="md">
        <SmallScreenNav />
      </Show>
    </Box>
  );
}

export default Nav;
