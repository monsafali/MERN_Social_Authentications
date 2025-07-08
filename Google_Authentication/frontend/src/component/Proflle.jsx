import React, { useEffect, useState } from "react";

function Proflle() {
  const [userData, setuserData] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const apiRespone = await fetch(
          "http://localhost:3000/api/auth/getuser",
          {
            credentials: "include",
          }
        );
        if (!apiRespone.ok) {
          throw new Error("Un-athorized");
        }
        const responsedata = await apiRespone.json();
        setuserData(responsedata);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  if (!userData || !userData.success) return <div>Loading.....</div>;
  return (
    <div>
      <h1>User Data</h1>
      <p>UserName: {userData.user.name}</p>
      <p>userEmail:{userData.user.email}</p>
      <p>userPhone:{userData.user.phoneNumber}</p>
      <img src={userData.user.avatar} alt="image not found" />
    </div>
  );
}

export default Proflle;
