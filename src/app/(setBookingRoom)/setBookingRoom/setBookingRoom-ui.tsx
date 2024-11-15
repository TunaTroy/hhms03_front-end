"use client";

import { Card } from 'antd';
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
    localStorage.setItem('bookingRoomData', JSON.stringify(bookingData));
    console.log(bookingData);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sửa Đặt Phòng</h1>
      <div style={styles.cards}>
        <Card style={styles.card1}>
          <h2 style={styles.cardHeader}>Khách hàng</h2>
          <div style={styles.formGroup}>
            <label htmlFor="roomNumber" style={styles.label}>Số Phòng:</label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={bookingData.roomNumber}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </Card>
        <Card style={styles.card2}>
          <h2 style={styles.cardHeader}>Hạng phòng</h2>
          <div style={styles.formGroup}>
            <label htmlFor="checkInDate" style={styles.label}>Ngày Nhận Phòng:</label>
            <input
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={bookingData.checkInDate}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="checkOutDate" style={styles.label}>Ngày Trả Phòng:</label>
            <input
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={bookingData.checkOutDate}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="numGuests" style={styles.label}>Số Khách:</label>
            <input
              type="number"
              id="numGuests"
              name="numGuests"
              value={bookingData.numGuests}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </Card>
        <Card style={styles.card3}>
          <h2 style={styles.cardHeader}>Thông tin phòng</h2>
          <div style={styles.formGroup}>
            <span>Phòng 103 - Hạng phòng 3</span>
            <span>Giá: 1,800,000 VND</span>
            <span>Thời gian: 30/09, 12:00 - 01/10, 12:00</span>
          </div>
        </Card>
      </div>
      <div style={styles.actions}>
        <button type="submit" style={styles.button}>Lưu</button>
        <button type="submit" style={styles.button}>Thanh toán</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '100%',
    margin: 'auto',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  card1: {
    backgroundColor: '#e0f7fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  card2: {
    backgroundColor: '#fff3e0',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  card3: {
    backgroundColor: '#f1f8e9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  formGroup: {
    marginBottom: '10px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default SetBookingRoomUI;