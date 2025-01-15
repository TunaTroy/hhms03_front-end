"use client";

import React, { useState } from "react";
import {
  Modal,
  Tabs,
  Button,
  Select,
  Table,
  Checkbox,
  TimePicker,
  Form,
  Radio,
  Input,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs"; // Import dayjs for date and time formatting
import type { TabsProps } from "antd";

interface TimeLog {
  in: string;
  out: string;
}

interface AttendanceRecord {
  date: string;
  status: string;
  method: string;
  content: string;
}

interface Violation {
  type: string;
  count: number;
  level: string;
  amount: string;
}

interface Reward {
  type: string;
  count: number;
  amount: string;
  total: string;
}

interface Employee {
  id: string;
  name: string;
  code: string;
  status: string;
  avatar: string;
}

interface UpdateAttendedProps {
  isOpen: boolean;
  onClose: () => void;
  employeeId?: string;
}

const MOCK_DATA = {
  employee: {
    id: "1",
    name: "Nguyễn Quang Khải",
    code: "NV000002",
    status: "Chưa chấm công",
    avatar: "NQ",
  },
  shifts: [
    { id: "1", name: "Cả sáng (07:00 - 19:00)" },
    { id: "2", name: "Ca sáng (07:00 - 11:00)" },
    { id: "3", name: "Ca chiều (13:00 - 17:00)" },
  ],
  attendanceHistory: [
    {
      date: "08/01/2025",
      status: "Đã chấm công",
      method: "Thủ công",
      content: "Giờ vào: 07:00",
    },
    {
      date: "08/01/2025",
      status: "Thủ công",
      method: "Thủ công",
      content: "Giờ ra: 19:00",
    },
  ],
  violations: [
    {
      type: "Đi muộn",
      count: 2,
      level: "Nhắc nhở",
      amount: "0 VNĐ",
    },
    {
      type: "Vắng mặt",
      count: 1,
      level: "Phạt tiền",
      amount: "500.000 VNĐ",
    },
  ],
  rewards: [
    {
      type: "Thưởng hiệu suất",
      count: 1,
      amount: "100.000 VNĐ",
      total: "100.000 VNĐ",
    },
    {
      type: "Thưởng lễ",
      count: 1,
      amount: "300.000 VNĐ",
      total: "300.000 VNĐ",
    },
  ],
  violationTypes: ["Đi muộn", "Vắng mặt", "Không hoàn thành công việc"],
  rewardTypes: ["Thưởng hiệu suất", "Thưởng lễ", "Thưởng khác"],
};

const EmployeeInfo: React.FC<{ employee: Employee }> = ({ employee }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
      <span>{employee.avatar}</span>
    </div>
    <div>
      <h3 className="m-0">{employee.name}</h3>
      <p className="m-0 text-gray-600">
        {employee.code} - {employee.status}
      </p>
    </div>
  </div>
);

const TimeLogInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="flex items-center mb-3">
    <Checkbox style={{ marginRight: "8px" }}>
      <span className="font-medium">{label}</span>
    </Checkbox>
    <div className="flex items-center">
      <ClockCircleOutlined style={{ marginRight: "4px" }} />
      <TimePicker
        value={value ? dayjs(value, "HH:mm") : null}
        format="HH:mm"
        onChange={(time) => onChange(time ? time.format("HH:mm") : "")}
        style={{ width: "100px" }} // Cố định chiều rộng cho TimePicker
      />
    </div>
  </div>
);

