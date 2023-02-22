import {
  Button,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogInComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      if (username == "" || password == "") {
        toast({
          duration: 3000,
          position: "top",
          status: "error",
          title: "username Or password shouldn't be empty ",
        });
        return;
      }
      const request = await fetch(`http://localhost:5000/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await request.json();
      if (request.status !== 201) {
        toast({
          duration: 3000,
          position: "top",
          status: "error",
          title: data.message,
        });
        return;
      }
      toast({
        duration: 3000,
        position: "top",
        status: "success",
        title: data.message,
      });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch {
      toast({
        duration: 3000,
        position: "top",
        status: "error",
        title: "Server erroor",
      });
    }
  };
  return (
    <VStack justify={"center"} w="100%" p="1.4em 0">
      <Text fontSize={"4xl"}>Log In</Text>
      <Input
        placeholder="username or email"
        size={"lg"}
        w={["100%", "100%", "40%", "40%"]}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="password"
        size={"lg"}
        w={["100%", "100%", "40%", "40%"]}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        size={"lg"}
        w={["100%", "100%", "40%", "40%"]}
        variant="outline"
        colorScheme={"blue"}
        onClick={handleLogIn}
      >
        Log In
      </Button>
      <Text>if you don't have account yet please click on Register Tap</Text>
    </VStack>
  );
}

export default LogInComp;
