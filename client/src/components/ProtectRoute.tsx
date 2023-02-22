import { useToast } from "@chakra-ui/react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute() {
  const toast = useToast();
  if (!localStorage.getItem("token")) {
    toast({
      duration: 3000,
      title: "sorry, you have to login",
      status: "error",
      position: "top",
    });
    return <Navigate to="/"></Navigate>;
  }
  return <Outlet />;
}

export default ProtectRoute;
