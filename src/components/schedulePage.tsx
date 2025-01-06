import React, { useState } from "react";
import {
  Modal,
  Form,
  Button,
  Tooltip,
  DatePicker,
  Checkbox,
  Switch,
  message,
} from "antd";
import {
  LeftOutlined,
  PlusCircleOutlined,
  RightOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

type Shift = {
  date: Dayjs;
  shift: string;
  time: string;
  status: string;
  employeeId: string;
};

type Employee = {
  name: string;
  id: string;
  shifts: Shift[];
};

// Mock data
const mockEmployees: Employee[] = [
  {
    name: "Nghiêm Tuấn Đạt",
    id: "NV000001",
    shifts: [
      {
        date: dayjs().startOf("isoWeek"),
        shift: "Ca ngày",
        time: "07:00 - 19:00",
        status: "confirmed",
        employeeId: "NV000001",
      },
      {
        date: dayjs().startOf("isoWeek").add(1, "day"),
        shift: "Ca đêm",
        time: "19:00 - 07:00",
        status: "confirmed",
        employeeId: "NV000001",
      },
    ],
  },
  {
    name: "Nguyễn Quang Khải",
    id: "NV000002",
    shifts: [
      {
        date: dayjs().startOf("isoWeek").add(2, "day"),
        shift: "Ca ngày",
        time: "07:00 - 19:00",
        status: "confirmed",
        employeeId: "NV000002",
      },
    ],
  },
  // Thêm các nhân viên mock khác...
];

const shiftOptions = [
  { label: "Ca ngày (07:00 - 19:00)", value: "Ca ngày" },
  { label: "Ca đêm (19:00 - 07:00)", value: "Ca đêm" },
];

const weekDays = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

const EmployeeSchedule: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentWeekStart, setCurrentWeekStart] = useState(
    dayjs().startOf("isoWeek")
  );
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
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

  //   // Load data from localStorage on mount
  //   useEffect(() => {
  //     const savedData = localStorage.getItem("employeeSchedule");
  //     if (savedData) {
  //       try {
  //         const parsedData = JSON.parse(savedData, (key, value) => {
  //           if (key === "date" || key.includes("date")) {
  //             return dayjs(value);
  //           }
  //           return value;
  //         });
  //         console.log("Loaded data:", parsedData); // Thêm log để debug
  //         setEmployees(parsedData);
  //       } catch (error) {
  //         console.error("Error loading data:", error);
  //         setEmployees(mockEmployees);
  //       }
  //     } else {
  //       setEmployees(mockEmployees);
  //     }
  //   }, []);

  //   // Save to localStorage whenever employees change
  //   useEffect(() => {
  //     if (employees.length > 0) {
  //       const dataToSave = JSON.stringify(employees, (key, value) => {
  //         if (dayjs.isDayjs(value)) {
  //           return value.format();
  //         }
  //         return value;
  //       });
  //       localStorage.setItem("employeeSchedule", dataToSave);
  //     }
  //   }, [employees]);

  const handleAddShift = (employeeId: string, date: Dayjs) => {
    setCurrentEditing({ employeeId, date });
    setIsModalVisible(true);
  };

  const createShiftForDate = (date: Dayjs, shifts: string[]) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === currentEditing?.employeeId) {
        const newShifts = shifts.map((shift: string) => ({
          date: date.clone(),
          shift,
          time: shift === "Ca ngày" ? "07:00 - 19:00" : "19:00 - 07:00",
          status: "pending",
          employeeId: employee.id,
        }));

        const filteredShifts = employee.shifts.filter(
          (shift) => !shift.date.isSame(date, "day")
        );

        return {
          ...employee,
          shifts: [...filteredShifts, ...newShifts],
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const { shifts, endDate } = values;

      if (!selectedDays.length) {
        createShiftForDate(currentEditing?.date as Dayjs, shifts);
      } else {
        const startDate = currentEditing?.date as Dayjs;
        const endDateTime = endDate
          ? endDate.endOf("day")
          : startDate.add(4, "week").endOf("day");

        let currentDate = startDate.startOf("day");
        while (currentDate.isBefore(endDateTime)) {
          const dayName =
            weekDays[currentDate.day() === 0 ? 6 : currentDate.day() - 1];
          if (selectedDays.includes(dayName)) {
            createShiftForDate(currentDate, shifts);
          }
          currentDate = currentDate.add(1, "day");
        }
      }

      setIsModalVisible(false);
      form.resetFields();
      setSelectedDays([]);
      message.success("Đã cập nhật lịch làm việc");
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedDays([]);
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
      message.success("Đã xóa ca làm việc");
    }
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    const newWeekStart =
      direction === "prev"
        ? currentWeekStart.subtract(1, "week")
        : currentWeekStart.add(1, "week");
    setCurrentWeekStart(newWeekStart);
  };

  const handleDaySelection = (day: string) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  };

  const handleSelectAll = () => {
    setSelectedDays((prev) =>
      prev.length === weekDays.length ? [] : [...weekDays]
    );
  };

  const renderWeekView = () => {
    const weekDates = Array.from({ length: 7 }).map((_, index) =>
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
              {weekDates.map((day, index) => (
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
                {weekDates.map((day, index) => {
                  const shifts = employee.shifts.filter((s) =>
                    s.date.isSame(day, "day")
                  );

                  return (
                    <td
                      key={index}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "left",
                        height: "80px",
                        verticalAlign: "top",
                      }}
                      onMouseEnter={() =>
                        setHoveredCell({ employeeId: employee.id, date: day })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {shifts.map((shift, idx) => {
                        let textColor, backgroundColor;

                        if (shift.shift === "Ca ngày") {
                          textColor = "#0000ff";
                          backgroundColor = "#B0E0E6";
                        } else if (shift.shift === "Ca đêm") {
                          textColor = "#00cc00";
                          backgroundColor = "#98FB98";
                        }

                        return (
                          <div key={idx} style={{ marginBottom: "5px" }}>
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
                                  padding: "5px 8px",
                                  borderRadius: "5px",
                                }}
                              >
                                {shift.shift}
                                <CloseCircleOutlined
                                  style={{
                                    cursor: "pointer",
                                    color: textColor,
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
                      })}
                      {hoveredCell?.employeeId === employee.id &&
                        hoveredCell.date.isSame(day, "day") && (
                          <Button
                            size="small"
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

      {/* Modal thêm ca làm việc */}
      <Modal
        title={
          currentEditing
            ? `${
                employees.find((e) => e.id === currentEditing.employeeId)?.name
              }, ${currentEditing.date.format("dddd, DD/MM/YYYY")}`
            : "Thêm lịch làm việc"
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical" initialValues={{ weekDays: [] }}>
          <Form.Item
            label="Chọn ca làm việc"
            name="shifts"
            rules={[{ required: true, message: "Vui lòng chọn ca làm việc!" }]}
          >
            <Checkbox.Group options={shiftOptions} />
          </Form.Item>
          <div style={{ marginBottom: "15px", fontWeight: "bold" }}>
            Thiết lập
          </div>
          <Form.Item name="repeatWeekly" valuePropName="checked">
            <Switch defaultChecked /> Lặp lại hàng tuần
          </Form.Item>
          <Form.Item name="weekDays">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {weekDays.map((day) => (
                <Button
                  key={day}
                  type={selectedDays.includes(day) ? "primary" : "default"}
                  onClick={() => handleDaySelection(day)}
                >
                  {day}
                </Button>
              ))}
              <Button
                type={
                  selectedDays.length === weekDays.length
                    ? "primary"
                    : "default"
                }
                onClick={handleSelectAll}
              >
                Chọn tất cả
              </Button>
            </div>
          </Form.Item>
          <Form.Item name="endDate" label="Ngày kết thúc">
            <DatePicker placeholder="Chọn ngày kết thúc" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xác nhận xóa ca làm việc */}
      <Modal
        title="Xác nhận xóa ca làm việc"
        open={isDeleteModalVisible}
        onOk={handleDeleteShift}
        onCancel={() => {
          setIsDeleteModalVisible(false);
          setCurrentDeletingShift(null);
        }}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn xóa ca làm việc{" "}
          <strong>{currentDeletingShift?.shift}</strong> ngày{" "}
          <strong>{currentDeletingShift?.date.format("DD/MM/YYYY")}</strong> của
          nhân viên{" "}
          <strong>
            {
              employees.find((e) => e.id === currentDeletingShift?.employeeId)
                ?.name
            }
          </strong>
          ?
        </p>
      </Modal>
    </div>
  );
};

export default EmployeeSchedule;
