"use client";

import React, { useState } from "react";
import { Layout, Checkbox, Tabs } from "antd";
import { inherits } from "util";
import Page from "@/app/page";

const { Content } = Layout;
const { TabPane } = Tabs;

interface customerData {
  customerId: string;
  name: string;
  sex: string;
  dob: string;
  address: string;
  phone: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  note: string;
  debt: number;
  total: number;
  final: number;
  detail: CustomerDetail[];
  paymentHistory: PaymentHistory[];
}

interface CustomerDetail {
  customerId: string;
  name: string;
  dob: string;
  email: string;
  phone: string;
  nation: string; // address => Quốc tịchovince
  province: string; // address => Tỉnh thành
  district: string; // address => Quận huyện
  ward: string; // address => Phường xã
  village: string; // address => Thôn, Làng, Địa chỉ cụ thể
  note: string;
}

interface PaymentHistory {
  invoiceId: string;
  time: string;
  employeeName: string;
  amount: number;
}

// Mock data
const sampleCustomers: customerData[] = [
  {
    customerId: "KH001",
    name: "Nguyễn Văn A",
    sex: "Nam",
    dob: "1990-05-15",
    address: "Hà Nội, Việt Nam",
    phone: 84901234567,
    email: "nguyenvana@gmail.com",
    createdAt: "2023-05-01",
    updatedAt: "2024-12-01",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image
    note: "Khách hàng thân thiết, ưu tiên xử lý nhanh.",
    debt: 0,
    total: 21000000,
    final: 21000000,
    detail: [
      {
        customerId: "KH001",
        name: "Nguyễn Văn A",
        dob: "1990-05-15",
        email: "nguyenvana@gmail.com",
        phone: "84901234567",
        nation: "Việt Nam",
        province: "Hà Nội",
        district: "Cầu Giấy",
        ward: "Dịch Vọng",
        village: "Ngõ 123, số nhà 45",
        note: "Ưu tiên giao dịch nhanh.",
      },
    ],
    paymentHistory: [
      {
        invoiceId: "HD001",
        time: "2023-06-10 14:30",
        employeeName: "Nguyễn Thị B",
        amount: 500000,
      },
      {
        invoiceId: "HD002",
        time: "2023-08-15 10:00",
        employeeName: "Nguyễn Văn C",
        amount: 300000,
      },
    ],
  },
  {
    customerId: "KH002",
    name: "Trần Thị B",
    sex: "Nữ",
    dob: "1985-02-28",
    address: "TP. Hồ Chí Minh, Việt Nam",
    phone: 84987654321,
    email: "tranthib@gmail.com",
    createdAt: "2022-09-15",
    updatedAt: "2024-11-20",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image
    note: "Khách hàng tiềm năng, chưa có giao dịch gần đây.",
    debt: 0,
    total: 200000,
    final: 200000,
    detail: [
      {
        customerId: "KH002",
        name: "Trần Thị B",
        dob: "1985-02-28",
        email: "tranthib@gmail.com",
        phone: "84987654321",
        nation: "Việt Nam",
        province: "TP. Hồ Chí Minh",
        district: "Quận 1",
        ward: "Bến Nghé",
        village: "Số 99, Đường Nguyễn Huệ",
        note: "Theo dõi lịch sử giao dịch.",
      },
    ],
    paymentHistory: [
      {
        invoiceId: "HD003",
        time: "2023-03-10 09:00",
        employeeName: "Nguyễn Văn D",
        amount: 1000000,
      },
    ],
  },
];

