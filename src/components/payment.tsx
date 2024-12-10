"use client";

import React, { useState, useEffect } from "react";
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
import ServicePay from "./servicePay"; // Import component ServicePay
import PenaltyPay from "./penaltyPay"; // Import component PenaltyPay

const { Option } = Select;

interface PaymentProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

interface RoomData {
  room_name: string;
  type_id: string;
  current_guest: string;
  check_in_time: string;
  check_out_time: string;
  num_guests: number;
  num_papers: number;
  room_id: string;
  stay_duration: string;
  check_in_notice: string;
  note: string;
  price_override: number;
  status: string;
}

interface InvoiceItem {
  key: string;
  item: string;
  type: string;
  quantity: string;
  unitPrice: number;
  total: number;
}

const Payment: React.FC<PaymentProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [selectedEmployee, setSelectedEmployee] =
    useState<string>("Chọn nhân viên");
  const [createdTime, setCreatedTime] = useState<moment.Moment | null>(
    moment()
  );
  const [discount, setDiscount] = useState<number>(0);
  const [otherFees, setOtherFees] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [totalService, setTotalService] = useState<number>(0);
  const [totalPenalty, setTotalPenalty] = useState<number>(0);
  const [showServicePay, setShowServicePay] = useState<boolean>(false);
  const [showPenaltyPay, setShowPenaltyPay] = useState<boolean>(false);

  useEffect(() => {
    const storedRoomData = localStorage.getItem("bookingRoomData");
    if (storedRoomData) {
      setRoomData(JSON.parse(storedRoomData));
    }
  }, []);

  const calculateEstimatedTime = () => {
    if (roomData?.check_in_time && roomData?.check_out_time) {
      const checkIn = moment(roomData.check_in_time);
      const checkOut = moment(roomData.check_out_time);
      const duration = checkOut.diff(checkIn, "hours");
      return `${duration} Giờ`;
    }
    return "0 Giờ";
  };

  const invoiceData: InvoiceItem[] = roomData
    ? [
        {
          key: "1",
          item: roomData.type_id,
          type: "Tiền phòng",
          quantity: calculateEstimatedTime(),
          unitPrice: roomData.price_override,
          total:
            roomData.price_override *
            parseInt(calculateEstimatedTime().split(" ")[0]),
        },
        {
          key: "2",
          item: "Nước lọc, Bò húc, Coca, Giặt",
          type: "Tiền dịch vụ",
          quantity: "4 dịch vụ", // Cần cập nhật số lượng dịch vụ
          unitPrice: totalService,
          total: totalService,
        },
        {
          key: "3",
          item: "Thiết bị, Đồ dùng, Nội quy",
          type: "Tiền phạt",
          quantity: "3",
          unitPrice: totalPenalty,
          total: totalPenalty,
        },
      ]
    : [];

  const columns: ColumnsType<InvoiceItem> = [
    {
      title: "Loại tiền",
      dataIndex: "type",
      key: "type",
      width: "20%",
    },
    {
      title: "Hạng mục",
      dataIndex: "item",
      key: "item",
      width: "32%",
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
      render: (text) => (text ? text.toLocaleString("vi-VN") : ""),
      width: "15%",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => text.toLocaleString("vi-VN"),
      width: "23%",
    },
  ];

  const total = invoiceData.reduce((sum, item) => sum + item.total, 0);
  const amountDue = total - discount - otherFees;

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveInvoice = () => {
    if (!roomData) {
      alert("Không có dữ liệu phòng!");
      return;
    }

    const invoice = {
      createdTime: createdTime?.format("DD/MM/YYYY HH:mm"),
      total,
      discount,
      otherFees,
      amountDue,
      paymentMethod,
      invoiceData,
    };

    try {
      localStorage.setItem("invoiceData", JSON.stringify(invoice));
      alert("Hóa đơn đã được lưu vào localStorage!");
    } catch (error) {
      console.error("Lỗi khi lưu hóa đơn:", error);
      alert("Có lỗi xảy ra khi lưu hóa đơn!");
    }
  };

  const handleRowClick = (record: InvoiceItem) => {
    if (record.type === "Tiền dịch vụ") {
      setShowServicePay(true);
    } else if (record.type === "Tiền phạt") {
      setShowPenaltyPay(true);
    }
  };

  return (
    <>
      <Modal
        title={<strong>Tạo hóa đơn mới</strong>}
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        width={1000}
        closeIcon={<CloseOutlined />}
        style={{
          position: "absolute",
          right: 0,
          top: "10%",
          height: "70vh",
        }}
        bodyStyle={{ height: "80vh" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div>
                <strong>{roomData?.room_name || "Phòng"}</strong>{" "}
                <span
                  style={{
                    backgroundColor:
                      roomData?.status === "Booked" ||
                      roomData?.status === "Using" ||
                      roomData?.status === "Time's Up"
                        ? "#E8F5E9"
                        : "#FFF8E1",
                    color:
                      roomData?.status === "Booked"
                        ? "#FFA500"
                        : roomData?.status === "Using"
                        ? "#32CD32"
                        : roomData?.status === "Time's Up"
                        ? "#06BE92"
                        : "#FFC107",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginLeft: "8px",
                  }}
                >
                  {roomData?.status || "Unknown"}
                </span>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={invoiceData}
              pagination={false}
              bordered
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
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

          <Col span={8}>
            <div style={{ marginBottom: "16px" }}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Select
                    style={{ width: "100%" }}
                    value={selectedEmployee}
                    onChange={(value) => setSelectedEmployee(value)}
                  >
                    <Option value="Chọn nhân viên">Chọn nhân viên</Option>
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
                padding: "24px",
                borderRadius: "4px",
                minHeight: "150px",
              }}
            >
              <Row justify="space-between" style={{ marginBottom: "12px" }}>
                <Col>Tổng cộng:</Col>
                <Col>
                  <strong>{total.toLocaleString("vi-VN")}</strong>
                </Col>
              </Row>
              <Row justify="space-between" style={{ marginBottom: "12px" }}>
                <Col>Giảm giá:</Col>
                <Col>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    style={{ width: "120px", textAlign: "right" }}
                  />
                </Col>
              </Row>
              <Row justify="space-between" style={{ marginBottom: "12px" }}>
                <Col>Thu khác:</Col>
                <Col>
                  <Input
                    type="number"
                    value={otherFees}
                    onChange={(e) => setOtherFees(Number(e.target.value))}
                    style={{ width: "120px", textAlign: "right" }}
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
                padding: "24px",
                borderRadius: "4px",
                minHeight: "150px",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <strong>Phương thức thanh toán</strong>
              </div>
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginBottom: "12px" }}
              >
                <Radio value="Cash">Tiền mặt</Radio>
                <Radio value="Transfer">Chuyển khoản</Radio>
              </Radio.Group>
              <Input
                prefix={<CreditCardOutlined />}
                value={amountDue.toLocaleString("vi-VN")}
                readOnly
                style={{ textAlign: "right", fontSize: "1.2em" }}
              />
            </div>

            <Button
              type="primary"
              style={{
                width: "100%",
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                marginTop: "56px",
              }}
              size="large"
              onClick={handleSaveInvoice}
            >
              Hoàn thành
            </Button>
          </Col>
        </Row>
      </Modal>

      {showServicePay && (
        <ServicePay
          onUpdateService={(newTotal) => {
            setTotalService(newTotal);
            setShowServicePay(false);
          }}
          onClose={() => setShowServicePay(false)}
        />
      )}

      {showPenaltyPay && (
        <PenaltyPay
          onUpdatePenalty={(newTotal) => {
            setTotalPenalty(newTotal);
            setShowPenaltyPay(false);
          }}
          onClose={() => setShowPenaltyPay(false)}
        />
      )}
    </>
  );
};

export default Payment;
