import { Form, Input, Modal } from "antd";

import React, { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { useForm } from "antd/es/form/Form";
import { auth } from "../../firebase/config";
import { addDocument } from "../../services";
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomChatModal = () => {
  const { isAddRoomOpen, setIsAddRoomOpen } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [form] = useForm();
  const handleCloseModal = () => {
    setIsAddRoomOpen(false);
    form.resetFields();
  };

  const handleAddRoom = () => {
    const data = form.getFieldValue();
    let result = addDocument("rooms", { ...data, members: [user.uid] });
    if (result) {
      handleCloseModal();
    }
  };
  return (
    <Modal
      title="Add room"
      open={isAddRoomOpen}
      onOk={handleAddRoom}
      onCancel={handleCloseModal}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Room name" name="name">
          <Input placeholder="Enter a room name..." />
        </Form.Item>

        <Form.Item label="Room Description" name="description">
          <Input placeholder="Enter a room description..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRoomChatModal;