export default function CustomerList() {
  const [activeTab, setActiveTab] = useState<"customer">();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = React.useState(false);

  const handleHeaderCheckboxChange = () => {
    if (isAllSelected) {
      // Nếu đã chọn tất cả, thì bỏ chọn tất cả
      setSelectedIds([]);
    } else {
      // Nếu chưa chọn tất cả, thì chọn tất cả
      const allIds = sampleCustomers.map((customer) => customer.customerId);
      setSelectedIds(allIds);
    }
    setIsAllSelected((prev) => !prev);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleExpandChange = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((expandedId) => expandedId !== id)
        : [...prev, id]
    );
  };

  const totalAmounts = sampleCustomers.reduce(
    (totals, customers) => {
      totals.debt += customers.debt;
      totals.total += customers.total;
      totals.final += customers.final;
      return totals;
    },
    { debt: 0, total: 0, final: 0 }
  );

  const renderCustomers = () => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid #000",
        }}
      >
        <div style={{ width: "5%", textAlign: "left" }}>
          <Checkbox
            checked={isAllSelected}
            onChange={handleHeaderCheckboxChange}
          />
        </div>
        <div style={{ width: "15%" }}>
          <strong>Mã khách hàng</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Tên khách hàng</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Điện thoại</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Nợ hiện tại</strong>
        </div>

        <div style={{ width: "15%" }}>
          <strong>Tổng bán</strong>
        </div>
        <div style={{ width: "10%" }}>
          <strong>Tổng trừ nợ</strong>
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
        <div style={{ width: "15%" }}></div>
        <div style={{ width: "15%" }}>
          {totalAmounts.total.toLocaleString("vi-VN")}
        </div>
        <div style={{ width: "10%" }}>
          {totalAmounts.debt.toLocaleString("vi-VN")}
        </div>
        <div style={{ width: "15%" }}>
          {totalAmounts.final.toLocaleString("vi-VN")}
        </div>
      </div>

      {sampleCustomers.map((customer) => (
        <div key={customer.customerId}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => handleExpandChange(customer.customerId)}
          >
            <Checkbox
              checked={selectedIds.includes(customer.customerId)}
              onChange={() => handleCheckboxChange(customer.customerId)}
              style={{ width: "5%" }}
            />
            <div style={{ width: "15%", fontSize: "13px" }}>
              {customer.customerId}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {customer.name}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {customer.phone}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {customer.debt.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "10%", fontSize: "13px" }}>
              {customer.total.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {customer.final.toLocaleString("vi-VN")}
            </div>
          </div>
          {expandedIds.includes(customer.customerId) && (
            <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<strong>Thông tin</strong>} key="1">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      fontSize: "15px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        marginRight: "10px",
                        fontSize: "15px",
                      }}
                    >
                      <strong>Mã khách hàng:</strong> {customer.customerId}
                      <br />
                      <strong>Tên khách hàng:</strong> {customer.name}
                      <br />
                      <br />
                      <strong>Giới tính:</strong> {customer.sex}
                      <br />
                      <strong>Số điện thoại:</strong> {customer.phone}
                      <br />
                      <br />
                      <strong>Ngày sinh:</strong> {customer.dob}
                      <br />
                      <br />
                      <strong>Email:</strong> {customer.email}
                      <br />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        marginRight: "10px",
                        fontSize: "15px",
                      }}
                    >
                      <br />
                      <strong>Điện thoại:</strong> {customer.phone}
                      <br />
                      <strong>Quốc tịch:</strong> {customer.detail[0].nation}
                      <br />
                      <strong>Tỉnh thành:</strong> {customer.detail[0].province}
                      <br />
                      <br />
                      <strong>Quận huyện:</strong> {customer.detail[0].district}
                      <br />
                      <br />
                      <strong>Phường xã:</strong> {customer.detail[0].ward}
                      <br />
                      <br />
                      <strong>Thôn:</strong> {customer.detail[0].village}
                      <br />
                    </div>
                    <div style={{ flex: 1, fontSize: "15  px" }}>
                      <strong>Ghi chú:</strong>
                      <br />
                      {customer.note || "..."}
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ marginTop: "10px", textAlign: "end" }}>
                    <button
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Cập nhật
                    </button>
                    <button
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Ngừng kinh doanh
                    </button>
                    <button
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "#d9534f",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          )}
        </div>
      ))}
    </>
  );

return (
    
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
   <Page/>
      <Content
      
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "40px",
        }}
      >
         
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as "customer")}
        >
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Khách hàng
              </span>
            }
            key="Customer"
          >
            {renderCustomers()}
          </TabPane>
          
        </Tabs>
      </Content>
    </Layout>
  );
}
