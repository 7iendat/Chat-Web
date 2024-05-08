import React, { createContext, useContext, useMemo, useState } from "react";
import { useFireStore } from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isOpenInviteMember, setIsOpenInviteMember] = useState(false);
  const [isSelectedRoom, setIsSelectedRoom] = useState();

  const { user } = useContext(AuthContext);
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      valueCompare: user.uid,
    };
  }, [user.uid]);

  const rooms = useFireStore("rooms", roomsCondition);

  const selectedRoom = useMemo(() => {
    return rooms.find((r) => r.id === isSelectedRoom);
  }, [rooms, isSelectedRoom]);

  const membersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      valueCompare: selectedRoom?.members,
    };
  }, [selectedRoom?.members]);

  const members = useFireStore("users", membersCondition);

  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomOpen,
        setIsAddRoomOpen,
        isSelectedRoom,
        setIsSelectedRoom,
        selectedRoom,
        members,
        isOpenInviteMember,
        setIsOpenInviteMember,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
