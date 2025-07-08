import React from "react";
import { auth, provider } from "../utils/Firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const googleLogin = async () => {
    try {
      const respone = await signInWithPopup(auth, provider);

      const user = respone.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        phoneNumber: user?.phoneNumber,
      };
      const apiRespone = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!apiRespone.ok) {
        throw new Error("Failed to Login");
      }
      const responeData = await apiRespone.json();
      console.log(responeData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>Google Login Authentication</h2>
      <button onClick={googleLogin}>Sign In with Google</button>
    </>
  );
}

export default Login;
