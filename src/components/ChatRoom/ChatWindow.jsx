import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../services";
import { AuthContext } from "../../Context/AuthProvider";
import { useFireStore } from "../../hooks/useFireStore";
import { values } from "lodash";

const WrapperChatWindow = styled.div`
  width: 100%;
  height: 100vh;
`;

const WrapperHeader = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid #08a2b2;
  box-shadow: 0px 5px 10px 0px #eaedee;
  .room-name {
    margin: 0;
    font-weight: bold;
    font-size: 20px;
  }

  .right-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const WrapperContent = styled.div`
  padding: 10px 30px;
  height: calc(100vh - 156px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const WrapperMessageList = styled.div`
  max-height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4dd0f2;
    border-radius: 100px;
  }
`;

const WrapperSendMessage = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  border: 1px solid #d9d9d9;

  .input-message {
    width: 100%;
    flex: 1;
    margin: 0 20px;
  }
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsOpenInviteMember } =
    useContext(AppContext);
  const bottomRef = useRef(null);
  const [form] = Form.useForm();
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const condition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      valueCompare: selectedRoom?.id,
    };
  }, [selectedRoom?.id]);
  const messages = useFireStore("messages", condition);
  const handleSubmit = () => {
    const data = {
      roomId: selectedRoom?.id,
      userId: user?.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: message,
    };
    addDocument("messages", data);

    form.resetFields(["message"]);
    // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("s", 1);
  }, [messages]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <WrapperChatWindow>
      {selectedRoom ? (
        <>
          <WrapperHeader>
            <div>
              <p className="room-name">{selectedRoom?.name}</p>
              <span>{selectedRoom?.description}</span>
            </div>
            <div className="right-header">
              <Button
                type="text"
                icon={<UserAddOutlined />}
                onClick={() => setIsOpenInviteMember(true)}
              >
                Invite
              </Button>
              <Avatar.Group maxCount={2} size={"default"}>
                {members?.map((member, index) => {
                  return (
                    <Tooltip title={member?.displayName} key={index}>
                      <Avatar src={member?.photoURL}>
                        {member?.photoURL
                          ? ""
                          : member?.displayName.charAt(0)?.toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            </div>
          </WrapperHeader>

          <WrapperContent>
            <WrapperMessageList>
              {messages?.map((mess, index) => {
                return (
                  <Message
                    key={index}
                    displayName={mess?.displayName}
                    photoURL={mess?.photoURL}
                    text={mess?.content}
                    createdAt={mess?.createdAt}
                    isAuthor={mess.userId === user.uid ? true : false}
                  />
                );
              })}
              <div ref={bottomRef} />
            </WrapperMessageList>
          </WrapperContent>

          <WrapperSendMessage form={form}>
            <Form.Item className="input-message" name="message">
              <Input
                name="message"
                placeholder="Enter a message..."
                autoComplete="off"
                onChange={handleInputChange}
                onPressEnter={handleSubmit}
              />
            </Form.Item>
            <Button
              onClick={handleSubmit}
              type="primary"
              icon={<SendOutlined />}
            >
              Send
            </Button>
          </WrapperSendMessage>
        </>
      ) : (
        <Alert message="Please choose a room chat!" type="info" />
      )}
    </WrapperChatWindow>
  );
};

export default ChatWindow;
