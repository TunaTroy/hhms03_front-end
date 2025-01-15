// CancelShift.js
import React from 'react';
import { Modal, Button } from 'antd';

const CancelShift = ({ visible, onClose }) => {
  return (
    <Modal
      title="Hủy ca làm việc"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={() => { /* Logic hủy ca */ }}>
          Hủy ca
        </Button>,
      ]}
    >
      {/* Nội dung cho hủy ca */}
      <p>Xác nhận hủy ca làm việc.</p>
    </Modal>
  );
};

export default CancelShift;