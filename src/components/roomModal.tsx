"use client";

import { Modal, Input, Button, Select, DatePicker, List, Row } from "antd";
import { FC, useState, useEffect } from "react";
import moment, { Moment } from "moment";
import {
  PlusCircleOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import NewCustomers from "./newCustomer";

const { Option } = Select;

interface RoomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData?: {
    room_name: string;
    status: string;
    floor: number;
    check_in_time: string;
    check_out_time: string;
    cleaning_status: string;
    current_guest: string;
    note: string;
    price_override: number;
  };
}

const RoomModal: FC<RoomModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [showNewCustomersModal, setShowNewCustomersModal] = useState(false);
  const handleAddNewCustomer = () => {
    setShowNewCustomersModal(true);
  };
  const handleNewCustomersModalClose = () => {
    setShowNewCustomersModal(false);
  };

  const [checkInTime, setCheckInTime] = useState<Moment | null>(
    roomData?.check_in_time ? moment(roomData.check_in_time) : null
  );
  const [checkOutTime, setCheckOutTime] = useState<Moment | null>(
    roomData?.check_out_time ? moment(roomData.check_out_time) : null
  );

  const [bookingType, setBookingType] = useState("Giờ");
  const [estimatedTime, setEstimatedTime] = useState<string>("");

  const calculateEstimatedTime = () => {
    if (checkInTime && checkOutTime) {
      const duration = checkOutTime.diff(checkInTime, "hours", true);
      if (bookingType === "Giờ") {
        setEstimatedTime(`${duration.toFixed(2)} Giờ`);
      } else {
        const days = Math.ceil(duration / 24);
        setEstimatedTime(`${days} Ngày`);
      }
    } else {
      setEstimatedTime("");
    }
  };

  useEffect(() => {
    calculateEstimatedTime();
  }, [checkInTime, checkOutTime, bookingType]);

  const handleUpdateTime = () => {
    fetch("/api/update-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: roomData?.room_name,
        checkInTime: checkInTime ? checkInTime.toISOString() : null,
        checkOutTime: checkOutTime ? checkOutTime.toISOString() : null,
        bookingType: bookingType,
      }),
    })
      .then((response) => {
        console.log("Room updated successfully");
      })
      .catch((error) => {
        console.error("Error updating room:", error);
      });
  };

  const [customerName, setCustomerName] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<string[]>([]);

  const customerData = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Đỗ Văn E",
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setCustomerName(searchValue);

    if (searchValue) {
      const results = customerData.filter((customer) =>
        customer.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCustomers(results);
    } else {
      setFilteredCustomers([]);
    }
  };

  const [note, setNote] = useState<string>(roomData?.note || "");
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const [adultCount, setAdultCount] = useState<number>(0);
  const [hasId, setHasId] = useState<number>(0); // 0: Không có giấy tờ, 1: Có giấy tờ

  const handleHasIdChange = (value: string) => {
    const numValue = Number(value);
    if (numValue === 0 || numValue === 1) {
      setHasId(numValue);
    }
  };

  return (
    <Modal
      title={
        <span
          style={{ fontWeight: "bold", fontSize: "18px", color: "#4CAF50" }}
        >
          Đặt/Nhận phòng nhanh
        </span>
      }
      open={isModalOpen}
      footer={null}
      width={1000}
      onCancel={handleClose}
    >
      {roomData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28%", position: "relative" }}>
              <Input
                placeholder="Tìm kiếm khách hàng"
                value={customerName}
                onChange={handleSearch}
                style={{ marginBottom: "0" }}
                addonAfter={
                  <PlusCircleOutlined
                    onClick={handleAddNewCustomer}
                    style={{ color: "#999999", cursor: "pointer" }}
                  />
                }
              />
              {filteredCustomers.length > 0 && (
                <List
                  bordered
                  dataSource={filteredCustomers}
                  renderItem={(item) => (
                    <List.Item
                      style={{ cursor: "pointer" }}
                      onClick={() => setCustomerName(item)}
                    >
                      {item}
                    </List.Item>
                  )}
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    backgroundColor: "#fff",
                    zIndex: 1,
                    border: "1px solid #d9d9d9",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                />
              )}
              {showNewCustomersModal && (
                <NewCustomers onClose={handleNewCustomersModalClose} />
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  
                }}
              >
                <UserOutlined style={{ marginRight: "1px" }} />
                <input
                  type="number"
                  value={adultCount}
                  onChange={(e) => setAdultCount(Number(e.target.value))}
                  style={{ width: "50px", textAlign: "center" }}
                  min={0}
                  placeholder="Người lớn"
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IdcardOutlined style={{ marginRight: "1px" }} />
                <input
                  type="number"
                  value={hasId}
                  onChange={(e) => setHasId(Number(e.target.value))}
                  style={{ width: "50px", textAlign: "center" }}
                  min={0}
                  max={1}
                  placeholder="Giấy tờ"
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#d4f7ce",
              padding: "10px",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{ width: "12%", textAlign: "center", fontWeight: "bold" }}
            >
              Hạng phòng
            </div>
            <div
              style={{ width: "12%", textAlign: "center", fontWeight: "bold" }}
            >
              Phòng
            </div>
            <div
              style={{ width: "12%", textAlign: "center", fontWeight: "bold" }}
            >
              Hình thức
            </div>
            <div
              style={{ width: "18%", textAlign: "center", fontWeight: "bold" }}
            >
              Nhận phòng
            </div>
            <div
              style={{ width: "18%", textAlign: "center", fontWeight: "bold" }}
            >
              Trả phòng
            </div>
            <div
              style={{ width: "12%", textAlign: "center", fontWeight: "bold" }}
            >
              Dự kiến
            </div>
            <div
              style={{ width: "12%", textAlign: "center", fontWeight: "bold" }}
            >
              Thành tiền
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Input
              style={{ width: "12%", textAlign: "center" }}
              value={`Hạng phòng ${roomData.floor}`}
              readOnly
            />
            <div style={{ width: "12%", textAlign: "center" }}>
              <Input
                style={{ textAlign: "center" }}
                value={roomData.room_name}
                readOnly
              />
            </div>
            <div
              style={{
                width: "12%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                style={{ width: "100%" }}
                value={bookingType}
                onChange={setBookingType}
              >
                <Option value="Giờ">Giờ</Option>
                <Option value="Ngày">Ngày</Option>
              </Select>
            </div>
            <div
              style={{
                width: "18%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DatePicker
                showTime
                value={checkInTime}
                onChange={(date) => setCheckInTime(date)}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
              />
            </div>
            <div
              style={{
                width: "18%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DatePicker
                showTime
                value={checkOutTime}
                onChange={(date) => setCheckOutTime(date)}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
              />
            </div>
            <Input
              style={{ width: "12%", textAlign: "center" }}
              value={estimatedTime}
              readOnly
            />
            <Input
              style={{ width: "14%", textAlign: "center" }}
              value={`$${roomData.price_override}`}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                width: "28%",
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "4px",
                textAlign: "right",
              }}
            >
              <p>
                Khách cần trả: <strong>2,500,000</strong>
              </p>
              <p>Khách thanh toán: 0</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
              onClick={handleUpdateTime}
            >
              Nhận phòng
            </Button>
            <Button
              type="default"
              style={{
                backgroundColor: "#FF9800",
                borderColor: "#FF9800",
                marginLeft: "8px",
              }}
            >
              Đặt trước
            </Button>
          </div>
        </div>
      ) : (
        <p>No room data available.</p>
      )}
    </Modal>
  );
};

export default RoomModal;
