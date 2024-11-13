"use client";

import { Button, Card } from "antd";
import { signOut, useSession } from "next-auth/react";
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

interface Room {
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
  num_children: number; 
  num_papers: number; 
  stay_duration: string;
  check_in_notice: string; 
}

const roomStatus = ["Available", "Booked", "Using", "Time's Up"];

export default function HomePage() {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const [RoomsList, setRoomsList] = useState<Room[]>([]);
  const [floor, setFloor] = useState<{ label: string; children: Room[] }[]>([
    { label: "Floor 1", children: [] },
    { label: "Floor 2", children: [] },
  ]);
  const [availableRoomNumber, setAvailableRoomNumber] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [isRoomBookedOpen, setIsRoomBookedOpen] = useState(false);
  const [isRoomUsingOpen, setIsRoomUsingOpen] = useState(false);
  const [isRoomFinalOpen, setIsRoomFinalOpen] = useState(false);
  const [selectedRoomData, setSelectedRoomData] = useState<Room | undefined>(
    undefined
  );

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
        num_children: 0, 
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
        note: "",
        price_override: 500,
        num_guests: 2,
        num_children: 1, 
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
        num_children: 0, 
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
        num_children: 0, 
        num_papers: 1, 
        stay_duration: "2 hours", 
        check_in_notice: "Còn 2 giờ", 
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
    ];

    setFloor(categorizedFloors);
    const availableRoomCount = mockData.filter(
      (room) => room.status === "available"
    ).length;
    setAvailableRoomNumber(availableRoomCount);
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

  return (
    <div className="bg-[#F0F2F5] h-screen px-[20px]">
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
      <div className="flex w-full justify-between items-center h-[80px]">
        <div className="flex justify-between items-center">
          {roomStatus.map((status, index) => (
            <div
              className="flex justify-between w-[130px] items-center bg-white p-2 rounded-2xl shadow mr-5"
              key={index}
            >
              <div
                className={`w-4 h-4 ${
                  status === "Booked"
                    ? "bg-[#FFA500]"
                    : status === "Using"
                    ? "bg-[#32CD32]"
                    : status === "Time's Up"
                    ? "bg-[#06BE92]"
                    : "bg-[#D9D9D9]"
                } rounded-full`}
              ></div>
              {status}{" "}
              {availableRoomNumber
                ? status === "Available"
                  ? `(${availableRoomNumber})`
                  : `(${RoomsList.length - availableRoomNumber})`
                : null}
            </div>
          ))}
        </div>
        <Button type="primary" shape="round">
          <PlusOutlined /> Thêm phòng
        </Button>
      </div>
      <div>
        {floor.map((item, index) => (
          <div key={index}>
            <div className="flex items-end px-[50px] mt-4">
              <h1 className="text-[30px] font-semibold w-[120px]">
                {item.label}
              </h1>
              <div className="h-[1px] w-full bg-black"></div>
            </div>
            <div className="flex flex-wrap mt-4 px-[50px]">
              {item.children.map((room, index) => (
                <Card
                  onClick={() => handleRoomClick(room)}
                  key={index}
                  title={room.room_name}
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
                    <span className="mr-1">{room.cleaning_status}</span>
                    {room.cleaning_status === "clean" ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )}
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