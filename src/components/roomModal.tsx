"use client";

import { Modal, Input, Button, Select, DatePicker, List } from "antd";
import { FC, useState, useEffect } from "react";

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

  const [checkInTime, setCheckInTime] = useState<Date | null>(
    roomData?.check_in_time ? new Date(roomData.check_in_time) : null
  );
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(
    roomData?.check_out_time ? new Date(roomData.check_out_time) : null
  );

  const [bookingType, setBookingType] = useState("Giờ");
  const [estimatedTime, setEstimatedTime] = useState<string>("");

  const calculateEstimatedTime = () => {
    if (
      checkInTime instanceof Date &&
      !isNaN(checkInTime.getTime()) &&
      checkOutTime instanceof Date &&
      !isNaN(checkOutTime.getTime())
    ) {
      const duration =
        (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      if (bookingType === "Giờ") {
        setEstimatedTime(`${duration} Giờ`);
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
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
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

  // State for customer search
  const [customerName, setCustomerName] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<string[]>([]);

  // Sample data for customer names
  const customerData = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Đỗ Văn E",
  ];

  // Function to handle search input
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
          {/* Input and suggestions for Customer Search */}
          <div
            style={{ width: "28%", textAlign: "left", position: "relative" }}
          >
            <Input
              placeholder="Tìm kiếm khách hàng"
              value={customerName}
              onChange={handleSearch}
              style={{ marginBottom: "16px" }}
            />

            {/* Display search results */}
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
                value={roomData.room_name} // Hiển thị tên phòng từ dữ liệu
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
                onChange={setCheckInTime}
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
                onChange={setCheckOutTime}
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
            {/* <Input.TextArea
              placeholder="Ghi chú"
              value={roomData.note || "Nhập ghi chú..."}
              style={{
                width: "40%",
                marginTop: "16px",
                padding: "16px",
                textAlign: "left",
              }}
            /> */}

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
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
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
