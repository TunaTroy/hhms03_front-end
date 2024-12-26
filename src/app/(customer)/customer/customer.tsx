"use client";

import React, { useState } from "react";
import { Layout, Checkbox, Tabs } from "antd";

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
  status: string;
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
        status: "Đã hoàn thành",
        amount: 500000,
      },
      {
        invoiceId: "HD002",
        time: "2023-08-15 10:00",
        employeeName: "Nguyễn Văn C",
        status: "Đã hoàn thành",
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
    debt: 100000,
    total: 200000,
    final: 100000,
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
        status: "Đang xử lý",
        amount: 1000000,
      },
    ],
  },
];

const CustomerList = () => {
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
        <div style={{ width: "15%" }}>
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
        <div
          style={{
            width: "15%",
            color: totalAmounts.debt !== 0 ? "red" : "inherit",
          }}
        >
          {totalAmounts.debt.toLocaleString("vi-VN")}
        </div>
        <div style={{ width: "15%" }}>
          {totalAmounts.total.toLocaleString("vi-VN")}
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
            <div
              style={{
                width: "15%",
                fontSize: "13px",
                color: customer.debt !== 0 ? "red" : "inherit",
              }}
            >
              {customer.debt.toLocaleString("vi-VN")}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
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
                      gap: "20px",
                    }}
                  >
                    {/* Phần 1: Ảnh */}
                    <div style={{ width: "35%" }}>
                      <img
                        src={customer.imageUrl}
                        alt={customer.name}
                        style={{
                          width: "90%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    {/* Section 2: Basic Information */}
                    <div style={{ width: "30%" }}>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Mã khách hàng:</strong> {customer.customerId}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Tên khách hàng:</strong> {customer.name}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Giới tính:</strong> {customer.sex}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Số điện thoại:</strong> {customer.phone}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Ngày sinh:</strong> {customer.dob}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Email:</strong> {customer.email}
                      </div>
                    </div>

                    {/* Section 3: Additional Information */}
                    <div style={{ width: "30%" }}>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Quốc tịch:</strong> {customer.detail[0].nation}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Tỉnh thành:</strong>{" "}
                        {customer.detail[0].province}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Quận huyện:</strong>{" "}
                        {customer.detail[0].district}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Phường xã:</strong> {customer.detail[0].ward}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Thôn:</strong> {customer.detail[0].village}
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Ghi chú:</strong>
                        <br />
                        {customer.note || "..."}
                      </div>
                    </div>
                  </div>
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

                {/* Tab: Lịch sử giao dịch */}
                <TabPane tab="Lịch sử giao dịch" key="2">
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "10px",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#e6f7ff" }}>
                        {[
                          "Mã hóa đơn",
                          "Thời gian",
                          "Thu ngân",
                          "Trạng thái",
                          "Tổng cộng",
                        ].map((header) => (
                          <th
                            key={header}
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customer.paymentHistory.length > 0 ? (
                        customer.paymentHistory.map((payment) => (
                          <tr key={payment.invoiceId}>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.invoiceId}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.time}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.employeeName}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                                color:
                                  payment.status === "Đang xử lý"
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {payment.status}
                            </td>
                            <td
                              style={{
                                border: "1px solid #ccc",
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {payment.amount.toLocaleString("vi-VN")}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            style={{
                              border: "1px solid #ccc",
                              padding: "8px",
                              textAlign: "center",
                              color: "#888",
                            }}
                          >
                            Không có dữ liệu
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
      <Content
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
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
};

export default CustomerList;
