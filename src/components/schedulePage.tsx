import React, { useState } from "react";
import { Modal, Form, Select, Button, Tooltip } from "antd";
import {
  LeftOutlined,
  PlusCircleOutlined,
  RightOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const { Option } = Select;

type Shift = {
  date: Dayjs;
  shift: string;
  time: string;
  status: string;
  employeeId: string; // Thêm trường employeeId
};

type Employee = {
  name: string;
  id: string;
  shifts: Shift[];
};

const EmployeeSchedule: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("isoWeek")
  );
  const [employees, setEmployees] = useState<Employee[]>([
    {
      name: "Nghiêm Tuấn Đạt",
      id: "NV000001",
      shifts: [
        {
          date: dayjs().startOf("isoWeek"),
          shift: "Ca ngày",
          time: "07:00 - 19:00",
          status: "confirmed",
          employeeId: "NV000001", // Gắn employeeId
        },
      ],
    },
    {
      name: "Nguyễn Quang Khải",
      id: "NV000002",
      shifts: [
        {
          date: dayjs().startOf("isoWeek"),
          shift: "Ca đêm",
          time: "19:00 - 07:00",
          status: "confirmed",
          employeeId: "NV000002", // Gắn employeeId
        },
      ],
    },
  ]);

  const [currentEditing, setCurrentEditing] = useState<{
    employeeId: string;
    date: Dayjs;
  } | null>(null);

  const [currentDeletingShift, setCurrentDeletingShift] =
    useState<Shift | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    employeeId: string;
    date: Dayjs;
  } | null>(null);

  const shiftTimes: Record<string, string> = {
    "Ca ngày": "07:00 - 19:00",
    "Ca đêm": "19:00 - 07:00",
  };

  const handleAddShift = (employeeId: string, date: Dayjs) => {
    setCurrentEditing({ employeeId, date });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { shift } = values;
        const time = shiftTimes[shift];

        const updatedEmployees = employees.map((employee) => {
          if (employee.id === currentEditing?.employeeId) {
            const existingShift = employee.shifts.some(
              (s) =>
                s.date.isSame(currentEditing.date, "day") && s.shift === shift
            );

            if (!existingShift) {
              const updatedShifts = [
                ...employee.shifts,
                {
                  date: currentEditing.date,
                  shift,
                  time,
                  status: "pending",
                  employeeId: employee.id, // Gắn employeeId
                },
              ];
              return { ...employee, shifts: updatedShifts };
            } else {
              alert("Ca làm đã tồn tại cho nhân viên này vào ngày đã chọn.");
            }
          }
          return employee;
        });

        setEmployees(updatedEmployees);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDeleteShift = () => {
    if (currentDeletingShift) {
      const updatedEmployees = employees.map((employee) => {
        if (employee.id === currentDeletingShift.employeeId) {
          const updatedShifts = employee.shifts.filter(
            (shift) =>
              !(
                shift.date.isSame(currentDeletingShift.date, "day") &&
                shift.shift === currentDeletingShift.shift
              )
          );
          return { ...employee, shifts: updatedShifts };
        }
        return employee;
      });

      setEmployees(updatedEmployees);
      setIsDeleteModalVisible(false);
      setCurrentDeletingShift(null);
    }
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    const newWeekStart =
      direction === "prev"
        ? currentWeekStart.subtract(1, "week")
        : currentWeekStart.add(1, "week");
    setCurrentWeekStart(newWeekStart);
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
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button
            icon={<LeftOutlined />}
            onClick={() => handleWeekChange("prev")}
            style={{ marginRight: "10px" }}
          />
          <div>{`Tuần ${currentWeekStart.isoWeek()} - Th. ${currentWeekStart.format(
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
                }}
              >
                Nhân viên
              </th>
              {weekDays.map((day, index) => (
                <th
                  key={index}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  {day.format("dddd (DD/MM)")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  {employee.name}
                </td>
                {weekDays.map((day, index) => {
                  const shifts = employee.shifts.filter((s) =>
                    s.date.isSame(day, "day")
                  );
                  const shiftCount = shifts.length; // Đếm số ca đã làm

                  return (
                    <td
                      key={index}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "left",
                        height: "80px",
                      }}
                      onMouseEnter={() =>
                        setHoveredCell({ employeeId: employee.id, date: day })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                     {shifts.length > 0
  ? shifts.map((shift, idx) => {
      let textColor, backgroundColor;
      let closeIconColor; // Biến để lưu màu cho icon

      if (shift.shift === "Ca ngày") {
        textColor = "#0000ff";
        backgroundColor = "#B0E0E6";
        closeIconColor = "black"; // Màu cho icon Ca ngày
      } else if (shift.shift === "Ca đêm") {
        textColor = "#00cc00";
        backgroundColor = "#98FB98";
        closeIconColor = "black"; // Màu cho icon Ca đêm
      } else {
        textColor = "#606266";
        backgroundColor = "#F2F2F2";
        closeIconColor = "black"; // Màu cho icon mặc định
      }

      return (
        <div key={idx} style={{ marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Tooltip title={shift.time}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                cursor: "pointer",
                color: textColor,
                backgroundColor: backgroundColor,
                fontSize: "13px",
                padding: "5px 8px",
                borderRadius: "5px",
                width: "100%",
              }}
              className="hover:bg-[#F2F2F2]"
            >
              {shift.shift}
              <CloseCircleOutlined
                style={{
                  cursor: "pointer",
                  color: textColor, 
                  marginLeft: "10px",
                }}
                onClick={() => {
                  setCurrentDeletingShift(shift);
                  setIsDeleteModalVisible(true);
                }}
              />
            </div>
          </Tooltip>
        </div>
      );
    })
  : null}
                      {hoveredCell?.employeeId === employee.id &&
                        hoveredCell.date.isSame(day, "day") &&
                        shiftCount < 2 && ( // Kiểm tra số ca đã làm
                          <Button
                            size="small"
                            style={{
                              marginTop: "5px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "65%",
                              marginLeft: "auto",
                              marginRight: "auto",
                              padding: "5px 10px",
                            }}
                            onClick={() => handleAddShift(employee.id, day)}
                          >
                            <PlusCircleOutlined /> Thêm ca
                          </Button>
                        )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {renderWeekView()}
      <Modal
        title="Thêm lịch làm việc"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="shift"
            label="Ca làm"
            rules={[{ required: true, message: "Vui lòng chọn ca làm!" }]}
          >
            <Select>
              <Option value="Ca ngày">Ca ngày</Option>
              <Option value="Ca đêm">Ca đêm</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận hủy ca làm"
        visible={isDeleteModalVisible}
        onOk={handleDeleteShift}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Bạn có chắc chắn muốn hủy ca làm này không?</p>
      </Modal>
    </div>
  );
};

export default EmployeeSchedule;
