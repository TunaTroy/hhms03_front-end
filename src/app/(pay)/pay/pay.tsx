"use client";

import React, { useState } from "react";
import { Layout, Checkbox } from "antd";

const { Content } = Layout;

interface InvoiceData {
  key: string;
  invoiceId: string;
  time: string;
  roomName: string;
  customer: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  amountPaid: number;
}

const sampleInvoices: InvoiceData[] = [
  {
    key: "1",
    invoiceId: "HD000074",
    time: "16/12/2024 22:00",
    roomName: "P.101",
    customer: "Minh Hưng",
    totalAmount: 94025000,
    discount: 31000,
    finalAmount: 93994000,
    amountPaid: 93994000,
  },
  {
    key: "2",
    invoiceId: "HD000073",
    time: "16/12/2024 21:00",
    roomName: "P.102",
    customer: "Minh Hà",
    totalAmount: 13400000,
    discount: 5000,
    finalAmount: 13485000,
    amountPaid: 13485000,
  },
  // Thêm nhiều hóa đơn khác nếu cần
];

export default function InvoiceList() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleCheckboxChange = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Tính tổng cho các cột
  const totalAmounts = sampleInvoices.reduce(
    (totals, invoice) => {
      totals.total += invoice.totalAmount;
      totals.discount += invoice.discount;
      totals.final += invoice.finalAmount;
      totals.paid += invoice.amountPaid;
      return totals;
    },
    { total: 0, discount: 0, final: 0, paid: 0 }
  );

  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Content
        style={{
          backgroundColor: "#f9f9f9",
          padding: "10px 10px 20px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Hóa đơn</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #000",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "15%" }}>
            <strong>Mã hóa đơn</strong>
          </div>
          <div style={{ width: "15%" }}>
            <strong>Thời gian</strong>
          </div>
          <div style={{ width: "15%" }}>
            <strong>Tên phòng</strong>
          </div>
          <div style={{ width: "15%" }}>
            <strong>Khách hàng</strong>
          </div>
          <div style={{ width: "15%" }}>
            <strong>Tổng tiền hàng</strong>
          </div>
          <div style={{ width: "10%" }}>
            <strong>Giảm giá</strong>
          </div>
          <div style={{ width: "15%" }}>
            <strong>Tổng sau giảm giá</strong>
          </div>
          <div style={{ width: "15%" }}>
            <strong>Khách đã trả</strong>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #ccc",
            fontWeight: "bold",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "15%" }}></div>
          <div style={{ width: "15%" }}></div>
          <div style={{ width: "15%" }}></div>
          <div style={{ width: "15%" }}>Tổng cộng</div>
          <div style={{ width: "15%" }}>
            {totalAmounts.total.toLocaleString("vi-VN")}
          </div>
          <div style={{ width: "10%" }}>
            {totalAmounts.discount.toLocaleString("vi-VN")}
          </div>
          <div style={{ width: "15%" }}>
            {totalAmounts.final.toLocaleString("vi-VN")}
          </div>
          <div style={{ width: "15%" }}>
            {totalAmounts.paid.toLocaleString("vi-VN")}
          </div>
        </div>
        {sampleInvoices.map((invoice) => (
          <div
            key={invoice.key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <Checkbox
              checked={selectedKeys.includes(invoice.key)}
              onChange={() => handleCheckboxChange(invoice.key)}
              style={{ width: "5%" }}
            />
            <div style={{ width: "15%", fontSize: "13px" }}>
              {invoice.invoiceId}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>{invoice.time}</div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {invoice.roomName}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {invoice.customer}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {invoice.totalAmount.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "10%", fontSize: "13px" }}>
              {invoice.discount.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {invoice.finalAmount.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {invoice.amountPaid.toLocaleString("vi-VN")}
            </div>
          </div>
        ))}
      </Content>
    </Layout>
  );
}
