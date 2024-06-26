import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns";
import React from "react";
import styled from "styled-components";

const WrapperMessage = styled.div`
  display: flex;

  align-items: flex-start;
  padding: 10px 10px;

  .detail-mess {
    width: 300px;

    padding: 5px 10px;
  }
  .author {
    color: #222626;
    font-size: 17px;
    font-weight: bold;
  }
  .date {
    color: #949c9d;
    margin-left: 10px;
  }

  .content {
    color: #474e4d;
  }
`;

const dateFormated = (seconds) => {
  let dateFormated = "";
  if (seconds) {
    dateFormated = formatRelative(seconds * 1000, Date.now());

    return dateFormated.charAt(0).toUpperCase() + dateFormated.slice(1);
  }
};

const Message = ({ displayName, photoURL, createdAt, text, isAuthor }) => {
  return (
    <WrapperMessage
      style={
        isAuthor
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" }
      }
    >
      {isAuthor ? (
        <></>
      ) : (
        <Avatar
          size={"large"}
          style={{
            backgroundColor: "#BCE9FF",
            color: "#027F83",
            marginRight: "10px",
          }}
          src={photoURL}
        >
          {photoURL ? "" : displayName?.charAt(0).toUpperCase()}
        </Avatar>
      )}

      <div
        className="detail-mess"
        style={
          isAuthor
            ? {
                background: "rgba(154,11,255,1)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "0",
              }
            : {
                background: "#4c4c4c",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }
        }
      >
        <div>
          <Typography.Text className="author">{displayName}</Typography.Text>
          <Typography.Text
            style={{ color: "rgba(228,230, 235,1)", marginLeft: "10px" }}
          >
            {dateFormated(createdAt?.seconds)}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text
            style={{ color: "rgba(228,230, 235,1)", marginLeft: "3px" }}
          >
            {text}
          </Typography.Text>
        </div>
      </div>
    </WrapperMessage>
  );
};

export default Message;
