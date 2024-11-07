"use client";

import { Modal, Input, Button } from "antd";
import { FC } from "react";

interface RoomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  roomData?: {
    room_name: string;
    status: string;
    floor: number;
    check_in_time: string;
    check_out_time: string;
    cleaning_status: string;
    current_guest: string;
    note: string;
    price_override: number;
  };
}

const RoomModal: FC<RoomModalProps> = ({ isModalOpen, setIsModalOpen, roomData }) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Đặt/Nhận phòng nhanh"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      {roomData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', backgroundColor: '#d4f7ce', padding: '8px', borderRadius: '4px' }}>
            <div style={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Hạng phòng</div>
            <div style={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Phòng</div>
            <div style={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Hình thức</div>
            <div style={{ width: '18%', textAlign: 'center', fontWeight: 'bold' }}>Nhận phòng</div>
            <div style={{ width: '18%', textAlign: 'center', fontWeight: 'bold' }}>Trả phòng</div>
            <div style={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Dự kiến</div>
            <div style={{ width: '12%', textAlign: 'center', fontWeight: 'bold' }}>Thành tiền</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              style={{ width: '12%', textAlign: 'center' }}
              value={`Hạng phòng ${roomData.floor}`}
              readOnly
            />
            <Input style={{ width: '12%', textAlign: 'center' }} value={roomData.room_name} />
            <Input style={{ width: '12%', textAlign: 'center' }} value="Giờ" />
            <Input style={{ width: '18%', textAlign: 'center' }} value={roomData.check_in_time || "N/A"} />
            <Input style={{ width: '18%', textAlign: 'center' }} value={roomData.check_out_time || "N/A"} />
            <Input style={{ width: '12%', textAlign: 'center' }} value="129 Giờ" />
            <Input style={{ width: '12%', textAlign: 'center' }} value={`$${roomData.price_override}`} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Button type="dashed">Chọn thêm phòng</Button>
            <div style={{ width: '28%', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px', textAlign: 'right' }}>
              <p>Khách cần trả: <strong>2,500,000</strong></p>
              <p>Khách thanh toán: 0</p>
            </div>
          </div>
          <Input.TextArea placeholder="Ghi chú" value={roomData.note || "Nhập ghi chú..."} style={{ marginTop: '16px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>Nhận phòng</Button>
            <Button type="default" style={{ backgroundColor: '#FF9800', borderColor: '#FF9800' }}>Đặt trước</Button>
          </div>
        </div>
      ) : (
        <p>No room data available.</p>
      )}
    </Modal>
  );
};

export default RoomModal;