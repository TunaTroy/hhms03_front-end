"use client";

import { Modal, Input, Card, Button } from "antd";
import React, { FC, useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  UserOutlined,
  IdcardOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import NewCustomers from "@/components/newCustomer";
import RoomModal from "@/components/roomModal"; // Import RoomModal
import ListTypeID from "@/components/listTypeID";

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
  RoomsList: Room[];
}

export const SetBookingRoomUI: React.FC<SetBookingRoomUIProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData = typeof window !== "undefined"
    ? safeParse(localStorage.getItem("bookingRoomData"))
    : {},
  RoomsList,
}) => {
  const [adultCount, setAdultCount] = useState<number>(
    roomData?.num_guests || 0
  );
  const [hasId, setHasId] = useState<number>(roomData?.num_papers || 0);
  const [note, setNote] = useState<string>(roomData?.note || "");
  const [selectedType, setSelectedType] = useState<string>(
    roomData?.type_id || ""
  );
  const [showNewCustomersModal, setShowNewCustomersModal] = useState(false);

  // State để quản lý RoomModal
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = safeParse(localStorage.getItem("bookingRoomData"));
      if (storedData?.note && !roomData?.note) setNote(storedData.note);
    }
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
      type_id: selectedType,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("bookingRoomData", JSON.stringify(updatedRoomData));
    }
    console.log("Dữ liệu đã lưu:", updatedRoomData);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    const updatedRoomData = {
      ...roomData,
      type_id: typeId,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("bookingRoomData", JSON.stringify(updatedRoomData));
    }
  };

  const renderHeader = () => (
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
  );

  const renderCustomerInfo = () => (
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
          <label
            style={{ fontSize: "16px", color: "#666", marginRight: "5px" }}
          >
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
            onChange={(e) => setAdultCount(Number(e.target.value))}
            style={{
              width: "50px",
              textAlign: "center",
              fontSize: "16px",
              marginRight: "15px",
            }}
            min={0}
            placeholder={roomData?.num_guests.toString()}
          />
          <IdcardOutlined style={{ fontSize: "16px", marginRight: "5px" }} />
          <input
            type="number"
            value={hasId}
            onChange={(e) => setHasId(Number(e.target.value))}
            style={{ width: "50px", textAlign: "center", fontSize: "16px" }}
            min={0}
            max={1}
            placeholder={roomData?.num_papers?.toString()}
          />
        </div>
        <span style={{ color: "#666", fontSize: "20px" }}>|</span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label
            style={{ fontSize: "16px", color: "#666", whiteSpace: "nowrap" }}
          >
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
  );

  const renderRoomInfo = () => (
    <Card
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "16px",
        border: "1px solid #f5eaea",
        width: "40%",
        height: "auto",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
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
          Hạng phòng: {roomData?.type_id}
        </h2>
      </div>

      <Card
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: "5px",
          height: "100px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>
              {roomData?.room_name || "Chưa có thông tin"}
            </span>
            <span
              style={{
                fontWeight: "bold",
                color: "#FFA500",
                fontSize: "14px",
                marginLeft: "8px",
              }}
            >
              {roomData?.status || "Chưa có thông tin"}
            </span>
          </div>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            {roomData?.price_override?.toLocaleString() || "0"} VND
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0px",
          }}
        >
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
            {roomData?.check_in_time || "Chưa có thông tin"}
          </p>
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
            {roomData?.check_out_time || "Chưa có thông tin"}
          </p>
        </div>
      </Card>

      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "14px", margin: 0, marginRight: "8px" }}>
          Thêm phòng mới
        </p>
        <PlusCircleOutlined
          style={{
            fontSize: "24px",
            color: "#008BCA",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
      </div>
    </Card>
  );

  const renderButtons = () => (
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
  );

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
      {renderHeader()}
      {renderCustomerInfo()}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "28px",
        }}
      >
        {renderRoomInfo()}
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
              <p
                style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
              >
                {roomData?.price_override.toLocaleString()} VND
              </p>
            </div>
          </Card>
          {renderButtons()}
        </div>
      </div>
      {showNewCustomersModal && (
        <NewCustomers onClose={handleNewCustomersModalClose} />
      )}
      {/* Hiển thị RoomModal */}
      <RoomModal
        isModalOpen={isRoomModalOpen} // Truyền trạng thái modal
        setIsModalOpen={setIsRoomModalOpen} // Hàm đóng modal
      />
    </div>
  );
};

export default SetBookingRoomUI;
