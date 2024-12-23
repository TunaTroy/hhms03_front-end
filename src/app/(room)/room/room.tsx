"use client";

import React, { useState } from "react";
import { Layout, Tabs, Checkbox } from "antd";
import { DateTime } from "next-auth/providers/kakao";

const { Content } = Layout;
const { TabPane } = Tabs;

// Định nghĩa các interface

// Danh sách Hạng Phòng
interface RoomTypeTable {
  roomId: string;
  roomName: string;
  status: string;
  hourlyPrice: number;
  dailyPrice: number;
}

interface RoomType {
  roomTypeId: string;
  roomTypeName: string;
  roomCount: number;
  hourlyPrice: number;
  dailyPrice: number;
  status: string;
  description: string;
  standardCapacity: string;
  maxCapacity: string;
  imageUrl: string;
  cleanStatus: string;
  roomTypeDetail: RoomTypeTable[];
}

// Danh sách Phòng
interface Room {
  roomName: string;
  roomTypeName: string;
  floor: string;
  hourlyPrice: number;
  dailyPrice: number;
  status: string;
  note: string;
  penaltyPrice: number;
  createdAt: string;
  cleanStatus: string;
  imageUrl: string;
  roomDetail: RoomDetail[];
  roomBooking: RoomBooking[];
  roomPayment: RoomBill[];
}
interface RoomDetail {
  roomName: string;
  roomTypeName: string;
  floor: string;
  hourlyPrice: number;
  dailyPrice: number;
  status: string;
  penaltyPrice: number;
  createdAt: string;
  cleanStatus: string;
  note: string;
  imageUrl: string;
}
interface RoomBooking {
  bookingId: string;
  bookingTime: string;
  bookingEmployee: string;
  bookingTotal: number;
  bookingStatus: string;
}
interface RoomBill {
  billId: string;
  billTime: string;
  billEmployee: string;
  billStatus: string;
  billTotal: number;
}

// Dữ liệu mẫu
const sampleRoomTypes: RoomType[] = [
  {
    roomTypeId: "RT001",
    roomTypeName: "Phòng Standard",
    roomCount: 5,
    hourlyPrice: 200000,
    dailyPrice: 500000,
    status: "Đang kinh doanh",
    description: "Phòng tiêu chuẩn với đầy đủ tiện nghi",
    standardCapacity: "2 người lớn, 1 trẻ em",
    maxCapacity: "3 người lớn, 2 trẻ em",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    cleanStatus: "Clean",
    roomTypeDetail: [
      {
        roomId: "R001",
        roomName: "Phòng 101",
        status: "Đang sử dụng",
        hourlyPrice: 200000,
        dailyPrice: 500000,
      },
      {
        roomId: "R002",
        roomName: "Phòng 102",
        status: "Trống",
        hourlyPrice: 200000,
        dailyPrice: 500000,
      },
    ],
  },
  {
    roomTypeId: "RT002",
    roomTypeName: "Phòng Deluxe",
    roomCount: 3,
    hourlyPrice: 300000,
    dailyPrice: 800000,
    status: "Đang kinh doanh",
    description: "Phòng cao cấp với view đẹp và nhiều tiện nghi hơn",
    standardCapacity: "3 người lớn, 2 trẻ em",
    maxCapacity: "4 người lớn, 2 trẻ em",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Deluxe",
    cleanStatus: "Dirty",
    roomTypeDetail: [
      {
        roomId: "R005",
        roomName: "Phòng 301",
        status: "Trống",
        hourlyPrice: 300000,
        dailyPrice: 800000,
      },
      {
        roomId: "R006",
        roomName: "Phòng 302",
        status: "Trống",
        hourlyPrice: 300000,
        dailyPrice: 800000,
      },
    ],
  },
  {
    roomTypeId: "RT003",
    roomTypeName: "Phòng Suite",
    roomCount: 2,
    hourlyPrice: 600000,
    dailyPrice: 1500000,
    status: "Ngừng kinh doanh",
    description: "Phòng hạng sang dành cho khách VIP",
    standardCapacity: "2 người lớn, 1 trẻ em",
    maxCapacity: "3 người lớn, 2 trẻ em",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Suite",
    cleanStatus: "Clean",
    roomTypeDetail: [
      {
        roomId: "R003",
        roomName: "Phòng 201",
        status: "Trống",
        hourlyPrice: 600000,
        dailyPrice: 1500000,
      },
      {
        roomId: "R004",
        roomName: "Phòng 202",
        status: "Đang sử dụng",
        hourlyPrice: 600000,
        dailyPrice: 1500000,
      },
    ],
  },
];

