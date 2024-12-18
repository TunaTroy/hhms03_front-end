"use client";

import React, { useState } from "react";
import { Layout, Checkbox } from "antd";

const { Content } = Layout;

interface InvoiceDetail {
  itemCode: string; // Mã hàng hóa
  itemName: string; // Tên hàng hóa
  quantity: number; // Số lượng
  unitPrice: number; // Đơn giá
  discount: number; // Giảm giá
  sellingPrice: number; // Giá bán
  totalPrice: number; // Thành tiền
}

interface InvoiceData {
  invoiceId: string;
  time: string;
  roomName: string;
  customer: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  amountPaid: number;
  details: InvoiceDetail[]; // Thêm chi tiết hóa đơn
}

const sampleInvoices: InvoiceData[] = [
  {
    invoiceId: "HD000074",
    time: "16/12/2024 22:00",
    roomName: "P.101",
    customer: "Minh Hưng",
    totalAmount: 94025000,
    discount: 31000,
    finalAmount: 93994000,
    amountPaid: 93994000,
    details: [
      {
        itemCode: "MH001", // Mã hàng hóa
        itemName: "Phòng 101 giường đôi và 1 giường đơn cho 3 người (Tháng)",
        quantity: 1,
        unitPrice: 94025000,
        discount: 1000, // Giảm giá
        sellingPrice: 93025000, // Giá bán
        totalPrice: 94025000,
      },
    ],
  },
  {
    invoiceId: "HD000073",
    time: "16/12/2024 21:00",
    roomName: "P.102",
    customer: "Minh Hà",
    totalAmount: 13400000,
    discount: 5000,
    finalAmount: 13485000,
    amountPaid: 13485000,
    details: [
      {
        itemCode: "MH002",
        itemName: "Phòng 102 giường đôi cho 2 người (Tháng)",
        quantity: 1,
        unitPrice: 13400000,
        discount: 5000,
        sellingPrice: 13350000,
        totalPrice: 13400000,
      },
    ],
  },
];

export default function InvoiceList() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const handleCheckboxChange = (invoiceId: string) => {
    setSelectedIds((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleExpandChange = (invoiceId: string) => {
    setExpandedIds((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

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
      <h2 style={{ fontWeight: "bold", fontSize: "28px" }}>Hóa đơn</h2>
      <Content
        style={{
          backgroundColor: "#f9f9f9",
          padding: "10px 10px 20px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #000",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ fontWeight: "medium", width: "15%" }}>
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

        {sampleInvoices.map((invoice) => (
          <div key={invoice.invoiceId}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => handleExpandChange(invoice.invoiceId)}
            >
              <Checkbox
                checked={selectedIds.includes(invoice.invoiceId)}
                onChange={() => handleCheckboxChange(invoice.invoiceId)}
                style={{ width: "5%" }}
              />
              <div style={{ width: "15%", fontSize: "13px" }}>
                {invoice.invoiceId}
              </div>
              <div style={{ width: "15%", fontSize: "13px" }}>
                {invoice.time}
              </div>
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
            {expandedIds.includes(invoice.invoiceId) && (
              <div style={{ padding: "10px", backgroundColor: "#F5F5DC" }}>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Thông tin hóa đơn:</strong>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Mã hóa đơn:</strong> {invoice.invoiceId}
                  <br />
                  <strong>Thời gian:</strong> {invoice.time}
                  <br />
                  <strong>Tên phòng:</strong> {invoice.roomName}
                  <br />
                  <strong>Khách hàng:</strong> {invoice.customer}
                  <br />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>Chi tiết hóa đơn:</strong>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#e6f7ff" }}>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Mã hàng hóa
                        </th>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Tên hàng hóa
                        </th>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Số lượng
                        </th>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Đơn giá
                        </th>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Giảm giá
                        </th>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Giá bán
                        </th>
                        <th
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                        >
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.details.map((detail, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.itemCode}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.itemName}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.quantity}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.unitPrice.toLocaleString("vi-VN")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.discount.toLocaleString("vi-VN")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.sellingPrice.toLocaleString("vi-VN")}
                          </td>
                          <td
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {detail.totalPrice.toLocaleString("vi-VN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span>Tổng tiền hàng: </span>
                  <strong>{invoice.totalAmount.toLocaleString("vi-VN")}</strong>
                  <br />
                  <span>Giảm giá: </span>
                  <strong>{invoice.discount.toLocaleString("vi-VN")}</strong>
                  <br />
                  <span>Tổng sau giảm giá: </span>
                  <strong>{invoice.finalAmount.toLocaleString("vi-VN")}</strong>
                  <br />
                  <span>Khách đã trả: </span>
                  <strong>{invoice.amountPaid.toLocaleString("vi-VN")}</strong>
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
            borderBottom: "1px solid #ccc",
            fontWeight: "bold",
            color: "#33CC66",
          }}
        >
          <div style={{ width: "5%" }}></div>
          <div style={{ width: "15%" }}></div>
          <div style={{ width: "15%" }}></div>
          <div style={{ width: "15%" }}></div>
          <div style={{ width: "15%" }}></div>
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
      </Content>
    </Layout>
  );
}
