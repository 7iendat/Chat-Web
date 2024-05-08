import { Col, Row } from "antd";
import React from "react";
import UserInfor from "./UserInfor";
import styled from "styled-components";
import RoomList from "./RoomList";

const WrapperSidebar = styled.div`
  background: #222222;

  width: 90%;
  height: 95%;
  border-radius: 20px;
`;

const SideBar = () => {
  return (
    <WrapperSidebar>
      <Row>
        <Col span={24}>
          <UserInfor />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </WrapperSidebar>
  );
};

export default SideBar;
