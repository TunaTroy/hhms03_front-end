import React from "react";
import { Card, Button } from "antd";

const SalaryComponent: React.FC = () => {
  // Dữ liệu lương của nhân viên
  const salaryInfo = {
    salaryType: "Cố định",
    salaryAmount: 10000000,
    allowance: 0, // Không áp dụng
    deduction: 0, // Không áp dụng
  };

  const totalSalary =
    salaryInfo.salaryAmount + salaryInfo.allowance - salaryInfo.deduction;

  const fadedStyle = {
    opacity: 0.5,
  };

  const formatCurrency = (amount: number) => {
    return amount > 0 ? `${amount.toLocaleString()} VNĐ` : "0 VNĐ";
  };

  return (
    <Card
      style={{
        width: "600px",
        margin: "20px",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ fontSize: "16px", lineHeight: "1.5" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Loại lương:</strong>
          <span>{salaryInfo.salaryType}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Mức lương:</strong>
          <span>{formatCurrency(salaryInfo.salaryAmount)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Phụ cấp:</strong>
          <span
            style={{
              ...(salaryInfo.allowance === 0 ? fadedStyle : {}),
            }}
          >
            {formatCurrency(salaryInfo.allowance)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <strong>Giảm trừ:</strong>
          <span
            style={{
              ...(salaryInfo.deduction === 0 ? fadedStyle : {}),
            }}
          >
            {formatCurrency(salaryInfo.deduction)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <strong>Tổng lương:</strong>
          <span>{formatCurrency(totalSalary)}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          type="primary"
        >
          Cập nhật
        </Button>
      </div>
    </Card>
  );
};

export default SalaryComponent;
