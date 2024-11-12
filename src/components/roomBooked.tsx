import { Modal, Input, Button, Typography, Row, Col } from "antd";
import { FC } from "react";

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

interface RoomBookedProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData: RoomData;
}

const RoomBooked: FC<RoomBookedProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <span
          style={{ fontWeight: "bold", fontSize: "20px", color: "#FFA500" }}
        >
          {`Chi tiết ${roomData.roomName}`}
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
              style={{ fontSize: "14px", color: "#FFA500", marginLeft: "8px", fontWeight: "bold" }}
            >
              Đã đặt trước
            </Text>
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <Text>{roomData.priceOverride.toLocaleString()} VND</Text>
          </div>
          <Button type="default" style={{ marginRight: "8px" }}>
            Sửa đặt phòng
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
          >
            Nhận phòng
          </Button>
        </div>

        <div
          style={{
            border: "1px solid #FFA500",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
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
                <span style={{ color: "#FFA500", fontWeight: "bold" }}>
                  {roomData.checkInNotice}
                </span>
              </div>
            </Col>
          </Row>
        </div>

        <Input.TextArea
          placeholder="Chưa có ghi chú"
          value={roomData.note || ""}
          style={{ width: "100%", padding: "8px" }}
          rows={3}
          disabled
        />
      </div>
    </Modal>
  );
};

export default RoomBooked;
