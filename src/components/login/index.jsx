import React from "react";
import { Row, Col, Button, Avatar, Image } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../services/index";

const Login = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const GGProvider = new firebase.auth.GoogleAuthProvider();

  const handleSignInWithFacebook = () => {
    auth.signInWithPopup(fbProvider);
  };

  const handleSignInWithGoogle = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(GGProvider);
    const data = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      providerId: user.providerData[0].providerId,
      keywords: generateKeywords(user.displayName.toLowerCase()),
    };
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", data);
    }
    console.log({ additionalUserInfo, user });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#171717",
      }}
    >
      <Row justify={"center"} align="middle" style={{ height: "70%" }}>
        <div
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "10px",
            backgroundImage: `url(/chatapplogo.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",

            marginRight: "10px",
          }}
        ></div>

        <Col span={8}>
          <Title style={{ textAlign: "center", color: "white" }} level={3}>
            Chat App
          </Title>
          <Button
            style={{ width: "100%", marginTop: "10px" }}
            type="primary"
            onClick={() => handleSignInWithGoogle()}
          >
            Login With Google
          </Button>
          <Button
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => handleSignInWithFacebook()}
          >
            Login With Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
