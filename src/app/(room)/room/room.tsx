"use client";

import React, { useState } from "react";
import { Layout, Tabs, Checkbox } from "antd";
import UpdateTypeRoom from "@/components/update/updateTypeRoom";
import { DateTime } from "next-auth/providers/kakao";
import { UUID } from "crypto";

const { Content } = Layout;
const { TabPane } = Tabs;

interface UpdateProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

// Danh sách Hạng Phòng
interface RoomType {
  typeId: string;
  name: string;
  count: number;
  hourlyPrice: number;
  dailyPrice: number;
  status: string;
  description: string;
  maxAdults: string;
  maxChildren: string;
  imageUrl: string;
  cleanStatus: string;
  roomTypeDetail: RoomTypeTable[];
}
interface RoomTypeTable {
  name: string;
  roomName: string;
  description: string;
  status: string;
  hourlyPrice: number;
  dailyPrice: number;
}

// Danh sách Phòng
interface Room {
  name: string;
  typeName: string;
  floor: string;
  hourlyPrice: number;
  dailyPrice: number;
  status: string;
  description: string;
  penaltyPrice: number;
  timeStart: string;
  cleanStatus: string;
  imageUrl: string;
  roomDetail: RoomDetail[];
  roomBooking: RoomBooking[];
  roomPayment: RoomInvoice[];
}
interface RoomDetail {
  name: string;
  typeName: string;
  floor: string;
  hourlyPrice: number;
  dailyPrice: number;
  status: string;
  penaltyPrice: number;
  timeStart: string;
  cleanStatus: string;
  description: string;
  imageUrl: string;
}
interface RoomBooking {
  bookingId: string;
  bookingTime: string;
  bookingEmployee: string;
  bookingTotal: number;
  bookingStatus: string;
}
interface RoomInvoice {
  invoiceId: string;
  invoiceTime: string;
  invoiceEmployee: string;
  invoiceStatus: string;
  invoiceTotal: number;
}

// Dữ liệu mẫu
const sampleRoomTypes: RoomType[] = [
  {
    typeId: "RT0001",
    name: "Phòng Đơn",
    count: 5,
    hourlyPrice: 200000,
    dailyPrice: 500000,
    status: "Đang kinh doanh",
    description: "Phòng đơn view biển 1m8",
    maxAdults: "2 người lớn",
    maxChildren: "1 trẻ em",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    cleanStatus: "Clean",
    roomTypeDetail: [
      {
        name: "Phòng Đơn",
        roomName: "Phòng 101",
        description: "Phòng đơn view biển 1m8",
        status: "Đang sử dụng",
        hourlyPrice: 200000,
        dailyPrice: 500000,
      },

      {
        name: "Phòng Đơn",
        roomName: "Phòng 102",
        description: "Phòng đơn có cửa sổ",
        status: "Trống",
        hourlyPrice: 200000,
        dailyPrice: 500000,
      },
    ],
  },
  {
    typeId: "RT0002",
    name: "Phòng Đôi",
    count: 3,
    hourlyPrice: 300000,
    dailyPrice: 800000,
    status: "Đang kinh doanh",
    description: "Phòng đôi view biển 1m6",
    maxAdults: "2 người lớn",
    maxChildren: "0",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Deluxe",
    cleanStatus: "Dirty",
    roomTypeDetail: [
      {
        name: "Phòng Đôi",
        roomName: "Phòng 301",
        description: "Phòng đôi view biển 1m6",
        status: "Trống",
        hourlyPrice: 300000,
        dailyPrice: 800000,
      },
      {
        name: "Phòng Đôi",
        roomName: "Phòng 302",
        description: "Phòng đôi view biển 1m6 có cửa sổ",
        status: "Trống",
        hourlyPrice: 300000,
        dailyPrice: 800000,
      },
    ],
  },
];

