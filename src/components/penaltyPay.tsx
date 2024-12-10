"use client";

import React, { useState } from "react";
import { Modal, Input, Button, Row, Col } from "antd";

const penaltyCategories = [
  { key: "1", name: "Thiết bị", note: "" },
  { key: "2", name: "Đồ dùng", note: "" },
  { key: "3", name: "Vi phạm nội quy", note: "" },
];

const PenaltyPay: React.FC<{
  onUpdatePenalty: (total: number) => void;
  onClose: () => void;
}> = ({ onUpdatePenalty, onClose }) => {
  const [penalties, setPenalties] = useState(
    penaltyCategories.map((item) => ({ ...item, total: 0, reason: "" }))
  );

  const handlePenaltyChange = (key: string, value: number) => {
    setPenalties((prevPenalties) =>
      prevPenalties.map((item) =>
        item.key === key ? { ...item, total: value } : item
      )
    );
  };

  const handleReasonChange = (key: string, value: string) => {
    setPenalties((prevPenalties) =>
      prevPenalties.map((item) =>
        item.key === key ? { ...item, reason: value } : item
      )
    );
  };

  const handleUpdate = () => {
    const totalPenalty = penalties.reduce((sum, item) => sum + item.total, 0);
    onUpdatePenalty(totalPenalty);
    onClose();
  };

  return (
    <Modal
      title="Cập nhật tiền phạt"
      visible={true}
      onCancel={onClose}
      footer={null}
      width={400} // Giảm kích thước modal
      style={{
        position: "absolute",
        left: 5,
        top: "10%",
      }}
    >
      <div>
        {penalties.map((item) => (
          <Row
            key={item.key}
            style={{ marginBottom: "8px", alignItems: "center" }}
          >
            <Col span={12}>
              <strong>{item.name}</strong>
            </Col>
            <Col span={12}>
              <Input
                type="text"
                min={0}
                placeholder="Số tiền phạt"
                onChange={(e) =>
                  handlePenaltyChange(item.key, Number(e.target.value))
                }
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={24} style={{ marginTop: 5 }}>
              <Input
                placeholder="Nhập lý do phạt"
                onChange={(e) => handleReasonChange(item.key, e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        ))}
      </div>
      <div style={{ marginTop: "16px" }}>
        <Button type="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
};

export default PenaltyPay;