"use client";

import { Modal, Input, Card, Button, Dropdown } from "antd";
import React, { FC, useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  UserOutlined,
  IdcardOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import NewCustomers from "@/components/newCustomer";

// Hàm parse dữ liệu an toàn từ localStorage
const safeParse = (data: string | null) => {
  try {
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export interface Room {
  room_id: string;
  room_name: string;
  status: string;
  floor: number;
  type_id: string;
  check_in_time: string;
  check_out_time: string;
  cleaning_status: string;
  current_guest: string;
  note: string;
  price_override: number;
  num_guests: number;
  num_papers: number;
  stay_duration: string;
  check_in_notice: string;
}

interface SetBookingRoomUIProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData?: Room;
  RoomsList: Room[]; // Nhận danh sách phòng từ props
}

const SetBookingRoomUI: React.FC<SetBookingRoomUIProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData = safeParse(localStorage.getItem("bookingRoomData")),
  RoomsList,
}) => {
  const [adultCount, setAdultCount] = useState<number>(roomData?.num_guests || 0);
  const [hasId, setHasId] = useState<number>(roomData?.num_papers || 0);
  const [note, setNote] = useState<string>(roomData?.note || "");
  const [selectedType, setSelectedType] = useState<string>(roomData?.type_id || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNewCustomersModal, setShowNewCustomersModal] = useState(false);

  // Lấy danh sách loại phòng từ RoomsList
 const typeOptions = RoomsList?.map(room => room.type_id)
  ? Array.from(new Set(RoomsList.map(room => room.type_id))).map(typeId => ({
      key: typeId,
      label: typeId,
    }))
  : [];

  // Đồng bộ `note` và `current_guest` khi nhận dữ liệu mới từ localStorage
  useEffect(() => {
    const storedData = safeParse(localStorage.getItem("bookingRoomData"));
    if (storedData?.note && !roomData?.note) setNote(storedData.note);
  }, [roomData]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleAddNewCustomer = () => {
    setShowNewCustomersModal(true);
  };

  const handleNewCustomersModalClose = () => {
    setShowNewCustomersModal(false);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleSubmit = () => {
    const updatedRoomData = {
      ...roomData,
      note,
      num_guests: adultCount,
      num_papers: hasId,
      type_id: selectedType, // Cập nhật loại phòng
    };
    localStorage.setItem("bookingRoomData", JSON.stringify(updatedRoomData));
    console.log("Dữ liệu đã lưu:", updatedRoomData);
  };

  const handleTypeSelect = (type: { key: string; label: string }) => {
    setSelectedType(type.label);
    const updatedRoomData = {
      ...roomData,
      type_id: type.key,
    };
    localStorage.setItem("bookingRoomData", JSON.stringify(updatedRoomData));
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Sửa Đặt Phòng
      </h1>

      <Card
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: "5px",
          border: "1px solid #f5eaea",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            gap: "5px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: "16px", color: "#666", marginRight: "5px" }}>
              Khách hàng:
            </label>
            <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
              {roomData?.current_guest || "Chưa có "}
              <PlusCircleOutlined
                onClick={handleAddNewCustomer}
                style={{
                  color: "#999999",
                  cursor: "pointer",
                  marginLeft: "50px",
                  fontSize: "16px",
                }}
              />
            </span>
          </div>

          <span style={{ color: "#666", fontSize: "20px" }}>|</span>

          <div style={{ display: "flex", alignItems: "center" }}>
            <UserOutlined style={{ fontSize: "16px", marginRight: "5px" }} />
            <input
              type="number"
              value={adultCount}
              onChange={(e) => {
                const newAdultCount = Number(e.target.value);
                setAdultCount(newAdultCount);
              }}
              style={{
                width: "50px",
                textAlign: "center",
                fontSize: "16px",
                marginRight: "15px",
              }}
              min={0}
              placeholder={roomData?.num_guests.toString() || "Người lớn"}
            />
            <IdcardOutlined style={{ fontSize: "16px", marginRight: "5px" }} />
            <input
              type="number"
              value={hasId}
              onChange={(e) => {
                const newHasId = Number(e.target.value);
                setHasId(newHasId);
              }}
              style={{ width: "50px", textAlign: "center", fontSize: "16px" }}
              min={0}
              max={1}
              placeholder={roomData?.num_papers?.toString() || "Giấy tờ"}
            />
          </div>

          <span style={{ color: "#666", fontSize: "20px" }}>|</span>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label style={{ fontSize: "16px", color: "#666", whiteSpace: "nowrap" }}>
              Ghi chú:
            </label>
            <input
              type="text"
              value={note}
              onChange={handleNoteChange}
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "#333",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "200px",
              }}
              placeholder="Nhập ghi chú..."
            />
          </div>
        </div>
      </Card>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "28px",
        }}
      >
        <Card
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            padding: "5px",
            border: "1px solid #f5eaea",
            width: "40%",
            height: "444px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Hạng phòng:
              <Dropdown
                menu={{
                  items: typeOptions.map((type) => ({
                    key: type.key,
                    label: (
                      <span onClick={() => handleTypeSelect(type)}>
                        {type.label}
                      </span>
                    ),
                  })),
                }}
                trigger={["click"]}
                onOpenChange={(visible) => setIsDropdownOpen(visible)}
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  className="cursor-pointer flex items-center"
                >
                  <span style={{ fontSize: "16px", color: "#333" }}>
                    {selectedType || "Chọn hạng phòng"}
                  </span>
                  <DownOutlined
                    className={`transform transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    style={{ marginLeft: "8px" }}
                  />
                </a>
              </Dropdown>
            </h2>
            <p style={{ fontSize: "16px", color: "#666" }}>
              {roomData?.room_name}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
              {roomData?.price_override.toLocaleString()} VND
            </p>
          </div>
        </Card>

        <div
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              padding: "5px",
              border: "1px solid #f5eaea",
              width: "100%",
              height: "333px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Phòng
              </h2>
              <p style={{ fontSize: "16px", color: "#666" }}>
                {roomData?.room_id}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                {roomData?.price_override.toLocaleString()} VND
              </p>
            </div>
          </Card>

          <Card
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              padding: "10px",
              border: "1px solid #f5eaea",
              width: "100%",
              height: "90px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#008BCA",
                  borderColor: "#008BCA",
                  color: "white",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                Lưu
              </Button>
            </div>
            <div>
              <DeleteOutlined style={{ cursor: "pointer", fontSize: "24px" }} />
            </div>
          </Card>
        </div>
      </div>

      {showNewCustomersModal && (
        <NewCustomers onClose={handleNewCustomersModalClose} />
      )}
    </div>
  );
};

export default SetBookingRoomUI;