import {
  VStack,
  Text,
  Input,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

function RegisterComp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    profileAvatar: "",
  });
  const [confirmPassword, setConfirm] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (user.password !== confirmPassword) {
        toast({
          title: "password & confirm passwrod are different",
          duration: 3000,
          status: "error",
          position: "top",
        });
        return;
      }

      const av: any = await createAvatar(avataaars, {
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
        seed: user.username,
      }).toDataUri();

      setUser({ ...user, profileAvatar: av !== null ? av : "" });

      const request = await fetch(
        "http://localhost:5000/api/v1/login/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await request.json();

      if (request.status !== 201) {
        toast({
          title: data.message,
          duration: 3000,
          status: "error",
          position: "top",
        });
        return;
      }

      toast({
        title: data.message,
        duration: 3000,
        status: "success",
        position: "top",
      });
      navigate("/login");
    } catch {
      toast({
        title: "sorry, server Error!!!!",
        duration: 3000,
        status: "error",
        position: "top",
      });
    }
  };
  return (
    <Center>
      <VStack justify={"center"} w="70%" p="1.4em 0">
        <Text fontSize={"4xl"}>Register</Text>
        <Input
          type={"text"}
          placeholder="username"
          size={"lg"}
          w={["100%", "100%", "40%", "40%"]}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <Input
          type={"email"}
          placeholder="email"
          size={"lg"}
          w={["100%", "100%", "40%", "40%"]}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          type={"password"}
          placeholder="password"
          size={"lg"}
          w={["100%", "100%", "40%", "40%"]}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Input
          type={"password"}
          placeholder="confirm password"
          size={"lg"}
          w={["100%", "100%", "40%", "40%"]}
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <Button
          size={"lg"}
          w={["100%", "100%", "40%", "40%"]}
          variant="outline"
          colorScheme={"blue"}
          onClick={handleRegister}
        >
          Register
        </Button>
      </VStack>
    </Center>
  );
}

export default RegisterComp;
