import { VStack, Avatar, Text, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function MyProfileComp() {
  const [user, setUser]: any = useState([]);

  const getData = async () => {
    try {
      const request = await fetch("http://localhost:5000/api/v1/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await request.json();
      setUser(data);
    } catch {
      alert("error in server");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  window.console.log(user);

  return (
    <VStack w="100%" p="1.2rem" mb="5">
      <Avatar src={user.profileAvatar} size="2xl" />
      <Text fontSize={"3xl"}>{user.username}</Text>
      <Text>{user.profileBio}</Text>

      <Divider mb={10} />
    </VStack>
  );
}

export default MyProfileComp;
