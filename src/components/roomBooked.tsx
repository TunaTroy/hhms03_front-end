import { Modal, Input, Button, Select, DatePicker, List } from "antd";
import { FC, useState } from "react";
import moment, { Moment } from "moment";

const { Option } = Select;

interface RoomBookedProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData: {
    roomName: string;
    roomType: string;
    guest: string;
    checkInTime: string;
    checkOutTime: string;
    numGuests: number;
    note?: string;
    priceOverride: number;
  };
}

const RoomBooked: FC<RoomBookedProps> = ({
  isModalOpen,
  setIsModalOpen,
  roomData,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [checkInTime, setCheckInTime] = useState<Moment | null>(
    roomData.checkInTime ? moment(roomData.checkInTime) : null
  );
  const [checkOutTime, setCheckOutTime] = useState<Moment | null>(
    roomData.checkOutTime ? moment(roomData.checkOutTime) : null
  );

  const [note, setNote] = useState<string>(roomData.note || "");

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

  const handleUpdateBooking = () => {
    fetch("/api/update-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: roomData.roomName,
        checkInTime: checkInTime ? checkInTime.toISOString() : null,
        checkOutTime: checkOutTime ? checkOutTime.toISOString() : null,
        note,
      }),
    })
      .then((response) => {
        console.log("Booking updated successfully");
        handleClose();
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
      });
  };

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", fontSize: "18px", color: "#4CAF50" }}>Chi tiết đặt phòng</span>}
      open={isModalOpen}
      footer={null}
      onCancel={handleClose}
      width={1000}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
        {/* Input and suggestions for Customer Search */}
        <div style={{ width: "28%", textAlign: "left", position: "relative" }}>
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

        <div style={{ display: "flex", alignItems: "center", padding: "10px", border: "1px solid #d9d9d9", borderRadius: "4px", backgroundColor: "#f9f9f9" }}>
          <Input
            style={{ width: "12%", textAlign: "center" }}
            value={`Hạng phòng: ${roomData.roomType}`}
            readOnly
          />
          <Input
            style={{ width: "12%", textAlign: "center" }}
            value={roomData.roomName}
            readOnly
          />
          <div style={{ width: "12%", textAlign: "center" }}>
            <Select style={{ width: "100%" }} defaultValue="Giờ">
              <Option value="Giờ">Giờ</Option>
              <Option value="Ngày">Ngày</Option>
            </Select>
          </div>
          <div style={{ width: "18%", textAlign: "center" }}>
            <DatePicker
              showTime
              value={checkInTime}
              onChange={(date) => setCheckInTime(date)}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: "18%", textAlign: "center" }}>
            <DatePicker
              showTime
              value={checkOutTime}
              onChange={(date) => setCheckOutTime(date)}
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </div>
          <Input
            style={{ width: "12%", textAlign: "center" }}
            value={`${Math.ceil(((checkOutTime?.valueOf() || 0) - (checkInTime?.valueOf() || 0)) / (1000 * 60 * 60 * 24))} Ngày`}
            readOnly
          />
          <Input
            style={{ width: "14%", textAlign: "center" }}
            value={`$${roomData.priceOverride}`}
            readOnly
          />
        </div>

        <Input
          placeholder="Nhập ghi chú ..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "40%", marginTop: "16px", padding: "16px", textAlign: "left" }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <Button
            type="primary"
            style={{ backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
            onClick={handleUpdateBooking}
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
    </Modal>
  );
};

export default RoomBooked;
