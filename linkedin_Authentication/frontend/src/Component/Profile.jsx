import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getdata = async () => {
      try {
        const respone = await fetch(
          "http://localhost:5000/api/linkedin/getUser",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await respone.json();

        if (respone.ok) {
          setUser(data.user);
        } else {
          setError(data.message || "Failed to fetch user");
        }
      } catch (err) {
        setError("Network error");
      }
    };
    getdata();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>
        Avatar: <img src={user.avatar} alt="User Avatar" />
      </p>
    </div>
  );
}

export default Profile;
