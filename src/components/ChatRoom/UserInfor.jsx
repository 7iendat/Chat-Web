import { Avatar, Button, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";

const WrapperUserInfor = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3e4042;
  padding: 10px;
  .username {
    color: white;
    font-size: 18px;
    margin-left: 8px;
  }
`;

const UserInfor = () => {
  //   useEffect(() => {
  //     db.collection("users").onSnapshot((snapshot) => {
  //       const data = snapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));

  //       console.log(data);
  //     });
  // }, []);

  const { setIsSelectedRoom } = useContext(AppContext);
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setIsSelectedRoom("");
        console.log("sign out ok");
      })
      .catch((e) => console.log(e));
  };
  const { user } = useContext(AuthContext);
  console.log(user.photoURL);
  return (
    <WrapperUserInfor>
      <div>
        <Avatar src={user.photoURL} size="large">
          {user.photoURL ? "" : user.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="username">
          {user.displayName}
        </Typography.Text>
      </div>
      <Button ghost onClick={() => handleLogout()}>
        Logout
      </Button>
    </WrapperUserInfor>
  );
};

export default UserInfor;
