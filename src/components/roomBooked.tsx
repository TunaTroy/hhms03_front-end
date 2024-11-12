import React from 'react';

interface RoomBookedProps {
  roomName: string;
  roomType: string;
  guest: string;
  checkInTime: string;
  checkOutTime: string;
  numGuests: number;
  onClose: () => void;
}

const RoomBooked: React.FC<RoomBookedProps> = ({
  roomName,
  roomType,
  guest,
  checkInTime,
  checkOutTime,
  numGuests,
  onClose,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Chi tiết {roomName}</h2>
        <button style={styles.closeButton} onClick={onClose}>✖</button>
      </div>
      <div style={styles.roomInfo}>
        <h3 style={styles.roomType}>{roomType} <span style={styles.status}>Đã đặt trước</span></h3>
        <div style={styles.details}>
          <div>
            <p>Khách hàng</p>
            <p>{guest}</p>
          </div>
          <div>
            <p>Khách lưu trú</p>
            <p>{numGuests} người lớn, 0 trẻ em, 0 giường</p>
          </div>
          <div>
            <p>Mã đặt phòng</p>
            <p>DP000004</p>
          </div>
          <div>
            <p>Nhận phòng</p>
            <p>{checkInTime}</p>
          </div>
          <div>
            <p>Trả phòng</p>
            <p>{checkOutTime}</p>
          </div>
          <div>
            <p>Thời gian lưu trú</p>
            <p>24 giờ <span style={styles.highlight}>9 giờ nữa nhận phòng</span></p>
          </div>
        </div>
      </div>
      <div style={styles.footer}>
        <div>
          <p>Chưa có ghi chú</p>
        </div>
        <div style={styles.priceInfo}>
          <p>P.301</p>
          <p>1,800,000</p>
          <p>Khách đã trả: 0</p>
        </div>
        <div style={styles.buttons}>
          <button style={styles.editButton}>Sửa đặt phòng</button>
          <button style={styles.confirmButton}>Nhận phòng</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  roomInfo: {
    border: '1px solid #f0a500',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
  },
  roomType: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    backgroundColor: '#f0a500',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  highlight: {
    color: '#f0a500',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  priceInfo: {
    textAlign: 'right',
  },
  buttons: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RoomBooked;