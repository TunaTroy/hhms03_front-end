"use client";

import React, { useState } from "react";
import { Layout, Menu, Table, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Header, Content, Sider } = Layout;

interface InvoiceData {
  key: string;
  invoiceId: string;
  time: string;
  roomName: string;
  customer: string;
  totalAmount: number;
  discount: number;
  amountPaid: number;
}

const sampleData: InvoiceData[] = [
  // Dữ liệu mẫu ở đây...
];

export default function PaymentPage() {
  const [data, setData] = useState<InvoiceData[]>(sampleData);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleCheckboxChange = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const columns: ColumnsType<InvoiceData> = [
    {
      title: <Checkbox />,
      dataIndex: "checkbox",
      key: "checkbox",
      render: (text, record) => (
        <Checkbox
          checked={selectedKeys.includes(record.key)}
          onChange={() => handleCheckboxChange(record.key)}
        />
      ),
      width: "5%",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "invoiceId",
      key: "invoiceId",
      width: "15%",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: "20%",
    },
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
      width: "10%",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: "20%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => text.toLocaleString("vi-VN"),
      width: "10%",
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      render: (text) => text.toLocaleString("vi-VN"),
      width: "10%",
    },
    {
      title: "Khách đã trả",
      dataIndex: "amountPaid",
      key: "amountPaid",
      render: (text) => text.toLocaleString("vi-VN"),
      width: "10%",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
     

      <Layout>
        {/* Content */}
        <Layout style={{ padding: "20px" }}>
          <Content
            style={{
              backgroundColor: "#C0C0C0",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
              Hóa đơn
            </h2>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              style={{ backgroundColor: "#fff", borderRadius: "8px" }}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
