import { Modal, Input, Button, Typography, Row, Col } from "antd";
import React, { FC, useState } from "react";

const { Text } = Typography;


interface RoomUsingProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData?: {
    room_name: string; // Đổi tên thành room_name
    type_id: string; // Đổi tên thành type_id
    current_guest: string; // Đổi tên thành current_guest
    check_in_time: string; // Đổi tên thành check_in_time
    check_out_time: string; // Đổi tên thành check_out_time
    num_guests: number; // Đổi tên thành num_guests
    num_children: number; // Đổi tên thành num_children
    num_papers: number; // Đổi tên thành num_papers
    room_id: string; // Đổi tên thành room_id
    stay_duration: string; // Đổi tên thành stay_duration
    check_in_notice: string; // Đổi tên thành check_in_notice
    note: string; // Giữ nguyên
    price_override: number; // Đổi tên thành price_override
  } 
}

const RoomUsing: FC<RoomUsingProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // State for note
  const [note, setNote] = useState<string>(roomData?.note || "");

  // Function to handle note input
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  return (
    <Modal
      title={
        <span
          style={{ fontWeight: "bold", fontSize: "20px", color: "#32CD32" }} // Màu xanh lá cây cho tiêu đề
        >
          {`Chi tiết ${roomData?.room_name}`}
        </span>
      }
      open={isModalOpen}
      footer={null}
      onCancel={handleClose}
      width={700}
    >
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Hạng phòng: {roomData?.type_id}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#32CD32", // Màu xanh lá cây cho trạng thái đang sử dụng
                marginLeft: "8px",
                fontWeight: "bold",
              }}
            >
              Đang sử dụng
            </Text>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #32CD32",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Khách hàng:</Text> {roomData?.current_guest}
            </Col>
            <Col span={12}>
              <Text strong>Khách lưu trú:</Text> {roomData?.num_guests} người lớn,{" "}
              {roomData?.num_children} trẻ em, {roomData?.num_papers} giấy tờ
            </Col>
            <Col span={12}>
              <Text strong>Nhận phòng:</Text> {roomData?.check_in_time}
            </Col>
            <Col span={12}>
              <Text strong>Trả phòng:</Text> {roomData?.check_out_time}
            </Col>
            <Col span={12}>
              <Text strong>Mã đặt phòng:</Text> {roomData?.room_id}
            </Col>
            <Col span={12}>
              <Text strong>Thời gian lưu trú:</Text> {roomData?.stay_duration}
              <div>
                <span style={{ color: "#32CD32", fontWeight: "bold" }}>
                  {roomData?.check_in_notice}
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Input
            placeholder="Nhập ghi chú ..."
            value={note}
            onChange={handleNoteChange}
            style={{
              width: "40%",
              marginTop: "16px",
              padding: "16px",
              textAlign: "left",
            }}
          />
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <Text>Khách cần trả:</Text>
              <Text style={{ marginLeft: "16px", fontWeight: "bold" }}>
                {roomData?.price_override.toLocaleString()} 
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>Khách thanh toán:</Text>
              <Text style={{ marginLeft: "16px", fontWeight: "bold" }}>0</Text>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: "16px",
          }}
        >
          <div style={{ display: "flex", marginTop: "8px" }}>
            <Button type="default" style={{ marginRight: "8px" }}>
              Sửa đặt phòng
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
            >
              Trả phòng
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomUsing;