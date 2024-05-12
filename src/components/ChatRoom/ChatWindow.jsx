import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../services";
import { AuthContext } from "../../Context/AuthProvider";
import { useFireStore } from "../../hooks/useFireStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const WrapperChatWindow = styled.div`
  background: #222222;

  width: 100%;
  height: 95%;
  margin: 0 15px 0 0;
  border-radius: 20px;
`;

const WrapperHeader = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid #08a2b2;
  box-shadow: 0px 1px 2px 0px #eaedee;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  .room-name {
    margin: 0;
    font-weight: bold;
    font-size: 20px;
    color: #e4e6eb;
  }

  .right-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const WrapperContent = styled.div`
  padding: 10px 30px;
  height: calc(100vh - 170px);
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
    background-color: #222222;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(226, 39, 181);
    background: linear-gradient(
      180deg,
      rgba(226, 39, 181, 0.949544783733806) 0%,
      rgba(199, 42, 254, 1) 100%
    );
    border-radius: 100px;
  }
`;

const WrapperSendMessage = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 30px 4px 30px;

  .input-message {
    width: 100%;
    flex: 1;
    margin: 0 20px;
  }
`;

const StyledInput = styled(Input)`
  &::placeholder {
    color: #e4e6eb;
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

    if (data.content !== "") {
      addDocument("messages", data);
      form.resetFields(["message"]);
      setMessage("");
      return;
    }
    form.resetFields(["message"]);
    setMessage("");

    return;

    // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
              <span style={{ color: "#9fa2a6" }}>
                {selectedRoom?.description}
              </span>
            </div>
            <div className="right-header">
              <div
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a href="/">
                  <img
                    style={{ marginRight: "10px" }}
                    width={28}
                    height={28}
                    src="/phone-call.png"
                    alt="phone"
                  />
                </a>
                <a href="/">
                  <img width={32} height={32} src="/zoom.png" alt="zoom" />
                </a>
              </div>
              <Button
                type="text"
                icon={<UserAddOutlined />}
                onClick={() => setIsOpenInviteMember(true)}
                style={{ color: " #e4e6eb" }}
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

              <a href="/">
                <img
                  width={22}
                  height={22}
                  src="/more.png"
                  alt="more"
                  style={{ marginLeft: "20px" }}
                />
              </a>
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
            <a>
              <img
                width={26}
                height={26}
                src="/gallery.png"
                alt="more"
                style={{ marginLeft: "20px" }}
              />
            </a>
            <Form.Item className="input-message" name="message">
              <StyledInput
                name="message"
                placeholder="Enter a message..."
                autoComplete="off"
                onChange={handleInputChange}
                onPressEnter={handleSubmit}
                style={{ backgroundColor: "#3a3b3c", color: "#e4e6eb" }}
              />
            </Form.Item>
            <Button
              onClick={handleSubmit}
              type="primary"
              icon={<SendOutlined />}
              style={{ background: "rgba(154,11,255,1)" }}
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
