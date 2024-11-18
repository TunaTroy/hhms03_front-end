"use client";

import { Card, Button } from "antd";
import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  UserOutlined,
  IdcardOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import NewCustomers from "@/components/newCustomer";

interface RoomBookingData {
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  numGuests: number;
  customerName: string;
  specialNotes: string;
}

const SetBookingRoomUI: React.FC = () => {
  const [bookingData, setBookingData] = useState<RoomBookingData>({
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    numGuests: 0,
    customerName: "",
    specialNotes: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("bookingRoomData");
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("bookingRoomData", JSON.stringify(bookingData));
    console.log(bookingData);
  };

  const [adultCount, setAdultCount] = useState<number>(0);
  const [hasId, setHasId] = useState<number>(0);

  const [showNewCustomersModal, setShowNewCustomersModal] = useState(false);
  const handleAddNewCustomer = () => {
    setShowNewCustomersModal(true);
  };
  const handleNewCustomersModalClose = () => {
    setShowNewCustomersModal(false);
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                fontSize: "16px",
                color: "#666",
                marginRight: "5px",
              }}
            >
              Khách hàng:
            </label>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
              }}
            >
              {bookingData.customerName || "Tao đẹp trai"}
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
              placeholder="Người lớn"
            />
            <IdcardOutlined style={{ fontSize: "16px", marginRight: "5px" }} />
            <input
              type="number"
              value={hasId}
              onChange={(e) => setHasId(Number(e.target.value))}
              style={{
                width: "50px",
                textAlign: "center",
                fontSize: "16px",
              }}
              min={0}
              max={1}
              placeholder="Giấy tờ"
            />
          </div>
          <span style={{ color: "#666", fontSize: "20px" }}>|</span>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              style={{
                fontSize: "16px",
                color: "#666",
                whiteSpace: "nowrap",
              }}
            >
              Ghi chú:
            </label>
            <input
              type="text"
              value={bookingData.specialNotes}
              onChange={(e) =>
                setBookingData({ ...bookingData, specialNotes: e.target.value })
              }
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
        {/* Hạng phòng */}
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
              }}
            >
              Hạng phòng
            </h2>
            <p style={{ fontSize: "16px", color: "#666" }}>Hạng phòng 3</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
              1,800,000
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
          {/* Phòng */}
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
              <p style={{ fontSize: "16px", color: "#666" }}>P.103</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                1,800,000
              </p>
            </div>
          </Card>

          {/* Button */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <DeleteOutlined
                style={{
                  fontSize: "30px",
                  color: "#B0B0B0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  console.log("Xóa mục");
                }}
              />
              <Button
                type="primary"
                style={{
                  backgroundColor: "#008BCA",
                  borderColor: "#008BCA",
                  color: "white",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "4px",
                }}
              >
                Lưu
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  color: "white",
                  fontSize: "16px",
                  padding: "10px 20px",
                  borderRadius: "4px",
                }}
              >
                Thanh toán
              </Button>
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