// Dữ liệu danh sách Phòng
const sampleRooms: Room[] = [
  {
    roomName: "P.101",
    roomTypeName: "Suite",
    floor: "Tầng 5",
    hourlyPrice: 150,
    dailyPrice: 1000,
    status: "Đang hoạt động",
    note: "Ocean view",
    penaltyPrice: 200,
    createdAt: "2023-12-01T12:00:00Z",
    cleanStatus: "Clean",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    roomDetail: [
      {
        roomName: "P.101",
        roomTypeName: "Suite",
        floor: "Tầng 5",
        hourlyPrice: 150,
        dailyPrice: 1000,
        status: "Đang hoạt động",
        note: "Ocean view",
        penaltyPrice: 200,
        createdAt: "2023-12-01T12:00:00Z",
        cleanStatus: "Clean",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
      },
    ],
    roomBooking: [
      {
        bookingId: "B001",
        bookingTime: "2023-12-02T14:00:00Z",
        bookingEmployee: "Alice",
        bookingTotal: 1200,
        bookingStatus: "Đang xử lý",
      },
    ],
    roomPayment: [
      {
        billId: "P001",
        billTime: "2023-12-02T15:00:00Z",
        billEmployee: "Bob",
        billStatus: "Hoàn thành",
        billTotal: 1200,
      },
    ],
  },
  {
    roomName: "P.102",
    roomTypeName: "Single",
    floor: "Tầng 2",
    hourlyPrice: 50,
    dailyPrice: 300,
    status: "Đang hoạt động",
    note: "Near elevator",
    penaltyPrice: 100,
    createdAt: "2023-11-15T09:00:00Z",
    cleanStatus: "Cleaning",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    roomDetail: [
      {
        roomName: "P.102",
        roomTypeName: "Single",
        floor: "Tầng 2",
        hourlyPrice: 50,
        dailyPrice: 300,
        status: "Đang hoạt động",
        note: "Near elevator",
        penaltyPrice: 100,
        createdAt: "2023-11-15T09:00:00Z",
        cleanStatus: "Cleaning",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
      },
    ],
    roomBooking: [],
    roomPayment: [],
  },
  {
    roomName: "P.103",
    roomTypeName: "Double",
    floor: "Tầng 3",
    hourlyPrice: 80,
    dailyPrice: 600,
    status: "Đang hoạt động",
    note: "Extra bed available",
    penaltyPrice: 150,
    createdAt: "2023-12-05T10:30:00Z",
    cleanStatus: "Dirty",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Deluxe",
    roomDetail: [
      {
        roomName: "P.103",
        roomTypeName: "Double",
        floor: "Tầng 3",
        hourlyPrice: 80,
        dailyPrice: 600,
        status: "Đang hoạt động",
        note: "Extra bed available",
        penaltyPrice: 150,
        createdAt: "2023-12-05T10:30:00Z",
        cleanStatus: "Dirty",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Deluxe",
      },
    ],
    roomBooking: [
      {
        bookingId: "B002",
        bookingTime: "2023-12-06T10:00:00Z",
        bookingEmployee: "Charlie",
        bookingTotal: 700,
        bookingStatus: "Hoàn thành",
      },
    ],
    roomPayment: [],
  },
  {
    roomName: "P.104",
    roomTypeName: "Executive",
    floor: "Tầng 4",
    hourlyPrice: 120,
    dailyPrice: 800,
    status: "Đang hoạt động",
    note: "Access to lounge",
    penaltyPrice: 180,
    createdAt: "2023-10-20T08:00:00Z",
    cleanStatus: "Clean",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    roomDetail: [
      {
        roomName: "P.104",
        roomTypeName: "Executive",
        floor: "Tầng 4",
        hourlyPrice: 120,
        dailyPrice: 800,
        status: "Đang hoạt động",
        note: "Access to lounge",
        penaltyPrice: 180,
        createdAt: "2023-10-20T08:00:00Z",
        cleanStatus: "Clean",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
      },
    ],
    roomBooking: [],
    roomPayment: [],
  },
  {
    roomName: "P.105",
    roomTypeName: "Luxury",
    floor: "Tầng 10",
    hourlyPrice: 300,
    dailyPrice: 2500,
    status: "Đang hoạt động",
    note: "Private terrace",
    penaltyPrice: 500,
    createdAt: "2023-12-10T11:00:00Z",
    cleanStatus: "Clean",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Suite",
    roomDetail: [
      {
        roomName: "P.105",
        roomTypeName: "Luxury",
        floor: "Tầng 10",
        hourlyPrice: 300,
        dailyPrice: 2500,
        status: "Đang hoạt động",
        note: "Private terrace",
        penaltyPrice: 500,
        createdAt: "2023-12-10T11:00:00Z",
        cleanStatus: "Clean",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Suite",
      },
    ],
    roomBooking: [
      {
        bookingId: "B003",
        bookingTime: "2023-12-12T16:00:00Z",
        bookingEmployee: "David",
        bookingTotal: 3000,
        bookingStatus: "Đang xử lý",
      },
    ],
    roomPayment: [
      {
        billId: "P002",
        billTime: "2023-12-12T17:00:00Z",
        billEmployee: "Eve",
        billStatus: "Đang xử lý",
        billTotal: 3000,
      },
    ],
  },
];