const UpdateAttended: React.FC<UpdateAttendedProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [selectedShift, setSelectedShift] = useState(MOCK_DATA.shifts[0].name);
  const [date, setDate] = useState("Thứ 3, 07/01/2025");
  const [timeLog, setTimeLog] = useState<TimeLog>({ in: "", out: "" });
  const [note, setNote] = useState("");
  const [workStatus, setWorkStatus] = useState("di-lam"); // Trạng thái mặc định
  const [violationStatus, setViolationStatus] = useState("violation-type-1"); // Trạng thái vi phạm mặc định

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving...", { ...values, timeLog, workStatus });
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const attendanceColumns = [
    {
      title: "Thời gian",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hình thức",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
  ];

  const violationColumns = [
    {
      title: "Loại vi phạm",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số lần",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Mức áp dụng",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Thành tiền",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const rewardColumns = [
    {
      title: "Loại thưởng",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số lần",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Mức áp dụng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Chấm công",
      children: (
        <div className="mt-4">
          <div className="mb-4">
            <span className="font-bold">Chấm công</span>
            <Radio.Group
              value={workStatus}
              onChange={(e) => setWorkStatus(e.target.value)}
              style={{ marginLeft: "16px" }}
            >
              <Radio value="di-lam">Đi làm</Radio>
              <Radio value="nghi">Nghỉ</Radio>
            </Radio.Group>
          </div>
          <TimeLogInput
            label="Vào"
            value={timeLog.in}
            onChange={(value) => setTimeLog({ ...timeLog, in: value })}
          />
          <TimeLogInput
            label="Ra"
            value={timeLog.out}
            onChange={(value) => setTimeLog({ ...timeLog, out: value })}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Lịch sử chấm công",
      children: (
        <Table
          dataSource={MOCK_DATA.attendanceHistory}
          columns={attendanceColumns}
          pagination={false}
        />
      ),
    },
    {
      key: "3",
      label: "Phạt vi phạm",
      children: (
        <div className="mt-4">
          <div className="mb-4">
            <span className="font-bold">Chọn loại vi phạm</span>
            <Radio.Group
              value={violationStatus}
              onChange={(e) => setViolationStatus(e.target.value)}
              style={{ marginLeft: "16px" }}
            >
              <Radio value="violation-type-1">Đi muộn</Radio>
              <Radio value="violation-type-2">Về sớm</Radio>
              <Radio value="violation-type-3">Vắng mặt</Radio>
              <Input
                type="number"
                placeholder="Số lần"
                style={{ width: "100px", marginLeft: "20px" }}
              />
              <Button type="primary" style={{ marginLeft: "20px" }}>
                Áp dụng phạt
              </Button>
            </Radio.Group>
          </div>
          <Table
            dataSource={MOCK_DATA.violations}
            columns={violationColumns}
            pagination={false}
          />
          <div className="mt-4">
            <Button type="primary" style={{ marginRight: "8px" }}>
              Thêm vi phạm
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Thưởng",
      children: (
        <div className="mt-4">
          <div className="mb-4">
            <span className="font-bold">Chọn loại thưởng</span>
            <Radio.Group
              value={violationStatus}
              onChange={(e) => setViolationStatus(e.target.value)}
              style={{ marginLeft: "16px" }}
            >
              <Radio value="violation-type-1">Thưởng KPI</Radio>
              <Radio value="violation-type-2">Thưởng lễ</Radio>
              <Input
                type="number"
                placeholder="Số lần"
                style={{ width: "100px", marginLeft: "80px" }}
              />
              <Button type="primary" style={{ marginLeft: "20px" }}>
                Áp dụng thưởng
              </Button>
            </Radio.Group>
          </div>
          <Table
            dataSource={MOCK_DATA.violations}
            columns={violationColumns}
            pagination={false}
          />
          <div className="mt-4">
            <Button type="primary" style={{ marginRight: "8px" }}>
              Thêm thưởng
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={<EmployeeInfo employee={MOCK_DATA.employee} />}
      open={isOpen}
      onCancel={onClose}
      width={728}
      footer={[
        <Button
          key="change"
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Đổi ca
        </Button>,
        <Button
          key="save"
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
          onClick={handleSave}
        >
          Lưu
        </Button>,
        <Button key="skip" style={{ backgroundColor: "silver" }}>
          Bỏ qua
        </Button>,
        <Button key="cancel" danger onClick={onClose}>
          Hủy
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div style={{ flex: "0 0 300px" }}>
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.88)",
                fontWeight: "bold",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                marginRight: "8px",
                whiteSpace: "nowrap",
              }}
            >
              Thời gian:
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.88)",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              }}
            >
              Thứ 2, 06/01/2025
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.88)",
                fontWeight: "bold",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                marginRight: "8px",
                whiteSpace: "nowrap",
              }}
            >
              Ca làm việc:
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "rgba(0, 0, 0, 0.88)",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              }}
            >
              Ca sáng (07:00 - 19:00)
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <textarea
            placeholder="Ghi chú ..."
            style={{
              width: "100%",
              minHeight: "80px",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d9d9",
              borderRadius: "6px",
              padding: "4px 11px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontSize: "14px",
            }}
          />
        </div>
      </div>

      <Tabs items={items} />
    </Modal>
  );
};

export default UpdateAttended;
