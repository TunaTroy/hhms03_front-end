import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Divider,
  Button,
  Select,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

interface UpdateTypeRoomProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const UpdateTypeRoom: React.FC<UpdateTypeRoomProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Cập nhật hạng phòng"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          hourlyPrice: 0,
          dailyPrice: 0,
          overnightPrice: 0,
          earlyCheckInPrice: 0,
          lateCheckOutPrice: 0,
          standardAdults: 2,
          standardChildren: 1,
          maxAdults: 2,
          maxChildren: 1,
        }}
      >
        {/* Tab Thông tin */}
        <Divider orientation="left">Thông tin</Divider>
        <Row gutter={16}>
          <Col span={12}>
            {" "}
            {/* Cột 1: Tên hạng phòng */}
            <Form.Item
              label="Sửa tên hạng phòng"
              name="name"
              rules={[
                { required: true, message: "Tên hạng phòng là bắt buộc" },
              ]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="Hạng phòng"
                style={{
                  border: "none",
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: 0,
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "4px",
                  flex: 1,
                }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            {" "}
            {/* Cột 2: Giá giờ */}
            <Form.Item
              label="Sửa giá giờ"
              name="hourlyPrice"
              rules={[{ required: true, message: "Giá giờ là bắt buộc" }]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <InputNumber
                placeholder="Nhập giá giờ"
                style={{
                  border: "none",
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: 0,
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "8px",
                  flex: 1,
                }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            {" "}
            {/* Cột 3: Giá cả ngày */}
            <Form.Item
              label="Sửa giá ngày"
              name="dailyPrice"
              rules={[{ required: true, message: "Giá cả ngày là bắt buộc" }]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <InputNumber
                placeholder="Nhập giá ngày"
                style={{
                  border: "none",
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: 0,
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "8px",
                  flex: 1,
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Tối đa người lớn"
              name="maxAdults" // Đổi tên biến cho đúng
              rules={[
                { required: true, message: "Tối đa người lớn là bắt buộc" },
              ]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <InputNumber
                placeholder="Nhập số người lớn"
                style={{
                  border: "none",
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: 2,
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "8px",
                  flex: 1,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Tối đa trẻ em"
              name="maxChildren" // Đổi tên biến cho đúng
              rules={[{ required: true, message: "Tối đa trẻ em là bắt buộc" }]}
              style={{ display: "flex", alignItems: "center" }}
            >
              <InputNumber
                placeholder="Nhập số trẻ em"
                style={{
                  border: "none",
                  borderBottom: "1px solid #d9d9d9",
                  borderRadius: 2,
                  outline: "none",
                  boxShadow: "none",
                  marginLeft: "8px",
                  flex: 1,
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Thời gian nhận - trả quy định" name="timePolicy">
              <div
                style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}
              >
                <p style={{ margin: 0 }}>• Cả ngày tính từ 14:00 đến 12:00</p>
                <p style={{ margin: 0 }}>• Giá giờ tính 2 giờ đầu</p>
              </div>
            </Form.Item>
          </Col>
        </Row>
        {/* Phụ thu quá giờ */}
        <Divider orientation="left">Phụ thu quá giờ</Divider>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Hình thức" name="surchargeType">
              <Select placeholder="Chọn hình thức">
                <Option value="perHour">Tính tiền mỗi giờ</Option>
                <Option value="fixed">Tính tiền cố định</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={6}>
            <Form.Item label="Nhận sớm" name="earlyCheckInPrice">
              <InputNumber
                placeholder="Giá nhận sớm"
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Trả muộn" name="lateCheckOutPrice">
              <InputNumber
                placeholder="Giá trả muộn"
                style={{ width: "100%" }}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Checkbox>Áp dụng cho tất cả hạng phòng</Checkbox>
          </Col>
        </Row>

        {/* Buttons */}
        <Divider />
        <Row justify="end" gutter={16}>
          <Col>
            <Button onClick={onClose}>Bỏ qua</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleSave}>
              Lưu
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateTypeRoom;