// Dữ liệu danh sách Phòng
const sampleRooms: Room[] = [
  {
    name: "P.101",
    typeName: "Phòng đơn",
    floor: "Tầng 1",
    hourlyPrice: 150,
    dailyPrice: 1000,
    status: "Đang hoạt động",
    description: "Phòng đơn view biển 1m8",
    penaltyPrice: 200,
    timeStart: "2023-12-01 00:00",
    cleanStatus: "Clean",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    roomDetail: [
      {
        name: "P.102",
        typeName: "Phòng đơn",
        floor: "Tầng 1",
        hourlyPrice: 150,
        dailyPrice: 1000,
        status: "Đang hoạt động",
        description: "Phòng đơn có cửa sổ",
        penaltyPrice: 200,
        timeStart: "2023-12-01 00:00",
        cleanStatus: "Clean",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
      },
    ],
    roomBooking: [
      {
        bookingId: "BK0001",
        bookingTime: "2023-12-02 00:00",
        bookingEmployee: "Alice",
        bookingTotal: 1200,
        bookingStatus: "Đang xử lý",
      },
    ],
    roomPayment: [
      {
        invoiceId: "BL0001",
        invoiceTime: "2023-12-02 00:00",
        invoiceEmployee: "Bob",
        invoiceStatus: "Hoàn thành",
        invoiceTotal: 1200,
      },
    ],
  },
  {
    name: "P.102",
    typeName: "Phòng đôi",
    floor: "Tầng 2",
    hourlyPrice: 50,
    dailyPrice: 300,
    status: "Đang hoạt động",
    description: "Phòng đôi view biển 1m6",
    penaltyPrice: 100,
    timeStart: "2023-11-15 09:00",
    cleanStatus: "Cleaning",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    roomDetail: [
      {
        name: "P.102",
        typeName: "Single",
        floor: "Tầng 2",
        hourlyPrice: 50,
        dailyPrice: 300,
        status: "Đang hoạt động",
        description: "Phòng đôi view biển 1m6 có cửa sổ",
        penaltyPrice: 100,
        timeStart: "2023-11-15 00:00",
        cleanStatus: "Cleaning",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
      },
    ],
    roomBooking: [],
    roomPayment: [],
  },
  {
    name: "P.103",
    typeName: "Phòng đôi",
    floor: "Tầng 3",
    hourlyPrice: 80,
    dailyPrice: 600,
    status: "Đang hoạt động",
    description: "Phòng đôi đầy đủ tiện nghi",
    penaltyPrice: 150,
    timeStart: "2023-12-05 10:30",
    cleanStatus: "Dirty",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Deluxe",
    roomDetail: [
      {
        name: "P.103",
        typeName: "Double",
        floor: "Tầng 3",
        hourlyPrice: 80,
        dailyPrice: 600,
        status: "Đang hoạt động",
        description: "Phòng đôi đầy đủ tiện nghi",
        penaltyPrice: 150,
        timeStart: "2023-12-05 10:30",
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
    name: "P.104",
    typeName: "Phòng đơn",
    floor: "Tầng 4",
    hourlyPrice: 120,
    dailyPrice: 800,
    status: "Đang hoạt động",
    description: "Phòng đơn đầy đủ tiện nghi",
    penaltyPrice: 180,
    timeStart: "2023-10-20 08:00",
    cleanStatus: "Clean",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
    roomDetail: [
      {
        name: "P.104",
        typeName: "Phòng đơn",
        floor: "Tầng 4",
        hourlyPrice: 120,
        dailyPrice: 800,
        status: "Đang hoạt động",
        description: "Phòng đơn đầy đủ tiện nghi",
        penaltyPrice: 180,
        timeStart: "2023-10-20 08:00",
        cleanStatus: "Clean",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Standard",
      },
    ],
    roomBooking: [],
    roomPayment: [],
  },
  {
    name: "P.105",
    typeName: "Phòng đôi",
    floor: "Tầng 10",
    hourlyPrice: 300,
    dailyPrice: 2500,
    status: "Đang hoạt động",
    description: "Phòng đôi có cửa sổ",
    penaltyPrice: 500,
    timeStart: "2023-12-10 11:00",
    cleanStatus: "Clean",
    imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Suite",
    roomDetail: [
      {
        name: "P.105",
        typeName: "Luxury",
        floor: "Tầng 10",
        hourlyPrice: 300,
        dailyPrice: 2500,
        status: "Đang hoạt động",
        description: "Phòng đôi có cửa sổ",
        penaltyPrice: 500,
        timeStart: "2023-12-10 11:00",
        cleanStatus: "Clean",
        imageUrl: "https://via.placeholder.com/300x200?text=Phòng+Suite",
      },
    ],
    roomBooking: [
      {
        bookingId: "B003",
        bookingTime: "2023-12-12 16:00",
        bookingEmployee: "David",
        bookingTotal: 3000,
        bookingStatus: "Đang xử lý",
      },
    ],
    roomPayment: [
      {
        invoiceId: "P002",
        invoiceTime: "2023-12-12 17:00",
        invoiceEmployee: "Eve",
        invoiceStatus: "Đang xử lý",
        invoiceTotal: 3000,
      },
    ],
  },
];

const RoomTypeList = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      const allIds = sampleRoomTypes.map((roomType) => roomType.typeId);
      setSelectedIds(allIds);
      setIsAllSelected(true);
    }
  };

  // Cập nhật trạng thái checkbox chọn tất cả
  React.useEffect(() => {
    setIsAllSelected(selectedIds.length === sampleRoomTypes.length);
  }, [selectedIds]);

  const handleSave = (data: any) => {
    console.log("Dữ liệu đã lưu:", data);
    setIsModalVisible(false);
  };

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
        <div key={roomType.typeId}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => handleExpandChange(roomType.typeId)}
          >
            <Checkbox
              checked={selectedIds.includes(roomType.typeId)}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(roomType.typeId);
              }}
              style={{ width: "5%" }}
            />
            <div style={{ width: "20%", fontSize: "13px" }}>
              {roomType.typeId}
            </div>
            <div style={{ width: "30%", fontSize: "13px" }}>
              {roomType.name}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {roomType.count}
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
          {expandedIds.includes(roomType.typeId) && (
            <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
              <Tabs defaultActiveKey="1">
                {/* Tab: Thông tin */}
                <TabPane tab="Thông tin" key="1">
                  <div style={{ display: "flex", gap: "20px" }}>
                    {/* Phần 1: Ảnh */}
                    <div style={{ width: "35%" }}>
                      <img
                        src={roomType.imageUrl}
                        alt={roomType.name}
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
                        <strong>Mã hạng phòng:</strong> {roomType.typeId}
                      </p>
                      <p>
                        <strong>Tên hạng phòng:</strong> {roomType.name}
                      </p>
                      <p>
                        <strong>Số lượng phòng:</strong> {roomType.count}
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
                        <strong>Phụ thu quá giờ:</strong> 20/h
                      </p>
                    </div>

                    {/* Phần 3: Sức chứa và mô tả */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Sức chứa tối đa:</strong> {roomType.maxAdults}
                        {", "}
                        {roomType.maxChildren}
                      </p>

                      <p>
                        <strong>Mô tả:</strong> {roomType.description}
                      </p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ marginTop: "10px", textAlign: "end" }}>
                    <button
                      onClick={() => setIsModalVisible(true)}
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
                    <UpdateTypeRoom
                      visible={isModalVisible}
                      onClose={() => setIsModalVisible(false)}
                      onSave={handleSave}
                    />
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
                          "Hạng phòng",
                          "Tên phòng",
                          "Mô tả",
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
                        <tr key={roomType.name}>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {roomType.name}
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
                            {roomType.description}
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
          <strong>Mô tả</strong>
        </div>
      </div>

      {/* Room */}
      {sampleRooms.map((room) => (
        <div key={room.name}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => handleExpandChange(room.name)}
          >
            <Checkbox
              checked={selectedIds.includes(room.name)}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(room.name);
              }}
              style={{ width: "5%" }}
            />
            <div style={{ width: "20%", fontSize: "13px" }}>{room.name}</div>
            <div style={{ width: "30%", fontSize: "13px" }}>
              {room.typeName}
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
                color: room.status === "Ngừng hoạt động" ? "red" : "green",
              }}
            >
              {room.status}
            </div>
            <div style={{ width: "30%", fontSize: "13px" }}>
              {room.description}
            </div>
          </div>

          {/* Expanded Row */}
          {expandedIds.includes(room.name) && (
            <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
              <Tabs defaultActiveKey="1">
                {/* Tab: Thông tin */}
                <TabPane tab="Thông tin" key="1">
                  <div style={{ display: "flex", gap: "20px" }}>
                    {/* Phần 1: Ảnh */}
                    <div style={{ width: "35%" }}>
                      <img
                        src={room.imageUrl}
                        alt={room.name}
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
                        <strong>Tên phòng:</strong> {room.name}
                      </p>
                      <p>
                        <strong>Hạng phòng:</strong> {room.typeName}
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
                        <strong>Bắt đầu sử dụng:</strong> {room.timeStart}
                      </p>
                      <p>
                        <strong>Vệ sinh:</strong> {room.cleanStatus}
                      </p>
                      <p>
                        <strong>Mô tả:</strong> {room.description}
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
                      Ngừng hoạt động
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
                          <tr key={payment.invoiceId}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.invoiceId}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.invoiceTime}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.invoiceEmployee}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                                color:
                                  payment.invoiceStatus === "Đang xử lý"
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {payment.invoiceStatus}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.invoiceTotal.toLocaleString("vi-VN")}
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
// TÔM ĂN CỨT
