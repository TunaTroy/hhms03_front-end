import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const { Option } = Select;

const WeeklySchedule = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("isoWeek")
  );

  const employees = [
    {
      name: "Nghiêm Tuấn Đạt",
      id: "NV000002",
      shifts: [
        {
          date: dayjs().startOf("isoWeek"),
          status: "Đi làm",
          shift: "Ca sáng",
          time: "19:00 - 07:00",
        },
        {
          date: dayjs().startOf("isoWeek").add(1, "day"),
          status: "Nghỉ",
          shift: "",
          time: "",
        },
        {
          date: dayjs().startOf("isoWeek").add(2, "day"),
          status: "Nghỉ",
          shift: "",
          time: "",
        },
        {
          date: dayjs().startOf("isoWeek").add(3, "day"),
          status: "Đi làm",
          shift: "Ca sáng",
          time: "19:00 - 07:00",
        },
        {
          date: dayjs().startOf("isoWeek").add(4, "day"),
          status: "Đi làm",
          shift: "Ca sáng",
          time: "19:00 - 07:00",
        },
        {
          date: dayjs().startOf("isoWeek").add(5, "day"),
          status: "Đi làm",
          shift: "Ca sáng",
          time: "19:00 - 07:00",
        },
        {
          date: dayjs().startOf("isoWeek").add(6, "day"),
          status: "Nghỉ",
          shift: "",
          time: "",
        },
      ],
    },
  ];

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Lịch làm việc:", values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeekStart((prev) =>
      direction === "prev" ? prev.subtract(1, "week") : prev.add(1, "week")
    );
  };

  const renderWeekView = () => {
    const weekDays = Array.from({ length: 7 }).map((_, index) =>
      currentWeekStart.add(index, "day")
    );

    return (
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <Button
            icon={<LeftOutlined />}
            onClick={() => handleWeekChange("prev")}
            style={{ marginRight: "10px" }}
          />
          <div
            style={{ margin: "0 10px" }}
          >{`Tuần ${currentWeekStart.isoWeek()} - Th. ${currentWeekStart.format(
            "MM YYYY"
          )}`}</div>
          <Button
            icon={<RightOutlined />}
            onClick={() => handleWeekChange("next")}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#ccffff" }}>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  fontWeight: "bold",
                  width: "15%",
                }}
              >
                Ca
              </th>
              {weekDays.map((day, index) => (
                <th
                  key={index}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                    width: "12.5%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
               
                    }}
                  >
                    <div style={{ marginRight: "5px" }}>
                      {day.format("dddd")}
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: "normal" }}>
                      {day.format("DD/MM")}
                    </div>
                    {day.isSame(dayjs(), "day") && (
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "orange",
                          marginLeft: "20px",
                        }}
                      ></div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, empIndex) => (
              <tr key={empIndex}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    backgroundColor: "white", // Đặt màu nền trắng cho ô
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {employee.shifts[0].shift}
                  </div>
                  <div style={{ fontSize: "small", color: "#888" }}>
                    {employee.shifts[0].time}
                  </div>
                </td>
                {weekDays.map((day, index) => {
                  const shift = employee.shifts.find((s) =>
                    s.date.isSame(day, "day")
                  );
                  return (
                    <td
                      key={index}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "center",
                        backgroundColor: "white", // Đặt màu nền trắng cho ô
                        cursor: "pointer",
                      }}
                      onClick={() => onDateSelect(day)}
                    >
                      <div>
                        {shift?.status === "Đi làm" ? (
                          <CheckCircleOutlined
                            style={{ color: "green", fontSize: "24px" }}
                          />
                        ) : (
                          <CloseCircleOutlined
                            style={{ color: "red", fontSize: "24px" }}
                          />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => console.log("Cập nhật")}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {renderWeekView()}

      <Modal
        title={`Thiết lập lịch làm việc cho ${
          selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : ""
        }`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên nhân viên"
            name="employeeName"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhân viên!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ca làm việc"
            name="shift"
            rules={[{ required: true, message: "Vui lòng chọn ca làm việc!" }]}
          >
            <Select placeholder="Chọn ca">
              <Option value="morning">Ca sáng</Option>
              <Option value="afternoon">Ca chiều</Option>
              <Option value="night">Ca tối</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WeeklySchedule;