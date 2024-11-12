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
}

const roomStatus = ["Available", "Booked"];

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
  const [selectedBookedRoom, setSelectedBookedRoom] = useState<
    Room | undefined
  >(undefined);

  useEffect(() => {
    const mockData: Room[] = [
      {
        room_id: "1",
        room_name: "Room 101",
        status: "available",
        floor: 1,
        type_id: "single",
        check_in_time: "",
        check_out_time: "",
        cleaning_status: "clean",
        current_guest: "",
        note: "",
        price_override: 100,
      },
      {
        room_id: "2",
        room_name: "Room 102",
        status: "booked",
        floor: 1,
        type_id: "double",
        check_in_time: "2024-11-07 10:00",
        check_out_time: "2024-11-08 10:00",
        cleaning_status: "dirty",
        current_guest: "John Doe",
        note: "Ghi chú",
        price_override: 120,
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

    const availableRoom = mockData.filter(
      (room) => room.status === "available"
    ).length;
    setAvailableRoomNumber(availableRoom);

    setRoomsList(mockData);
  }, []);

  const handleRoomClick = (room: Room) => {
    if (room.status === "available") {
      setSelectedRoom(room);
      setIsModalOpen(true);
    } else if (room.status === "booked") {
      setSelectedBookedRoom(room);
      setIsRoomBookedOpen(true);
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
      {isRoomBookedOpen && selectedBookedRoom && (
        <RoomBooked
          isModalOpen={isRoomBookedOpen}
          setIsModalOpen={setIsRoomBookedOpen}
          roomData={{
            roomName: selectedBookedRoom.room_name,
            roomType: selectedBookedRoom.type_id, // Assuming type_id is the room type
            guest: selectedBookedRoom.current_guest,
            checkInTime: selectedBookedRoom.check_in_time,
            checkOutTime: selectedBookedRoom.check_out_time,
            numGuests: 1, // Replace with the actual number of guests if available
            priceOverride: selectedBookedRoom.price_override || 0, // Assuming a default value if not available
          }}
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
                  status === "Booked" ? "bg-[#D9D9D9]" : "bg-[#4DE804]"
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
          <PlusOutlined /> Add Room
        </Button>
      </div>

      <div>
        {floor.map((item, index) => {
          return (
            <div key={index}>
              <div className="flex items-end px-[50px] mt-4">
                <h1 className="text-[30px] font-semibold w-[120px]">
                  {item.label}
                </h1>
                <div className="h-[1px] w-full bg-black"></div>
              </div>
              <div className="flex flex-wrap mt-4 px-[50px]">
                {item.children.map((room, index) => {
                  return (
                    <Card
                      onClick={() => handleRoomClick(room)}
                      key={index}
                      title={room.room_name}
                      className={`w-[15%] mr-4 cursor-pointer ${
                        room.status === "booked"
                          ? "bg-[#D9D9D9]"
                          : "bg-[#4DE804]"
                      }`}
                    >
                      <p>
                        <label className="mr-2 font-medium">Clean:</label>
                        <span className="mr-1">{room.cleaning_status}</span>
                        {room.cleaning_status === "clean" ? (
                          <CheckCircleOutlined />
                        ) : (
                          <CloseCircleOutlined />
                        )}
                      </p>
                      <p className="mr-2">
                        <label className="mr-2 font-medium">Room: </label>
                        <span>{room.status}</span>
                      </p>
                      <p>
                        <label className="mr-2 font-medium">Price:</label>
                        <span className="mr-1">{room.price_override}</span>
                        <MoneyCollectOutlined />
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
