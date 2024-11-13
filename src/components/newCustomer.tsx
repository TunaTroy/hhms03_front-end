

import React, { useState } from "react";
import { Modal, Input, Button, Radio, Row, Col, DatePicker } from "antd";
import moment from "moment";

const { TextArea } = Input;

interface NewCustomersProps {
  onClose: () => void;
}

const NewCustomers: React.FC<NewCustomersProps> = ({ onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [idCard, setIdCard] = useState("");
  const [dob, setDob] = useState<moment.Moment | null>(null);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    console.log("New customer data:", {
      customerName,
      email,
      phoneNumber,
      gender,
      address,
      idCard,
      dob: dob ? dob.format("DD/MM/YYYY") : null,
      notes,
    });
    onClose();
  };

  const centerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Modal
      title="Thêm mới khách hàng"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Lưu
        </Button>,
      ]}
      width={600}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder="Họ và tên"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Col>
        <Col span={12} style={centerStyle}>
          <Radio.Group
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Col>
        
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
      <Col span={12}>
          <Input
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <DatePicker
            placeholder="Ngày sinh"
            style={{ width: "100%" }}
            onChange={(date) => setDob(dob)}
            format="DD/MM/YYYY"
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="Số căn cước công dân"
            value={idCard}
            onChange={(e) => setIdCard(e.target.value)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <TextArea
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
          />
        </Col>
        <Col span={12}>
          <TextArea
            placeholder="Ghi chú"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default NewCustomers;