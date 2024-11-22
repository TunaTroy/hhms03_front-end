"use client";

import { Button, Card } from "antd";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import RoomModal from "@/components/roomModal";
import RoomBooked from "@/components/roomBooked";
import RoomUsing from "@/components/roomUsing";
import RoomFinal from "@/components/roomFinal";

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

const roomStatus = ["Available", "Booked", "Using", "Time's Up"];

export default function HomePage() {
  const { data: session } = useSession();
  const [RoomsList, setRoomsList] = useState<Room[]>([]);
  const [floor, setFloor] = useState<{ label: string; children: Room[] }[]>([
    { label: "Floor 1", children: [] },
    { label: "Floor 2", children: [] },
    { label: "Floor 3", children: [] },
    { label: "Floor 4", children: [] },
    { label: "Floor 5", children: [] },
    { label: "Floor 6", children: [] },
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [isRoomBookedOpen, setIsRoomBookedOpen] = useState(false);
  const [isRoomUsingOpen, setIsRoomUsingOpen] = useState(false);
  const [isRoomFinalOpen, setIsRoomFinalOpen] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState<Room | undefined>(
    undefined
  );
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const mockData: Room[] = [
      {
        room_id: "1",
        room_name: "Room 101",
        status: "available",
        floor: 1,
        type_id: "Single",
        check_in_time: "",
        check_out_time: "",
        cleaning_status: "clean",
        current_guest: "",
        note: "",
        price_override: 100,
        num_guests: 0,
        num_papers: 0,
        stay_duration: "",
        check_in_notice: "",
      },
      {
        room_id: "2",
        room_name: "Room 102",
        status: "booked",
        floor: 1,
        type_id: "Double",
        check_in_time: "2024-11-07 10:00",
        check_out_time: "2024-11-08 10:00",
        cleaning_status: "dirty",
        current_guest: "John Doe",
        note: "Anh đạt đẹp trai nhất vũ trụ",
        price_override: 500,
        num_guests: 2,
        num_papers: 2,
        stay_duration: "1 day",
        check_in_notice: "Check-in at 10:00",
      },
      {
        room_id: "3",
        room_name: "Room 103",
        status: "Using",
        floor: 1,
        type_id: "VIP",
        check_in_time: "2024-11-23 12:00",
        check_out_time: "2024-11-28 12:00",
        cleaning_status: "clean",
        current_guest: "Troy",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "5 days",
        check_in_notice: "Check-in at 12:00",
      },
      {
        room_id: "4",
        room_name: "Room 104",
        status: "Time's Up",
        floor: 1,
        type_id: "VIP",
        check_in_time: "2024-11-28 21:00",
        check_out_time: "2024-11-28 23:00",
        cleaning_status: "clean",
        current_guest: "Tao dep trai",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "2 hours",
        check_in_notice: "Còn 2 giờ",
      },
      {
        room_id: "5",
        room_name: "Room 105",
        status: "available",
        floor: 1,
        type_id: "Single",
        check_in_time: "",
        check_out_time: "",
        cleaning_status: "clean",
        current_guest: "",
        note: "",
        price_override: 100,
        num_guests: 0,
        num_papers: 0,
        stay_duration: "",
        check_in_notice: "",
      },
      {
        room_id: "6",
        room_name: "Room 106",
        status: "Using",
        floor: 1,
        type_id: "Double",
        check_in_time: "2024-11-07 10:00",
        check_out_time: "2024-11-08 10:00",
        cleaning_status: "dirty",
        current_guest: "John Doe",
        note: "",
        price_override: 500,
        num_guests: 2,
        num_papers: 2,
        stay_duration: "1 day",
        check_in_notice: "Check-in at 10:00",
      },
      {
        room_id: "7",
        room_name: "Room 201",
        status: "booked",
        floor: 2,
        type_id: "VIP",
        check_in_time: "2024-11-23 12:00",
        check_out_time: "2024-11-28 12:00",
        cleaning_status: "clean",
        current_guest: "Troy",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "5 days",
        check_in_notice: "Check-in at 12:00",
      },
      {
        room_id: "8",
        room_name: "Room 202",
        status: "Time's Up",
        floor: 2,
        type_id: "VIP",
        check_in_time: "2024-11-28 21:00",
        check_out_time: "2024-11-28 23:00",
        cleaning_status: "clean",
        current_guest: "Tao dep trai",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "2 hours",
        check_in_notice: "Còn 2 giờ",
      },
      {
        room_id: "9",
        room_name: "Room 203",
        status: "Time's Up",
        floor: 2,
        type_id: "VIP",
        check_in_time: "2024-11-28 21:00",
        check_out_time: "2024-11-28 23:00",
        cleaning_status: "clean",
        current_guest: "Tao dep trai",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "2 hours",
        check_in_notice: "Còn 2 giờ",
      },
      {
        room_id: "10",
        room_name: "Room 204",
        status: "available",
        floor: 2,
        type_id: "Single",
        check_in_time: "",
        check_out_time: "",
        cleaning_status: "clean",
        current_guest: "",
        note: "",
        price_override: 100,
        num_guests: 0,
        num_papers: 0,
        stay_duration: "",
        check_in_notice: "",
      },
      {
        room_id: "11",
        room_name: "Room 205",
        status: "booked",
        floor: 2,
        type_id: "Double",
        check_in_time: "2024-11-07 10:00",
        check_out_time: "2024-11-08 10:00",
        cleaning_status: "dirty",
        current_guest: "John Doe",
        note: "",
        price_override: 500,
        num_guests: 2,
        num_papers: 2,
        stay_duration: "1 day",
        check_in_notice: "Check-in at 10:00",
      },
      {
        room_id: "12",
        room_name: "Room 206",
        status: "Using",
        floor: 2,
        type_id: "VIP",
        check_in_time: "2024-11-23 12:00",
        check_out_time: "2024-11-28 12:00",
        cleaning_status: "clean",
        current_guest: "Troy",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "5 days",
        check_in_notice: "Check-in at 12:00",
      },
      {
        room_id: "13",
        room_name: "Room 301",
        status: "available",
        floor: 3,
        type_id: "Single",
        check_in_time: "",
        check_out_time: "",
        cleaning_status: "clean",
        current_guest: "",
        note: "",
        price_override: 100,
        num_guests: 0,
        num_papers: 0,
        stay_duration: "",
        check_in_notice: "",
      },
      {
        room_id: "14",
        room_name: "Room 302",
        status: "booked",
        floor: 3,
        type_id: "Double",
        check_in_time: "2024-11-07 10:00",
        check_out_time: "2024-11-08 10:00",
        cleaning_status: "dirty",
        current_guest: "John Doe",
        note: "",
        price_override: 500,
        num_guests: 2,
        num_papers: 2,
        stay_duration: "1 day",
        check_in_notice: "Check-in at 10:00",
      },
      {
        room_id: "15",
        room_name: "Room 303",
        status: "Using",
        floor: 4,
        type_id: "VIP",
        check_in_time: "2024-11-23 12:00",
        check_out_time: "2024-11-28 12:00",
        cleaning_status: "clean",
        current_guest: "Troy",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "5 days",
        check_in_notice: "Check-in at 12:00",
      },
      {
        room_id: "16",
        room_name: "Room 304",
        status: "Time's Up",
        floor: 3,
        type_id: "VIP",
        check_in_time: "2024-11-28 21:00",
        check_out_time: "2024-11-28 23:00",
        cleaning_status: "clean",
        current_guest: "Tao dep trai",
        note: "",
        price_override: 600,
        num_guests: 1,
        num_papers: 1,
        stay_duration: "2 hours",
        check_in_notice: "Còn 2 giờ",
      },
      {
        room_id: "17",
        room_name: "Room 505",
        status: "available",
        floor: 5,
        type_id: "Single",
        check_in_time: "",
        check_out_time: "",
        cleaning_status: "clean",
        current_guest: "",
        note: "",
        price_override: 100,
        num_guests: 0,
        num_papers: 0,
        stay_duration: "",
        check_in_notice: "",
      },
      {
        room_id: "18",
        room_name: "Room 606",
        status: "Using",
        floor: 6,
        type_id: "Double",
        check_in_time: "2024-11-07 10:00",
        check_out_time: "2024-11-08 10:00",
        cleaning_status: "dirty",
        current_guest: "John Doe",
        note: "",
        price_override: 500,
        num_guests: 2,
        num_papers: 2,
        stay_duration: "1 day",
        check_in_notice: "Check-in at 10:00",
      },
    ];

    const categorizedFloors = [
      {
        label: "Floor 1",
        children: mockData.filter((room) => room.floor === 1),
      },
      {
        label: "Floor 2",
        children: mockData.filter((room) => room.floor === 2),
      },
      {
        label: "Floor 3",
        children: mockData.filter((room) => room.floor === 3),
      },
      {
        label: "Floor 4",
        children: mockData.filter((room) => room.floor === 4),
      },
      {
        label: "Floor 5",
        children: mockData.filter((room) => room.floor === 5),
      },
      {
        label: "Floor 6",
        children: mockData.filter((room) => room.floor === 6),
      },
    ];

    setFloor(categorizedFloors);
    setRoomsList(mockData);
  }, []);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setSelectedRoomData(room);

    if (room.status === "available") {
      setIsModalOpen(true);
    } else if (room.status === "booked") {
      setIsRoomBookedOpen(true);
    } else if (room.status === "Using") {
      setIsRoomUsingOpen(true);
    } else if (room.status === "Time's Up") {
      setIsRoomFinalOpen(true);
    }
  };

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
  };

  const filteredRooms =
    selectedStatus === "All"
      ? RoomsList
      : RoomsList.filter(
          (room) => room.status.toLowerCase() === selectedStatus.toLowerCase()
        );

  const availableRoomCount = RoomsList.filter(
    (room) => room.status.toLowerCase() === "available"
  ).length;
  const bookedRoomCount = RoomsList.filter(
    (room) => room.status.toLowerCase() === "booked"
  ).length;
  const usingRoomCount = RoomsList.filter(
    (room) => room.status.toLowerCase() === "using"
  ).length;
  const timeUpRoomCount = RoomsList.filter(
    (room) => room.status.toLowerCase() === "time's up"
  ).length;

  // setting status Clean of Room
  const handleCleaningStatusChange = (room: Room) => {
    const updatedRooms = RoomsList.map((r) =>
      r.room_id === room.room_id
        ? {
            ...r,
            cleaning_status: r.cleaning_status === "clean" ? "dirty" : "clean",
          }
        : r
    );
    setRoomsList(updatedRooms);
  };

  return (
    <div className="bg-[#F0F2F5]">
      {isModalOpen && selectedRoom && (
        <RoomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          roomData={selectedRoom}
        />
      )}
      {isRoomBookedOpen && selectedRoomData && (
        <RoomBooked
          isModalOpen={isRoomBookedOpen}
          setIsModalOpen={setIsRoomBookedOpen}
          roomData={selectedRoomData}
        />
      )}
      {isRoomUsingOpen && selectedRoomData && (
        <RoomUsing
          isModalOpen={isRoomUsingOpen}
          setIsModalOpen={setIsRoomUsingOpen}
          roomData={selectedRoomData}
        />
      )}
      {isRoomFinalOpen && selectedRoomData && (
        <RoomFinal
          isModalOpen={isRoomFinalOpen}
          setIsModalOpen={setIsRoomFinalOpen}
          roomData={selectedRoomData}
        />
      )}
     
      <div className="flex w-full justify-between items-center h-[100px]">
        <div className="flex justify-between items-center">
          {["All", "Available", "Booked", "Using", "Time's Up"].map(
            (status, index) => (
              <div
                className="flex justify-between items-center bg-white p-2 rounded-2xl shadow mr-5 cursor-pointer"
                key={index}
                onClick={() => handleStatusClick(status)}
              >
                <div
                  className={`w-4 h-4 mr-2 ${
                    status === "Booked"
                      ? "bg-[#FFA500]"
                      : status === "Using"
                      ? "bg-[#32CD32]"
                      : status === "Time's Up"
                      ? "bg-[#06BE92]"
                      : status === "Available"
                      ? "bg-[#D9D9D9]"
                      : "bg-[#D9D9D9]"
                  } rounded-full`}
                ></div>
                {status}{" "}
                {status === "All"
                  ? `(${RoomsList.length})`
                  : status === "Available"
                  ? `(${availableRoomCount})`
                  : status === "Booked"
                  ? `(${bookedRoomCount})`
                  : status === "Using"
                  ? `(${usingRoomCount})`
                  : status === "Time's Up"
                  ? `(${timeUpRoomCount})`
                  : ""}
              </div>
            )
          )}
        </div>
      </div>
      <div>
        {floor.map((item) => (
          <div key={item.label}>
            <div className="flex items-end px-[50px] mt-4">
              <h1 className="text-[30px] font-semibold w-[120px]">
                {item.label}
              </h1>
              <div className="h-[1px] w-full bg-black"></div>
            </div>
            <div className="flex flex-wrap mt-4 px-[50px]">
              {filteredRooms
                .filter((room) => room.floor === item.children[0]?.floor) // Lọc các phòng chỉ cho tầng hiện tại
                .map((room) => (
                  <Card
                    onClick={() => handleRoomClick(room)}
                    key={room.room_id}
                    title={
                      <h2 className="text-[24px] font-bold">
                        {room.room_name}
                      </h2>
                    }
                    className={`w-[15%] mr-4 cursor-pointer ${
                      room.status === "booked"
                        ? "bg-[#FFA500]"
                        : room.status === "Using"
                        ? "bg-[#32CD32]"
                        : room.status === "Time's Up"
                        ? "bg-[#06BE92]"
                        : "bg-[#D9D9D9]"
                    }`}
                  >
                    <p>
                      <label className="mr-2 font-medium">Dọn dẹp:</label>
                      <span
                        className={`mr-1 font-bold cursor-pointer ${
                          room.cleaning_status === "clean"
                            ? "text-white"
                            : "text-red-800"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCleaningStatusChange(room);
                        }}
                      >
                        {room.cleaning_status.toLocaleUpperCase()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCleaningStatusChange(room);
                        }}
                      >
                        {room.cleaning_status === "clean" ? (
                          <CheckCircleOutlined className="text-white" />
                        ) : (
                          <CloseCircleOutlined className="text-red-800" />
                        )}
                      </button>
                    </p>
                    <p className="mr-2">
                      <label className="mr-2 font-medium">Trạng thái: </label>
                      <span>{room.status}</span>
                    </p>
                    <p>
                      <label className="mr-2 font-medium">Giá:</label>
                      <span className="mr-1">{room.price_override}</span>
                      <MoneyCollectOutlined />
                    </p>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}