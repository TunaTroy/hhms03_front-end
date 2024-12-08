"use client";

import React, { useState } from "react";
import {
  Modal,
  Input,
  DatePicker,
  Select,
  Table,
  Row,
  Col,
  Radio,
  Button,
} from "antd";
import { CloseOutlined, CreditCardOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

const { Option } = Select;

interface PaymentProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

interface InvoiceItem {
  key: string;
  item: string;
  quantity: string;
  unitPrice: number;
  total: number;
}

const Payment: React.FC<PaymentProps> = ({ isModalOpen, setIsModalOpen }) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const [selectedEmployee, setSelectedEmployee] =
    useState<string>("Chưa xác định");
  const [createdTime, setCreatedTime] = useState<moment.Moment | null>(
    moment()
  );
  const [discount, setDiscount] = useState<number>(0);
  const [otherFees, setOtherFees] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");

  const invoiceData: InvoiceItem[] = [
    {
      key: "1",
      item: "Phòng 01 giường đôi cho 2 người",
      quantity: "50 Giờ",
      unitPrice: 180000,
      total: 9000000,
    },
  ];

  const columns: ColumnsType<InvoiceItem> = [
    {
      title: "Chọn",
      dataIndex: "select",
      render: () => <Input type="checkbox" checked />,
      width: "5%",
    },
    {
      title: "Hạng mục",
      dataIndex: "item",
      key: "item",
      width: "40%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      width: "15%",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text) => text.toLocaleString("vi-VN"),
      width: "15%",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => text.toLocaleString("vi-VN"),
      width: "15%",
    },
  ];

  const total = invoiceData.reduce((sum, item) => sum + item.total, 0);
  const amountDue = total - discount - otherFees;

  return (
    <Modal
      title={<strong>Tạo hóa đơn mới</strong>}
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
      width={1000}
      closeIcon={<CloseOutlined />}
    >
      <Row gutter={[16, 16]}>
        {/* Table Section */}
        <Col span={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div>
              <strong>P.202</strong>{" "}
              <span style={{ color: "#999" }}>Đã trả</span>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={invoiceData}
            pagination={false}
            bordered
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={4}>
                  <strong>Tổng cộng</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0}>
                  <strong>{total.toLocaleString("vi-VN")}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
        </Col>

        {/* Summary Section */}
        <Col span={8}>
          <div style={{ marginBottom: "16px" }}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Select
                  style={{ width: "100%" }}
                  value={selectedEmployee}
                  onChange={(value) => setSelectedEmployee(value)}
                >
                  <Option value="Chưa xác định">Chưa xác định</Option>
                  <Option value="Nhân viên 1">Nhân viên 1</Option>
                  <Option value="Nhân viên 2">Nhân viên 2</Option>
                </Select>
              </Col>
              <Col span={12}>
                <DatePicker
                  showTime
                  value={createdTime}
                  onChange={(date) => setCreatedTime(date)}
                  format="DD/MM/YYYY HH:mm"
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </div>

          <div
            style={{
              marginBottom: "16px",
              backgroundColor: "#f9f9f9",
              padding: "16px",
              borderRadius: "4px",
            }}
          >
            <Row justify="space-between" style={{ marginBottom: "8px" }}>
              <Col>Tổng cộng:</Col>
              <Col>
                <strong>{total.toLocaleString("vi-VN")}</strong>
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: "8px" }}>
              <Col>Giảm giá:</Col>
              <Col>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  style={{ width: "100px", textAlign: "right" }}
                />
              </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: "8px" }}>
              <Col>Thu khác:</Col>
              <Col>
                <Input
                  type="number"
                  value={otherFees}
                  onChange={(e) => setOtherFees(Number(e.target.value))}
                  style={{ width: "100px", textAlign: "right" }}
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <strong>Còn cần trả:</strong>
              </Col>
              <Col>
                <strong style={{ color: "#4CAF50" }}>
                  {amountDue.toLocaleString("vi-VN")}
                </strong>
              </Col>
            </Row>
          </div>

          <div
            style={{
              marginBottom: "16px",
              backgroundColor: "#f9f9f9",
              padding: "16px",
              borderRadius: "4px",
            }}
          >
            <div style={{ marginBottom: "8px" }}>
              <strong>Phương thức thanh toán</strong>
            </div>
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginBottom: "8px" }}
            >
              <Radio value="Cash">Tiền mặt</Radio>
              <Radio value="Transfer">Chuyển khoản</Radio>
            </Radio.Group>
            <Input
              prefix={<CreditCardOutlined />}
              value={amountDue.toLocaleString("vi-VN")}
              readOnly
              style={{ textAlign: "right" }}
            />
          </div>

          <Button
            type="primary"
            style={{
              width: "100%",
              backgroundColor: "#4CAF50",
              borderColor: "#4CAF50",
            }}
            size="large"
          >
            Hoàn thành
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default Payment;
