import { Avatar, Form, Modal, Select, Spin } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { debounce } from "lodash";
import { db } from "../../firebase/config";
import { useForm } from "antd/es/form/Form";

const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOption = (value) => {
      setFetching(true);
      setOptions([]);

      fetchOptions(value, props.currentMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOption, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props.currentMembers]);

  return (
    <Select
      filterOption={false}
      labelInValue
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => {
        return (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <Avatar src={opt.photoURL} size="small">
              {opt?.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
            </Avatar>
            {`${opt.label}`}
          </Select.Option>
        );
      })}
    </Select>
  );
};
const fetchUserList = async (search, currentMembers) => {
  return db
    .collection("users")
    .where("keywords", "array-contains", search.toLowerCase())
    .orderBy("displayName")
    .limit(10)
    .get()
    .then((snapshots) => {
      return snapshots.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((member) => !currentMembers.includes(member.value));
    });
};

const InviteMemberModal = () => {
  const {
    isOpenInviteMember,
    setIsOpenInviteMember,
    isSelectedRoom,
    selectedRoom,
  } = useContext(AppContext);
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const handleInviteMember = () => {
    const roomRef = db.collection("rooms").doc(isSelectedRoom);
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    handleCloseModal();
  };
  const handleCloseModal = () => {
    form.resetFields();
    setIsOpenInviteMember(false);
  };

  console.log({ value });
  return (
    <Modal
      title="Add member"
      open={isOpenInviteMember}
      onOk={handleInviteMember}
      onCancel={handleCloseModal}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          label="Name of members"
          value={value}
          placeholder="Enter name of member"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          currentMembers={selectedRoom?.members}
        />
      </Form>
    </Modal>
  );
};

export default InviteMemberModal;
