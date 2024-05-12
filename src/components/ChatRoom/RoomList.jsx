import { Button, Collapse, Typography } from "antd";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { AuthContext } from "../../Context/AuthProvider";
import { useFireStore } from "../../hooks/useFireStore";
import { AppContext } from "../../Context/AppProvider";
import Room from "./Room";

const WrapperPanel = styled(Collapse.Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: black;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
      color: black;
    }
  }
`;

const WrapperLink = styled(Typography.Link)`
  display: block;
  color: black;
  margin-bottom: 5px;
`;

const WrapperRoom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const RoomList = () => {
  const { rooms, setIsAddRoomOpen, setIsSelectedRoom } = useContext(AppContext);

  const handleOpenModalAddRoom = () => {
    setIsAddRoomOpen(true);
  };

  return (
    <WrapperRoom>
      {/* <Collapse ghost defaultActiveKey={1}>
        <WrapperPanel header="Room List" key="1">
          {rooms?.map((room, index) => {
            return (
              <WrapperLink
                key={index}
                onClick={() => setIsSelectedRoom(room.id)}
              >
                {room.name}
              </WrapperLink>
            );
          })}

          <Button
            ghost
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleOpenModalAddRoom}
          >
            Add Room
          </Button>
        </WrapperPanel>
      </Collapse> */}
      {rooms?.map((room, index) => {
        return (
          <Room
            name={room.name}
            key={index}
            // onClick={() => setIsSelectedRoom(room.id)}
            roomId={room.id}
          />
        );
      })}

      <Button
        ghost
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={handleOpenModalAddRoom}
        style={{ marginTop: "10px" }}
      >
        Add Room
      </Button>
    </WrapperRoom>
  );
};

export default RoomList;
