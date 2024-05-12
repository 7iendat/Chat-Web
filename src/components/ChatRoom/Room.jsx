import { Avatar, Typography } from "antd";

import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";

const WrapperRoom = styled.div`
  width: 90%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 8px;
  margin-top: 7px;
  &:hover {
    background: #414141;
    cursor: pointer;
  }
`;

const Room = ({ name, avatar, currentMessage, roomId }) => {
  const { setIsSelectedRoom, isSelectedRoom } = useContext(AppContext);

  return (
    <WrapperRoom
      onClick={() => setIsSelectedRoom(roomId)}
      style={roomId === isSelectedRoom ? { background: "#414141" } : null}
    >
      <Avatar size="large" style={{ marginRight: "10px" }} src={avatar}>
        {avatar ? "" : name?.charAt(0)?.toUpperCase()}
      </Avatar>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography.Text style={{ fontSize: "16px", color: "#dfe1e6" }}>
          {name}
        </Typography.Text>
        <Typography.Text style={{ fontSize: "14px", color: "#b0b3b8" }}>
          {currentMessage}
        </Typography.Text>
      </div>
    </WrapperRoom>
  );
};

export default Room;