const RoomTypeList = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [activeTab, setActiveTab] = useState<"roomTypes" | "rooms">(
    "roomTypes"
  );

  // Xử lý mở rộng/thu gọn
  const handleExpandChange = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((expandedId) => expandedId !== id)
        : [...prev, id]
    );
  };

  // Xử lý checkbox chọn từng hạng phòng
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Xử lý checkbox chọn tất cả
  const handleHeaderCheckboxChange = () => {
    if (selectedIds.length === sampleRoomTypes.length) {
      setSelectedIds([]);
      setIsAllSelected(false);
    } else {
      const allIds = sampleRoomTypes.map((roomType) => roomType.roomTypeId);
      setSelectedIds(allIds);
      setIsAllSelected(true);
    }
  };

  // Cập nhật trạng thái checkbox chọn tất cả
  React.useEffect(() => {
    setIsAllSelected(selectedIds.length === sampleRoomTypes.length);
  }, [selectedIds]);

  // Hiển thị danh sách hạng phòng
  const renderRoomTypes = () => (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid #000",
        }}
      >
        <div style={{ width: "5%", textAlign: "left" }}>
          <Checkbox
            checked={isAllSelected}
            onChange={handleHeaderCheckboxChange}
          />
        </div>
        <div style={{ width: "20%" }}>
          <strong>Mã hạng phòng</strong>
        </div>
        <div style={{ width: "30%" }}>
          <strong>Tên hạng phòng</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Số lượng phòng</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Giá giờ</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Giá ngày</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Trạng thái</strong>
        </div>
      </div>

      {/* Room Types */}
      {sampleRoomTypes.map((roomType) => (
        <div key={roomType.roomTypeId}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => handleExpandChange(roomType.roomTypeId)}
          >
            <Checkbox
              checked={selectedIds.includes(roomType.roomTypeId)}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(roomType.roomTypeId);
              }}
              style={{ width: "5%" }}
            />
            <div style={{ width: "20%", fontSize: "13px" }}>
              {roomType.roomTypeId}
            </div>
            <div style={{ width: "30%", fontSize: "13px" }}>
              {roomType.roomTypeName}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {roomType.roomCount}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {roomType.hourlyPrice.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {roomType.dailyPrice.toLocaleString("vi-VN")}
            </div>
            <div
              style={{
                width: "15%",
                fontSize: "13px",
                color: roomType.status === "Ngừng kinh doanh" ? "red" : "green",
              }}
            >
              {roomType.status}
            </div>
          </div>

          {/* Expanded Row */}
          {expandedIds.includes(roomType.roomTypeId) && (
            <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
              <Tabs defaultActiveKey="1">
                {/* Tab: Thông tin */}
                <TabPane tab="Thông tin" key="1">
                  <div style={{ display: "flex", gap: "20px" }}>
                    {/* Phần 1: Ảnh */}
                    <div style={{ width: "35%" }}>
                      <img
                        src={roomType.imageUrl}
                        alt={roomType.roomTypeName}
                        style={{
                          width: "90%", // Thay đổi width thành 100%
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    {/* Phần 2: Các field cơ bản */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Mã hạng phòng:</strong> {roomType.roomTypeId}
                      </p>
                      <p>
                        <strong>Tên hạng phòng:</strong> {roomType.roomTypeName}
                      </p>
                      <p>
                        <strong>Số lượng phòng:</strong> {roomType.roomCount}
                      </p>
                      <p>
                        <strong>Giá giờ:</strong>{" "}
                        {roomType.hourlyPrice.toLocaleString("vi-VN")}
                      </p>
                      <p>
                        <strong>Giá ngày:</strong>{" "}
                        {roomType.dailyPrice.toLocaleString("vi-VN")}
                      </p>
                      <p>
                        <strong>Phụ thu quá giờ:</strong> Tính theo giờ
                      </p>
                    </div>

                    {/* Phần 3: Sức chứa và mô tả */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Sức chứa tiêu chuẩn:</strong>{" "}
                        {roomType.standardCapacity}
                      </p>
                      <p>
                        <strong>Sức chứa tối đa:</strong> {roomType.maxCapacity}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {roomType.description}
                      </p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ marginTop: "10px", textAlign: "end" }}>
                    <button
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cập nhật
                    </button>
                    <button
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Ngừng kinh doanh
                    </button>
                    <button
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#d9534f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </TabPane>

                {/* Tab: Danh sách phòng */}
                <TabPane tab="Danh sách phòng" key="2">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#e6f7ff" }}>
                        {[
                          "Mã phòng",
                          "Tên phòng",
                          "Giá ngày",
                          "Giá giờ",
                          "Trạng thái",
                        ].map((header) => (
                          <th
                            key={header}
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {roomType.roomTypeDetail.map((roomType) => (
                        <tr key={roomType.roomId}>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {roomType.roomId}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {roomType.roomName}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {roomType.dailyPrice.toLocaleString("vi-VN")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {roomType.hourlyPrice.toLocaleString("vi-VN")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                              color:
                                roomType.status === "Đang sử dụng"
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {roomType.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabPane>
              </Tabs>
            </div>
          )}
        </div>
      ))}
    </>
  );

  const renderRooms = () => (
    <>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid #000",
        }}
      >
        <div style={{ width: "5%", textAlign: "left" }}>
          <Checkbox
            checked={isAllSelected}
            onChange={handleHeaderCheckboxChange}
          />
        </div>
        <div style={{ width: "20%" }}>
          <strong>Tên phòng</strong>
        </div>
        <div style={{ width: "30%" }}>
          <strong>Hạng phòng</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Khu vực</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Giá giờ</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Giá ngày</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Trạng thái</strong>
        </div>
        <div style={{ width: "30%" }}>
          <strong>Ghi chú</strong>
        </div>
      </div>

      {/* Room */}
      {sampleRooms.map((room) => (
        <div key={room.roomName}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => handleExpandChange(room.roomName)}
          >
            <Checkbox
              checked={selectedIds.includes(room.roomName)}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(room.roomName);
              }}
              style={{ width: "5%" }}
            />
            <div style={{ width: "20%", fontSize: "13px" }}>
              {room.roomName}
            </div>
            <div style={{ width: "30%", fontSize: "13px" }}>
              {room.roomTypeName}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>{room.floor}</div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {room.hourlyPrice.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {room.dailyPrice.toLocaleString("vi-VN")}
            </div>
            <div
              style={{
                width: "15%",
                fontSize: "13px",
                color: room.status === "Ngừng kinh doanh" ? "red" : "green",
              }}
            >
              {room.status}
            </div>
            <div style={{ width: "30%", fontSize: "13px" }}>{room.note}</div>
          </div>

          {/* Expanded Row */}
          {expandedIds.includes(room.roomName) && (
            <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
              <Tabs defaultActiveKey="1">
                {/* Tab: Thông tin */}
                <TabPane tab="Thông tin" key="1">
                  <div style={{ display: "flex", gap: "20px" }}>
                    {/* Phần 1: Ảnh */}
                    <div style={{ width: "35%" }}>
                      <img
                        src={room.imageUrl}
                        alt={room.roomName}
                        style={{
                          width: "90%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    {/* Phần 2: Các field cơ bản */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Tên phòng:</strong> {room.roomName}
                      </p>
                      <p>
                        <strong>Hạng phòng:</strong> {room.roomTypeName}
                      </p>
                      <p>
                        <strong>Khu vực:</strong> {room.floor}
                      </p>
                      <p>
                        <strong>Giá giờ:</strong>{" "}
                        {room.hourlyPrice.toLocaleString("vi-VN")}
                      </p>
                      <p>
                        <strong>Giá ngày:</strong>{" "}
                        {room.dailyPrice.toLocaleString("vi-VN")}
                      </p>
                      <p>
                        <strong>Phụ thu quá giờ:</strong>{" "}
                        {room.penaltyPrice.toLocaleString("vi-VN")}
                      </p>
                    </div>

                    {/* Phần 3: Sức chứa và mô tả */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Bắt đầu sử dụng:</strong> {room.createdAt}
                      </p>
                      <p>
                        <strong>Vệ sinh:</strong> {room.cleanStatus}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {room.note}
                      </p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ marginTop: "10px", textAlign: "end" }}>
                    <button
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cập nhật
                    </button>
                    <button
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Ngừng kinh doanh
                    </button>
                    <button
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#d9534f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </TabPane>

                {/* Tab: Lịch sử đặt phòng */}
                <TabPane tab="Lịch sử đặt phòng" key="2">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#e6f7ff" }}>
                        {[
                          "Mã đặt phòng",
                          "Thời gian đặt",
                          "Nhân viên đặt",
                          "Tổng cộng",
                          "Trạng thái",
                        ].map((header) => (
                          <th
                            key={header}
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {room.roomBooking.map((booking) => (
                        <tr key={booking.bookingTime}>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {booking.bookingId}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {booking.bookingTime}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {booking.bookingEmployee}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {booking.bookingTotal.toLocaleString("vi-VN")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                              color:
                                booking.bookingStatus === "Đang xử lý"
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {booking.bookingStatus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabPane>
                {/* Tab: Lịch sử giao dịch */}
                <TabPane tab="Lịch sử giao dịch" key="3">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#e6f7ff" }}>
                        {[
                          "Mã hóa đơn",
                          "Thời gian",
                          "Thu ngân",
                          "Trạng thái",
                          "Tổng cộng",
                        ].map((header) => (
                          <th
                            key={header}
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {room.roomPayment.length > 0 ? (
                        room.roomPayment.map((payment) => (
                          <tr key={payment.billId}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.billId}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.billTime}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.billEmployee}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                                color:
                                  payment.billStatus === "Đang xử lý"
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {payment.billStatus}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.billTotal.toLocaleString("vi-VN")}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                              color: "#888",
                            }}
                          >
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </TabPane>
              </Tabs>
            </div>
          )}
        </div>
      ))}
    </>
  );

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Content
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as "roomTypes" | "rooms")}
        >
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Hạng phòng
              </span>
            }
            key="roomTypes"
          >
            {renderRoomTypes()}
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Phòng
              </span>
            }
            key="rooms"
          >
            {renderRooms()}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default RoomTypeList;
