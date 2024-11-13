import { Modal, Input, Button, Typography, Row, Col } from "antd";
import React, { FC, useState } from "react";

const { Text } = Typography;

interface RoomData {
  roomName: string;
  roomType: string;
  guest: string;
  checkInTime: string;
  checkOutTime: string;
  numGuests: number;
  numChildren: number;
  numPapers: number;
  bookingCode: string;
  stayDuration: string;
  checkInNotice: string;
  note: string;
  priceOverride: number;
}

interface RoomFinalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData: RoomData;
}

const RoomFinal: FC<RoomFinalProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [note, setNote] = useState<string>(roomData?.note || "");

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  // Calculate remaining time in hours
  const checkInDate = new Date(roomData.checkInTime);
  const checkOutDate = new Date(roomData.checkOutTime);
  const remainingTime = (checkOutDate.getTime() - Date.now()) / (1000 * 60 * 60); // hours

  return (
    <Modal
      title={
        <span
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: remainingTime < 5 ? "#4CAF50" : "#06BE92", // Màu khác nếu dưới 5 giờ
          }}
        >
          {remainingTime < 5 ? "Time's up!" : `Chi tiết ${roomData.roomName}`}
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
              Hạng phòng: {roomData.roomType}
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#06BE92", // Màu đỏ cho trạng thái Time's up
                marginLeft: "8px",
                fontWeight: "bold",
              }}
            >
              {remainingTime < 5 ? "Hết thời gian" : "Đang sử dụng"}
            </Text>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #06BE92",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#F9F9F9",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Khách hàng:</Text> {roomData.guest}
            </Col>
            <Col span={12}>
              <Text strong>Khách lưu trú:</Text> {roomData.numGuests} người lớn,{" "}
              {roomData.numChildren} trẻ em, {roomData.numPapers} giấy tờ
            </Col>
            <Col span={12}>
              <Text strong>Nhận phòng:</Text> {roomData.checkInTime}
            </Col>
            <Col span={12}>
              <Text strong>Trả phòng:</Text> {roomData.checkOutTime}
            </Col>
            <Col span={12}>
              <Text strong>Mã đặt phòng:</Text> {roomData.bookingCode}
            </Col>
            <Col span={12}>
              <Text strong>Thời gian lưu trú:</Text> {roomData.stayDuration}
              <div>
                <span style={{ color: "#06BE92", fontWeight: "bold" }}>
                  {roomData.checkInNotice}
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
                {roomData.priceOverride.toLocaleString()} 
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
              style={{ backgroundColor: "#06B392", borderColor: "#06BE92" }} // Màu đỏ cho nút
            >
              Trả phòng
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomFinal;