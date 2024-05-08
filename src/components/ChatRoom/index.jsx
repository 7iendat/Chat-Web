import React from "react";
import { Col, Row } from "antd";
import SideBar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatRoom = () => {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#181818" }}>
      <Row>
        <Col
          span={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SideBar />
        </Col>
        <Col span={18}>
          {" "}
          <ChatWindow />{" "}
        </Col>
      </Row>
    </div>
  );
};

export default ChatRoom;
