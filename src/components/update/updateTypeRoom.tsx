import React, { useEffect } from "react";
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

const { Option } = Select;

interface UpdateTypeRoomProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  roomTypeData?: {
    typeId: string;
    name: string;
    hourlyPrice: number;
    dailyPrice: number;
    maxAdults: string;
    maxChildren: string;
    description: string;
  }; // Dữ liệu của hạng phòng được truyền vào từ component cha
}

const UpdateTypeRoom: React.FC<UpdateTypeRoomProps> = ({
  visible,
  onClose,
  onSave,
  roomTypeData,
}) => {
  const [form] = Form.useForm();

  // Khi `roomTypeData` thay đổi hoặc modal được mở, đặt giá trị ban đầu cho form
  useEffect(() => {
    if (roomTypeData) {
      form.setFieldsValue({
        name: roomTypeData.name,
        hourlyPrice: roomTypeData.hourlyPrice,
        dailyPrice: roomTypeData.dailyPrice,
        maxAdults: parseInt(roomTypeData.maxAdults.split(" ")[0]), // Lấy số từ chuỗi "2 người lớn"
        maxChildren: parseInt(roomTypeData.maxChildren.split(" ")[0]), // Lấy số từ chuỗi "1 trẻ em"
        description: roomTypeData.description,
      });
    } else {
      form.resetFields();
    }
  }, [roomTypeData, visible]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Gọi hàm `onSave` với dữ liệu từ form
      onSave({
        ...roomTypeData, // Bao gồm dữ liệu cũ (ví dụ: `typeId`)
        ...values, // Giá trị mới từ form
      });
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
          name: roomTypeData?.name || '', // Tên hạng phòng
          hourlyPrice: roomTypeData?.hourlyPrice, // Giá giờ
          dailyPrice: roomTypeData?.dailyPrice, // Giá ngày
          maxAdults: roomTypeData ? parseInt(roomTypeData.maxAdults.split(" ")[0]) : 2, // Số người lớn tối đa
          maxChildren: roomTypeData ? parseInt(roomTypeData.maxChildren.split(" ")[0]) : 1, // Số trẻ em tối đa
          description: roomTypeData?.description || '', // Mô tả
        }}
      >
        {/* Tab Thông tin */}
        <Divider orientation="left">Thông tin</Divider>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Sửa tên hạng phòng"
              name="name"
              rules={[{ required: true, message: "Tên hạng phòng là bắt buộc" }]}
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
              name="maxAdults"
              rules={[{ required: true, message: "Tối đa người lớn là bắt buộc" }]}
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
              name="maxChildren"
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
              <div style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}>
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
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateTypeRoom;