"use client";

import React, { useState } from "react";
import { Modal, Input, Button, Row, Col } from "antd";

const servicesData = [
  { key: "1", name: "Bò húc", price: 10000 },
  { key: "2", name: "Coca", price: 10000 },
  { key: "3", name: "Nước lọc", price: 5000 },
  { key: "4", name: "Giặt giũ", price: 30000 },
];

export const ServicePay: React.FC<{
  onUpdateService: (total: number) => void;
  onClose: () => void;
}> = ({ onUpdateService, onClose }) => {
  const [services, setServices] = useState(servicesData.map(service => ({
    ...service,
    quantity: 0,
    total: 0
  })));

  const handleQuantityChange = (key: string, value: number) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.key === key ? { ...service, quantity: value, total: value * service.price } : service
      )
    );
  };

  const handleUpdate = () => {
    const totalService = services.reduce((sum, service) => sum + service.total, 0);
    onUpdateService(totalService);
    onClose();
  };

  return (
    <Modal
      title="Cập nhật tiền dịch vụ"
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
        {services.map(service => (
          <Row key={service.key} style={{ marginBottom: "8px", alignItems: "center" }}>
            <Col span={12}>
              <strong>{service.name}</strong> (Giá: {service.price.toLocaleString("vi-VN")} VNĐ)
            </Col>
            <Col span={12}>
              <Input
                type="number"
                min={0}
                placeholder="Số lượng"
                onChange={(e) => handleQuantityChange(service.key, Number(e.target.value))}
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

export default ServicePay;