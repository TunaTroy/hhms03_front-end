"use client";

import { Modal, Input, Button, Typography, Row, Col } from "antd";
import React, { FC, useState } from "react";

const { Text } = Typography;

interface RoomFinalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData?: {
    room_name: string;
    type_id: string;
    current_guest: string;
    check_in_time: string;
    check_out_time: string;
    num_guests: number;
    num_papers: number;
    room_id: string;
    stay_duration: string;
    check_in_notice: string;
    note: string;
    price_override: number,
    status: string;
  };
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

  // Tính thời gian còn lại
  const checkInDate = new Date(roomData?.check_in_time || "");
  const checkOutDate = new Date(roomData?.check_out_time || "");
  const remainingTime =
    (checkOutDate.getTime() - Date.now()) / (1000 * 60 * 60);

  const handleEditBooking = () => {
    if (!roomData) {
      console.error("No room data available to edit.");
      return;
    }

    // Lưu dữ liệu phòng vào localStorage trước khi điều hướng
    localStorage.setItem(
      "bookingRoomData",
      JSON.stringify({
        room_id: roomData.room_id,
        room_name: roomData.room_name,
        type_id: roomData.type_id,
        current_guest: roomData.current_guest,
        check_in_time: roomData.check_in_time,
        check_out_time: roomData.check_out_time,
        num_guests: roomData.num_guests,
        num_papers: roomData.num_papers,
        stay_duration: roomData.stay_duration,
        price_override: roomData.price_override,
        note: roomData.note,
        check_in_notice: roomData.check_in_notice,
        status: roomData.status,
      })
    );

    // Điều hướng đến trang setBookingRoom
    window.location.href = "/setBookingRoom";
  };

  return (
    <Modal
      title={
        <span
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: remainingTime < 5 ? "#4CAF50" : "#06BE92",
          }}
        >
          {remainingTime < 5 ? "Time's up!" : `Chi tiết ${roomData?.room_name}`}
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
                color: "#06BE92",
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
              <Text strong>Khách hàng:</Text> {roomData?.current_guest}{" "}
            </Col>
            <Col span={12}>
              <Text strong>Khách lưu trú:</Text> {roomData?.num_guests} người
              lớn, {roomData?.num_papers} giấy tờ
            </Col>
            <Col span={12}>
              <Text strong>Nhận phòng:</Text> {roomData?.check_in_time}{" "}
            </Col>
            <Col span={12}>
              <Text strong>Trả phòng:</Text> {roomData?.check_out_time}{" "}
            </Col>
            <Col span={12}>
              <Text strong>Mã đặt phòng:</Text> {roomData?.room_id}{" "}
            </Col>
            <Col span={12}>
              <Text strong>Thời gian lưu trú:</Text> {roomData?.stay_duration}{" "}
              <div>
                <span style={{ color: "#06BE92", fontWeight: "bold" }}>
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
            <Button
              type="default"
              style={{
                marginRight: "8px",
                backgroundColor: "#F5B2B2",
                borderColor: "#F5B2B2",
              }}
              onClick={handleEditBooking}
            >
              Sửa đặt phòng
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#06B392", borderColor: "#06BE92" }}
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