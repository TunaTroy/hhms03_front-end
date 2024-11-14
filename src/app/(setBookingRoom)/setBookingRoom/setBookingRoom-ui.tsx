import React, { useState, useEffect } from 'react';

interface RoomBookingData {
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  numGuests: number;
}

const SetBookingRoomUI: React.FC = () => {
  const [bookingData, setBookingData] = useState<RoomBookingData>({
    roomNumber: '',
    checkInDate: '',
    checkOutDate: '',
    numGuests: 0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('bookingRoomData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lưu dữ liệu đặt phòng vào localStorage trước khi xử lý
    localStorage.setItem('bookingRoomData', JSON.stringify(bookingData));
    console.log(bookingData);
  };

  return (
    <div>
      <h1>Đặt Phòng</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomNumber">Số Phòng:</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={bookingData.roomNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="checkInDate">Ngày Nhận Phòng:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={bookingData.checkInDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="checkOutDate">Ngày Trả Phòng:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={bookingData.checkOutDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="numGuests">Số Khách:</label>
          <input
            type="number"
            id="numGuests"
            name="numGuests"
            value={bookingData.numGuests}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Đặt Phòng</button>
      </form>
    </div>
  );
};

export default SetBookingRoomUI;