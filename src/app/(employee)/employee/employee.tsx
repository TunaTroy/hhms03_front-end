"use client";

import React, { useState } from "react";
import { Layout, Tabs, Checkbox } from "antd";
import UpdateTypeRoom from "@/components/update/updateTypeRoom";
import WeeklySchedule from "@/components/schedule";
import SalaryComponent from "@/components/setSalary";
const { Content } = Layout;
const { TabPane } = Tabs;

// Danh sách Nhân viên
interface Employee {
  employeeId: string;
  attendedId: string;
  employeeName: string;
  employeePhone: string;
  employeeCard: string;
  employeeTrip: string;
  employeeNote: string;
  employeeImg: string;
  employeeDOB: string;
  employeeSex: string;
  employeeEmail: string;
  employeeAddress: string;
  employeeInfor: EmployeeInfor[];
  employeeSchedule: EmployeeSchedule[];
  employeeSetting: EmployeeSetting[];
  employeeSalary: EmployeeSalary[];
}

interface EmployeeInfor {
  employeeImg: string;
  employeeId: string;
  employeeName: string;
  attendedId: string;
  employeeDOB: string;
  employeeSex: string;
  employeeCard: string;
  employeePhone: string;
  employeeEmail: string;
  employeeAddress: string;
  employeeNote: string;
}

interface EmployeeSchedule {
  // Define properties for employee schedule if needed
}

interface EmployeeSetting {
  // Define properties for employee settings if needed
}

interface EmployeeSalary {
  // Define properties for employee salary if needed
}

// Dữ liệu mẫu
const sampleEmployee: Employee[] = [
  {
    employeeId: "EM00001",
    attendedId: "AT00001",
    employeeName: "Nghiêm Tuấn Đạt",
    employeePhone: "0338010481",
    employeeCard: "001203023518",
    employeeTrip: "10000000",
    employeeNote: "Đẹp trai nhất vũ trụ",
    employeeImg: "https://via.placeholder.com/300x200?text=Troy+Handsome",
    employeeDOB: "09092003",
    employeeSex: "Nam",
    employeeEmail: "nghiemtuandat1309@gmail.com",
    employeeAddress: "Tri Chỉ - Tri Trung - Phú Xuyên - Hà Nội",
    employeeInfor: [
      {
        employeeImg: "https://via.placeholder.com/300x200?text=Troy+Handsome",
        employeeId: "EM00001",
        employeeName: "Nghiêm Tuấn Đạt",
        attendedId: "AT00001",
        employeeDOB: "09092003",
        employeeSex: "Nam",
        employeeCard: "001203023518",
        employeePhone: "0338010481",
        employeeEmail: "nghiemtuandat1309@gmail.com",
        employeeAddress: "Tri Chỉ - Tri Trung - Phú Xuyên - Hà Nội",
        employeeNote: "Đẹp trai nhất vũ trụ",
      },
    ],
    employeeSchedule: [], // Initialize with relevant data
    employeeSetting: [], // Initialize with relevant data
    employeeSalary: [], // Initialize with relevant data
  },
];

// Dữ liệu danh sách Phòng

