// PenaltyPay.tsx
"use client";

import React, { useState } from "react";
import { Modal, Input, Button } from "antd";

const PenaltyPay: React.FC<{
  totalPenalty: number;
  onUpdatePenalty: (total: number) => void;
  onClose: () => void;
}> = ({ totalPenalty, onUpdatePenalty, onClose }) => {
  const [penaltyAmount, setPenaltyAmount] = useState<number>(totalPenalty);

  const handleUpdate = () => {
    onUpdatePenalty(penaltyAmount);
    onClose();
  };

  return (
    <Modal
      title="Cập nhật tiền phạt"
      visible={true}
      onCancel={onClose}
      footer={null}
      style={{
        position: "absolute",
        left: 5,
        top: "10%",
        height: "80vh",
      }}
    >
      <div>
        <h3>Tiền phạt</h3>
        <Input
          type="number"
          value={penaltyAmount}
          onChange={(e) => setPenaltyAmount(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <Button type="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
};

export default PenaltyPay;