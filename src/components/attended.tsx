import React, { useState, useMemo } from "react";
import { Button, Select, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

type TimeLogStatus = "đúng giờ" | "đến muộn" | "vắng mặt" | "chưa điểm danh";

interface TimeLog {
  date: Dayjs;
  shift: "Ca sáng" | "Ca đêm";
  status: TimeLogStatus;
  employeeId: string;
  arrivalTime: string;
  departureTime: string;
  note: string;
}

interface Employee {
  name: string;
  id: string;
  timeLogs: TimeLog[];
}

interface EmployeeAttendedProps {
  initialDate?: Dayjs;
  onDateChange?: (date: Dayjs) => void;
}

const statusColors: Record<TimeLogStatus, string> = {
  "đúng giờ": "#def0fa",
  "đến muộn": "#faf9de",
  "chưa điểm danh": "#fadede",
  "vắng mặt": "#e6faec",
};

// Giữ nguyên hàm createMockData và calculateDelay của bạn
const createMockData = (startDate: Dayjs, endDate: Dayjs): Employee[] => {
  const employees: Employee[] = [
    { name: "Nguyễn Văn A", id: "emp1", timeLogs: [] },
    { name: "Trần Thị B", id: "emp2", timeLogs: [] },
  ];

  const statuses: TimeLogStatus[] = [
    "đúng giờ",
    "đến muộn",
    "vắng mặt",
    "chưa điểm danh",
  ];

  for (
    let date = startDate;
    date.isBefore(endDate.add(1, "day"));
    date = date.add(1, "day")
  ) {
    employees.forEach((employee) => {
      const shift = employee.id === "emp1" ? "Ca sáng" : "Ca đêm";
      let status: TimeLogStatus = "chưa điểm danh";
      let arrivalTime = "";
      let departureTime = "";
      let note = "Chưa điểm danh";

      if (!date.isSame(endDate, "day")) {
        status = statuses[
          Math.floor(Math.random() * statuses.length)
        ] as TimeLogStatus;
        arrivalTime =
          status === "đúng giờ"
            ? shift === "Ca sáng"
              ? "07:00"
              : "19:00"
            : status === "đến muộn"
            ? shift === "Ca sáng"
              ? "07:15"
              : "19:15"
            : "";
        departureTime = shift === "Ca sáng" ? "19:00" : "07:00";
        note =
          status === "đúng giờ"
            ? "Đúng giờ"
            : status === "đến muộn"
            ? `Đến muộn ${calculateDelay(arrivalTime, shift)}`
            : "Vắng mặt";
      }

      employee.timeLogs.push({
        date: date.clone(),
        shift,
        status,
        employeeId: employee.id,
        arrivalTime,
        departureTime,
        note,
      });
    });
  }

  return employees;
};

const calculateDelay = (arrivalTime: string, shift: string): string => {
  if (!arrivalTime) return "N/A";

  const expectedArrival = shift === "Ca sáng" ? "07:00" : "19:00";
  const arrival = dayjs(`1970-01-01 ${arrivalTime}`);
  const expected = dayjs(`1970-01-01 ${expectedArrival}`);

  const delay = arrival.diff(expected, "minute");

  return `${delay} phút`;
};

const TimeLogCell: React.FC<{
  log?: TimeLog;
  employee?: Employee;
  selectedStatuses: TimeLogStatus[];
}> = ({ log, employee, selectedStatuses }) => {
  const today = dayjs();
  const isToday = log?.date.isSame(today, "day");
  const isFuture = log?.date.isAfter(today, "day");

  if (isFuture) {
    return (
      <div
        style={{
          backgroundColor: "#dddddd",
          padding: "4px 8px",
          borderRadius: "4px",
          height: "76px",
          display: "flex",
        }}
      >
        <div>{employee?.name || "Chưa có dữ liệu"}</div>
      </div>
    );
  }

  if (!log || !selectedStatuses.includes(log.status)) {
    return (
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "4px 8px",
          borderRadius: "4px",
          height: "76px",
          opacity: 0.5,
        }}
      >
        <div>{employee?.name || "Không có dữ liệu"}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: statusColors[log.status],
        padding: "4px 4px",
        borderRadius: "4px",
      }}
    >
      <div>{employee?.name || "Chưa có dữ liệu"}</div>
      {!isFuture && (
        <>
          {log?.status === "đúng giờ" && (
            <>
              <div>
                {log?.arrivalTime} - {log?.departureTime}
              </div>
              <div>{log?.note || ""}</div>
            </>
          )}
          {log?.status === "đến muộn" && (
            <>
              <div>
                {log?.arrivalTime} - {log?.departureTime}
              </div>
              <div>{log?.note || ""}</div>
            </>
          )}
          {log?.status === "vắng mặt" && (
            <>
              <div>-- --</div>
              <div>Vắng mặt</div>
            </>
          )}
          {log?.status === "chưa điểm danh" && (
            <>
              <div>-- --</div>
              <div>Chưa chấm công</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const StatusLegend: React.FC<{
  selectedStatuses: TimeLogStatus[];
  onToggleStatus: (status: TimeLogStatus) => void;
}> = ({ selectedStatuses, onToggleStatus }) => {
  return (
    <div
      style={{
        marginTop: 16,
        display: "flex",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", gap: 16 }}>
        {Object.entries(statusColors).map(([status, color]) => (
          <Button
            key={status}
            onClick={() => onToggleStatus(status as TimeLogStatus)}
            style={{
              backgroundColor: selectedStatuses.includes(
                status as TimeLogStatus
              )
                ? color
                : "#ffffff",
              border: "1px solid #d9d9d9",
              padding: "4px 12px",
              opacity: selectedStatuses.includes(status as TimeLogStatus)
                ? 1
                : 0.5,
            }}
          >
            {status.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
};

const TableHeader: React.FC<{
  weekDates: Dayjs[];
  viewType: "shift" | "employee";
}> = ({ weekDates, viewType }) => {
  const today = dayjs();

  return (
    <tr>
      <th style={{ padding: 12, border: "1px solid #f0f0f0", width: 120 }}>
        {viewType === "shift" ? "Ca làm việc" : "Nhân viên"}
      </th>
      {weekDates.map((date, index) => {
        const isToday = date.isSame(today, "day");

        return (
          <th
            key={index}
            style={{
              padding: 12,
              border: "1px solid #f0f0f0",
              color: isToday ? "#d48806" : undefined,
              fontWeight: isToday ? "bold" : undefined,
            }}
          >
            {date.format("dddd DD")}
          </th>
        );
      })}
    </tr>
  );
};

const EmployeeAttended: React.FC<EmployeeAttendedProps> = ({
  initialDate = dayjs(),
  onDateChange,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    initialDate.startOf("isoWeek")
  );
  const [employees] = useState<Employee[]>(
    createMockData(dayjs("2025-01-01"), dayjs("2025-01-31"))
  );
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");
  const [viewType, setViewType] = useState<"shift" | "employee">("shift");
  const [selectedStatuses, setSelectedStatuses] = useState<TimeLogStatus[]>([
    "đúng giờ",
    "đến muộn",
    "vắng mặt",
    "chưa điểm danh",
  ]);

  const handleStatusToggle = (toggledStatus: TimeLogStatus) => {
    setSelectedStatuses((prev) => {
      if (prev.includes(toggledStatus)) {
        return prev.filter((status) => status !== toggledStatus);
      } else {
        return [...prev, toggledStatus];
      }
    });
  };

  const filteredEmployees = useMemo(() => {
    if (selectedEmployee === "all") return employees;
    return employees.filter((emp) => emp.id === selectedEmployee);
  }, [employees, selectedEmployee]);

  const weekDates = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, index) =>
        currentWeekStart.add(index, "day")
      ),
    [currentWeekStart]
  );

  const employeeLogsMap = useMemo(() => {
    const map = new Map<string, TimeLog[]>();
    employees.forEach((emp) => {
      map.set(
        emp.id,
        emp.timeLogs.filter((log) => selectedStatuses.includes(log.status))
      );
    });
    return map;
  }, [employees, selectedStatuses]);

  const handleWeekChange = (direction: "prev" | "next") => {
    const newDate =
      direction === "prev"
        ? currentWeekStart.subtract(1, "week")
        : currentWeekStart.add(1, "week");
    setCurrentWeekStart(newDate);
    onDateChange?.(newDate);
  };

  const renderShiftView = () => (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
      }}
    >
      <thead>
        <TableHeader weekDates={weekDates} viewType={viewType} />
      </thead>
      <tbody>
        {["Ca sáng", "Ca đêm"].map((shift) => (
          <tr key={shift}>
            <td
              style={{
                padding: 12,
                border: "1px solid #f0f0f0",
                width: "120px",
              }}
            >
              {shift}
              <div style={{ fontSize: 12, color: "#888" }}>
                {shift === "Ca sáng" ? "07:00 - 19:00" : "19:00 - 07:00"}
              </div>
            </td>
            {weekDates.map((date, index) => {
              const relevantEmployee = filteredEmployees.find((emp) =>
                emp.timeLogs.some(
                  (log) => log.date.isSame(date, "day") && log.shift === shift
                )
              );
              const log = relevantEmployee?.timeLogs.find(
                (log) => log.date.isSame(date, "day") && log.shift === shift
              );

              return (
                <td
                  key={index}
                  style={{
                    padding: 12,
                    border: "1px solid #f0f0f0",
                    width: "120px",
                  }}
                >
                  <TimeLogCell
                    log={log}
                    employee={relevantEmployee}
                    selectedStatuses={selectedStatuses}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderEmployeeView = () => (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
      }}
    >
      <thead>
        <TableHeader weekDates={weekDates} viewType={viewType} />
      </thead>
      <tbody>
        {filteredEmployees.map((employee) => (
          <tr key={employee.id}>
            <td
              style={{
                padding: 12,
                border: "1px solid #f0f0f0",
                width: "120px",
              }}
            >
              {employee.name}
            </td>
            {weekDates.map((date, index) => {
              const log = employeeLogsMap
                .get(employee.id)
                ?.find((log) => log.date.isSame(date, "day"));

              return (
                <td
                  key={index}
                  style={{
                    padding: 12,
                    border: "1px solid #f0f0f0",
                    width: "120px",
                  }}
                >
                  <TimeLogCell
                    log={log}
                    employee={employee}
                    selectedStatuses={selectedStatuses}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Space>
            <Select
              style={{ width: 200 }}
              placeholder="Xem theo nhân viên"
              value={selectedEmployee}
              onChange={setSelectedEmployee}
            >
              <Select.Option value="all">Tất cả nhân viên</Select.Option>
              {employees.map((emp) => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              value={viewType}
              style={{ width: 120 }}
              onChange={setViewType}
            >
              <Select.Option value="shift">Xem theo ca</Select.Option>
              <Select.Option value="employee">Xem theo nhân viên</Select.Option>
            </Select>
          </Space>
        </div>

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

        {viewType === "shift" ? renderShiftView() : renderEmployeeView()}
        <StatusLegend
          selectedStatuses={selectedStatuses}
          onToggleStatus={handleStatusToggle}
        />
      </div>
    </div>
  );
};

export default EmployeeAttended;