const EmployeeTypeList = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"roomTypes" | "rooms">(
    "roomTypes"
  );

  // Xử lý mở rộng/thu gọn
  const handleExpandChange = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((expandedId) => expandedId !== id)
        : [...prev, id]
    );
  };

  // Xử lý checkbox chọn từng hạng phòng
  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Xử lý checkbox chọn tất cả
  const handleHeaderCheckboxChange = () => {
    if (selectedIds.length === sampleEmployee.length) {
      setSelectedIds([]);
      setIsAllSelected(false);
    } else {
      const allIds = sampleEmployee.map((employee) => employee.employeeId);
      setSelectedIds(allIds);
      setIsAllSelected(true);
    }
  };

  // Cập nhật trạng thái checkbox chọn tất cả
  React.useEffect(() => {
    setIsAllSelected(selectedIds.length === sampleEmployee.length);
  }, [selectedIds]);

  const handleSave = (data: any) => {
    console.log("Dữ liệu đã lưu:", data);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  // Hiển thị danh sách hạng phòng
  const renderEmployees = () => (
    <>
      {/* Header */}
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
          <strong>Mã nhân viên</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Mã chấm công</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Tên nhân viên</strong>
        </div>
        <div style={{ width: "20%" }}>
          <strong></strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Số điện thoại</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Số CCCD</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Nợ lương</strong>
        </div>
        <div style={{ width: "15%" }}>
          <strong>Ghi chú</strong>
        </div>
      </div>

      {/* Room Types */}
      {sampleEmployee.map((employee) => (
        <div key={employee.employeeId}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => handleExpandChange(employee.employeeId)}
          >
            <Checkbox
              checked={selectedIds.includes(employee.employeeId)}
              onChange={(e) => {
                e.stopPropagation();
                handleCheckboxChange(employee.employeeId);
              }}
              style={{ width: "5%" }}
            />
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.employeeId}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.attendedId}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.employeeName}
            </div>
            <div style={{ width: "20%", fontSize: "13px" }}></div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.employeePhone}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.employeeCard}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.employeeTrip}
            </div>
            <div style={{ width: "15%", fontSize: "13px" }}>
              {employee.employeeNote}
            </div>
          </div>

          {/* Expanded Row */}
          {expandedIds.includes(employee.employeeId) && (
            <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
              <Tabs defaultActiveKey="1">
                {/* Tab: Thông tin */}
                <TabPane tab="Thông tin" key="1">
                  <div style={{ display: "flex", gap: "20px" }}>
                    {/* Phần 1: Ảnh */}
                    <div style={{ width: "35%" }}>
                      <img
                        src={employee.employeeImg}
                        alt={employee.employeeName}
                        style={{
                          width: "90%", // Thay đổi width thành 100%
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    {/* Phần 2: Các field cơ bản */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Mã nhân viên:</strong> {employee.employeeId}
                      </p>
                      <p>
                        <strong>Tên nhân viên:</strong> {employee.employeeName}
                      </p>
                      <p>
                        <strong>Mã chấm công:</strong> {employee.attendedId}
                      </p>
                      <p>
                        <strong>Ngày sinh:</strong> {employee.employeeDOB}
                      </p>
                      <p>
                        <strong>Giới tính:</strong> {employee.employeeSex}
                      </p>
                      <p>
                        <strong>Số CCCD:</strong> {employee.employeeCard}
                      </p>
                    </div>

                    {/* Phần 3: Sức chứa và mô tả */}
                    <div style={{ width: "30%" }}>
                      <p>
                        <strong>Số điện thoại:</strong> {employee.employeePhone}
                      </p>
                      <p>
                        <strong>Email:</strong> {employee.employeeEmail}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {employee.employeeAddress}
                      </p>
                      <p>
                        <strong>Ghi chú:</strong> {employee.employeeNote}
                      </p>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ marginTop: "10px", textAlign: "end" }}>
                    <button
                      onClick={() => setIsModalVisible(true)}
                      style={{
                        padding: "8px 12px",
                        marginRight: "10px",
                        backgroundColor: "blue",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Lấy mã xác nhận
                    </button>
                    <button
                      onClick={() => setIsModalVisible(true)}
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
                    <UpdateTypeRoom
                      visible={isModalVisible}
                      onClose={() => setIsModalVisible(false)}
                      onSave={handleSave}
                    />
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
                      Xóa nhân viên
                    </button>
                  </div>
                </TabPane>

                {/* Tab: Danh sách phòng */}
                <TabPane tab="Lịch làm việc" key="2">
                  <WeeklySchedule />
                </TabPane>
                <TabPane tab="Thiết lập lương" key="3">
                <SalaryComponent />
                </TabPane>
                <TabPane tab="Nợ và tạm ứng" key="4"></TabPane>
              </Tabs>
            </div>
          )}
        </div>
      ))}
    </>
  );

  //   const renderRooms = () => (
  //     <>
  //       {/* Header */}
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           padding: "10px 0",
  //           borderBottom: "1px solid #000",
  //         }}
  //       >
  //         <div style={{ width: "5%", textAlign: "left" }}>
  //           <Checkbox
  //             checked={isAllSelected}
  //             onChange={handleHeaderCheckboxChange}
  //           />
  //         </div>
  //         <div style={{ width: "20%" }}>
  //           <strong>Tên phòng</strong>
  //         </div>
  //         <div style={{ width: "30%" }}>
  //           <strong>Hạng phòng</strong>
  //         </div>
  //         <div style={{ width: "15%" }}>
  //           <strong>Khu vực</strong>
  //         </div>
  //         <div style={{ width: "15%" }}>
  //           <strong>Giá giờ</strong>
  //         </div>
  //         <div style={{ width: "15%" }}>
  //           <strong>Giá ngày</strong>
  //         </div>
  //         <div style={{ width: "15%" }}>
  //           <strong>Trạng thái</strong>
  //         </div>
  //         <div style={{ width: "30%" }}>
  //           <strong>Mô tả</strong>
  //         </div>
  //       </div>

  //       {/* Employee */}
  //       {sampleEmployee.map((employee) => (
  //         <div key={room.name}>
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "space-between",
  //               padding: "10px 0",
  //               borderBottom: "1px solid #eee",
  //               cursor: "pointer",
  //             }}
  //             onClick={() => handleExpandChange(room.name)}
  //           >
  //             <Checkbox
  //               checked={selectedIds.includes(room.name)}
  //               onChange={(e) => {
  //                 e.stopPropagation();
  //                 handleCheckboxChange(room.name);
  //               }}
  //               style={{ width: "5%" }}
  //             />
  //             <div style={{ width: "20%", fontSize: "13px" }}>{room.name}</div>
  //             <div style={{ width: "30%", fontSize: "13px" }}>
  //               {room.typeName}
  //             </div>
  //             <div style={{ width: "15%", fontSize: "13px" }}>{room.floor}</div>
  //             <div style={{ width: "15%", fontSize: "13px" }}>
  //               {room.hourlyPrice.toLocaleString("vi-VN")}
  //             </div>
  //             <div style={{ width: "15%", fontSize: "13px" }}>
  //               {room.dailyPrice.toLocaleString("vi-VN")}
  //             </div>
  //             <div
  //               style={{
  //                 width: "15%",
  //                 fontSize: "13px",
  //                 color: room.status === "Ngừng hoạt động" ? "red" : "green",
  //               }}
  //             >
  //               {room.status}
  //             </div>
  //             <div style={{ width: "30%", fontSize: "13px" }}>
  //               {room.description}
  //             </div>
  //           </div>

  //           {/* Expanded Row */}
  //           {expandedIds.includes(room.name) && (
  //             <div style={{ padding: "10px", backgroundColor: "#FFFEFA" }}>
  //               <Tabs defaultActiveKey="1">
  //                 {/* Tab: Thông tin */}
  //                 <TabPane tab="Thông tin" key="1">
  //                   <div style={{ display: "flex", gap: "20px" }}>
  //                     {/* Phần 1: Ảnh */}
  //                     <div style={{ width: "35%" }}>
  //                       <img
  //                         src={room.imageUrl}
  //                         alt={room.name}
  //                         style={{
  //                           width: "90%",
  //                           height: "200px",
  //                           objectFit: "cover",
  //                           borderRadius: "8px",
  //                         }}
  //                       />
  //                     </div>

  //                     {/* Phần 2: Các field cơ bản */}
  //                     <div style={{ width: "30%" }}>
  //                       <p>
  //                         <strong>Tên phòng:</strong> {room.name}
  //                       </p>
  //                       <p>
  //                         <strong>Hạng phòng:</strong> {room.typeName}
  //                       </p>
  //                       <p>
  //                         <strong>Khu vực:</strong> {room.floor}
  //                       </p>
  //                       <p>
  //                         <strong>Giá giờ:</strong>{" "}
  //                         {room.hourlyPrice.toLocaleString("vi-VN")}
  //                       </p>
  //                       <p>
  //                         <strong>Giá ngày:</strong>{" "}
  //                         {room.dailyPrice.toLocaleString("vi-VN")}
  //                       </p>
  //                       <p>
  //                         <strong>Phụ thu quá giờ:</strong>{" "}
  //                         {room.penaltyPrice.toLocaleString("vi-VN")}
  //                       </p>
  //                     </div>

  //                     {/* Phần 3: Sức chứa và mô tả */}
  //                     <div style={{ width: "30%" }}>
  //                       <p>
  //                         <strong>Bắt đầu sử dụng:</strong> {room.timeStart}
  //                       </p>
  //                       <p>
  //                         <strong>Vệ sinh:</strong> {room.cleanStatus}
  //                       </p>
  //                       <p>
  //                         <strong>Mô tả:</strong> {room.description}
  //                       </p>
  //                     </div>
  //                   </div>
  //                   {/* Buttons */}
  //                   <div style={{ marginTop: "10px", textAlign: "end" }}>
  //                     <button
  //                       style={{
  //                         padding: "8px 12px",
  //                         marginRight: "10px",
  //                         backgroundColor: "#4caf50",
  //                         color: "#fff",
  //                         border: "none",
  //                         borderRadius: "4px",
  //                         cursor: "pointer",
  //                       }}
  //                     >
  //                       Cập nhật
  //                     </button>
  //                     <button
  //                       style={{
  //                         padding: "8px 12px",
  //                         marginRight: "10px",
  //                         backgroundColor: "#f44336",
  //                         color: "#fff",
  //                         border: "none",
  //                         borderRadius: "4px",
  //                         cursor: "pointer",
  //                       }}
  //                     >
  //                       Ngừng hoạt động
  //                     </button>
  //                   </div>
  //                 </TabPane>

  //                 {/* Tab: Lịch sử đặt phòng */}
  //                 <TabPane tab="Lịch sử đặt phòng" key="2">
  //                   <table
  //                     style={{
  //                       width: "100%",
  //                       borderCollapse: "collapse",
  //                       marginTop: "10px",
  //                     }}
  //                   >
  //                     <thead>
  //                       <tr style={{ backgroundColor: "#e6f7ff" }}>
  //                         {[
  //                           "Mã đặt phòng",
  //                           "Thời gian đặt",
  //                           "Nhân viên đặt",
  //                           "Tổng cộng",
  //                           "Trạng thái",
  //                         ].map((header) => (
  //                           <th
  //                             key={header}
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             {header}
  //                           </th>
  //                         ))}
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       {room.roomBooking.map((booking) => (
  //                         <tr key={booking.bookingTime}>
  //                           <td
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             {booking.bookingId}
  //                           </td>
  //                           <td
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             {booking.bookingTime}
  //                           </td>
  //                           <td
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             {booking.bookingEmployee}
  //                           </td>
  //                           <td
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             {booking.bookingTotal.toLocaleString("vi-VN")}
  //                           </td>
  //                           <td
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                               color:
  //                                 booking.bookingStatus === "Đang xử lý"
  //                                   ? "red"
  //                                   : "green",
  //                             }}
  //                           >
  //                             {booking.bookingStatus}
  //                           </td>
  //                         </tr>
  //                       ))}
  //                     </tbody>
  //                   </table>
  //                 </TabPane>
  //                 {/* Tab: Lịch sử giao dịch */}
  //                 <TabPane tab="Lịch sử giao dịch" key="3">
  //                   <table
  //                     style={{
  //                       width: "100%",
  //                       borderCollapse: "collapse",
  //                       marginTop: "10px",
  //                     }}
  //                   >
  //                     <thead>
  //                       <tr style={{ backgroundColor: "#e6f7ff" }}>
  //                         {[
  //                           "Mã hóa đơn",
  //                           "Thời gian",
  //                           "Thu ngân",
  //                           "Trạng thái",
  //                           "Tổng cộng",
  //                         ].map((header) => (
  //                           <th
  //                             key={header}
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                             }}
  //                           >
  //                             {header}
  //                           </th>
  //                         ))}
  //                       </tr>
  //                     </thead>
  //                     <tbody>
  //                       {room.roomPayment.length > 0 ? (
  //                         room.roomPayment.map((payment) => (
  //                           <tr key={payment.invoiceId}>
  //                             <td
  //                               style={{
  //                                 border: "1px solid #ccc",
  //                                 padding: "8px",
  //                                 textAlign: "center",
  //                               }}
  //                             >
  //                               {payment.invoiceId}
  //                             </td>
  //                             <td
  //                               style={{
  //                                 border: "1px solid #ccc",
  //                                 padding: "8px",
  //                                 textAlign: "center",
  //                               }}
  //                             >
  //                               {payment.invoiceTime}
  //                             </td>
  //                             <td
  //                               style={{
  //                                 border: "1px solid #ccc",
  //                                 padding: "8px",
  //                                 textAlign: "center",
  //                               }}
  //                             >
  //                               {payment.invoiceEmployee}
  //                             </td>
  //                             <td
  //                               style={{
  //                                 border: "1px solid #ccc",
  //                                 padding: "8px",
  //                                 textAlign: "center",
  //                                 color:
  //                                   payment.invoiceStatus === "Đang xử lý"
  //                                     ? "red"
  //                                     : "green",
  //                               }}
  //                             >
  //                               {payment.invoiceStatus}
  //                             </td>
  //                             <td
  //                               style={{
  //                                 border: "1px solid #ccc",
  //                                 padding: "8px",
  //                                 textAlign: "center",
  //                               }}
  //                             >
  //                               {payment.invoiceTotal.toLocaleString("vi-VN")}
  //                             </td>
  //                           </tr>
  //                         ))
  //                       ) : (
  //                         <tr>
  //                           <td
  //                             colSpan={5}
  //                             style={{
  //                               border: "1px solid #ccc",
  //                               padding: "8px",
  //                               textAlign: "center",
  //                               color: "#888",
  //                             }}
  //                           >
  //                             Không có dữ liệu
  //                           </td>
  //                         </tr>
  //                       )}
  //                     </tbody>
  //                   </table>
  //                 </TabPane>
  //               </Tabs>
  //             </div>
  //           )}
  //         </div>
  //       ))}
  //     </>
  //   );

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
          onChange={(key) => setActiveTab(key as "roomTypes" | "rooms")}
        >
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Danh sách
              </span>
            }
            key="roomTypes"
          >
            {renderEmployees()}
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>Lịch</span>
            }
            key="2"
          ></TabPane>
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Chấm công
              </span>
            }
            key="3"
          ></TabPane>
          <TabPane
            tab={
              <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                Lương
              </span>
            }
            key="4"
          ></TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default EmployeeTypeList;
