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
import RoomModal from "@/components/roomModal"; // Sử dụng RoomModal cho việc thêm phòng
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
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = safeParse(localStorage.getItem("bookingRoomData"));
      if (storedData?.note && !roomData?.note) setNote(storedData.note);
    }
  }, [roomData]);

  const handleAddNewCustomer = () => {
    setShowNewCustomersModal(true);
  };

  const handleNewCustomersModalClose = () => {
    setShowNewCustomersModal(false);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handleRoomModal = (room: Room) => {
    setSelectedRoom(room);
    setIsRoomModalOpen(true);
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

  const renderRoomInfo = () => {
    const calculateTotalPrice = () => {
      if (
        roomData?.check_in_time &&
        roomData?.check_out_time &&
        roomData?.price_override
      ) {
        const checkIn = new Date(roomData.check_in_time);
        const checkOut = new Date(roomData.check_out_time);
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const basePrice = diffDays * roomData.price_override;
        const bonus = roomData?.bonus || 0;
        const penalty = roomData?.penalty || 0;
        return basePrice + bonus - penalty;
      }
      return 0;
    };

    const totalPrice = calculateTotalPrice();

    // Màu sắc cho tổng tiền dựa trên trạng thái
    const totalPriceColor =
      roomData?.status === "Booked"
        ? "#FFA500" // Màu cam
        : roomData?.status === "Using"
        ? "#28A745" // Màu xanh lá
        : roomData?.status === "Time's Up"
        ? "#06BE92" // Màu xanh thẫm
        : "#FFA500"; // Màu mặc định

    return (
      <Card
        style={{
          position: "relative",
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
                  color:
                    roomData?.status === "Booked"
                      ? "#FFA500" // Màu cam
                      : roomData?.status === "Using"
                      ? "#28A745" // Màu xanh lá
                      : roomData?.status === "Time's Up"
                      ? "#06BE92" // Màu xanh thẫm
                      : "#FFA500", // Màu mặc định
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
            left: "16px",
            right: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid #ddd",
              paddingTop: "8px",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Tiền thưởng:
            </span>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              {roomData?.bonus?.toLocaleString() || "0"} VND
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Tiền phạt:
            </span>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              {roomData?.penalty?.toLocaleString() || "0"} VND
            </span>
          </div>
          <div
            style={{
              borderTop: "1px solid #ddd",
              paddingTop: "8px",
              textAlign: "right",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: totalPriceColor,
              }}
            >
              Tổng tiền: {totalPrice.toLocaleString()} VND
            </h3>
          </div>
        </div>
      </Card>
    );
  };

  const renderCard = () => (
    <Card
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "16px",
        border: "1px solid #f0f0f0",
        width: "100%",
        
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // Căn giữa các phần tử
          alignItems: "center", // Căn giữa theo chiều dọc
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
            {roomData.room_name} - {roomData.type_id || "N/A"}
          </h2>
          <span
            style={{
              backgroundColor:
                roomData?.status === "Booked" ||
                roomData?.status === "Using" ||
                roomData?.status === "Time's Up"
                  ? "#E8F5E9"
                  : "#FFF8E1",
              color:
                roomData?.status === "Booked"
                  ? "#FFA500"
                  : roomData?.status === "Using"
                  ? "#32CD32"
                  : roomData?.status === "Time's Up"
                  ? "#06BE92"
                  : "#FFC107",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "8px", // Khoảng cách giữa tiêu đề và trạng thái
            }}
          >
            {roomData?.status || "Unknown"}
          </span>
        </div>

        {/* Nút Nhận phòng hoặc Trả phòng */}
        <div>
          {(() => {
            if (roomData?.status === "booked") {
              return (
                <button
                  style={{
                    backgroundColor: "#FFA500",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Nhận phòng
                </button>
              );
            } else if (roomData?.status === "Using") {
              return (
                <button
                  style={{
                    backgroundColor: "#28A745", // Màu xanh lá cho Using
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px", // Giảm chiều cao của nút
                    borderRadius: "4px",
                    fontSize: "14px", // Kích thước chữ nhỏ hơn
                    fontWeight: "bold",
                  }}
                >
                  Trả phòng
                </button>
              );
            } else if (roomData?.status === "Time's Up") {
              return (
                <button
                  style={{
                    backgroundColor: "#06BE92", // Màu xanh thẫm cho Time's Up
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px", // Giảm chiều cao của nút
                    borderRadius: "4px",
                    fontSize: "14px", // Kích thước chữ nhỏ hơn
                    fontWeight: "bold",
                  }}
                >
                  Trả phòng
                </button>
              );
            }
            return null; // Không hiển thị gì nếu không có trạng thái phù hợp
          })()}
        </div>
      </div>

      {/* Thông tin phòng */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold", fontSize: "12px" }}>
            Hình thức
          </label>
          <select
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option value="giờ">Giờ</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold", fontSize: "12px" }}>Phòng</label>
          <select
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <option value="p502">P.502</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold", fontSize: "12px" }}>
            Nhận phòng
          </label>
          <input
            type="datetime-local"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold", fontSize: "12px" }}>
            Trả phòng
          </label>
          <input
            type="datetime-local"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: "bold", fontSize: "12px" }}>
            Lưu trú
          </label>
          <input
            type="text"
            value="1 giờ"
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* Bảng thông tin */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "16px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              STT
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Hạng mục
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "right",
              }}
            >
              Số lượng
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "right",
              }}
            >
              Đơn giá
            </th>
            <th
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "right",
              }}
            >
              Thành tiền
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              1
            </td>
            <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
              Phòng 02 giường đơn (Giờ)
            </td>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "right",
              }}
            >
              1
            </td>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "right",
              }}
            >
              200,000
            </td>
            <td
              style={{
                borderBottom: "1px solid #ddd",
                padding: "8px",
                textAlign: "right",
              }}
            >
              200,000
            </td>
          </tr>
        </tbody>
      </table>

      {/* Tổng tiền */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #ddd",
          paddingTop: "16px",
        }}
      >
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          Sản phẩm, dịch vụ
        </button>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
          Tổng tiền: {roomData?.price_override.toLocaleString()} VND
        </h3>
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
          {renderCard()}
          {renderButtons()}
        </div>
      </div>
      {showNewCustomersModal && (
        <NewCustomers onClose={handleNewCustomersModalClose} />
      )}
    </div>
  );
};

export default SetBookingRoomUI;
