import React, { FC, useEffect, useState } from "react";
import { Dropdown, Menu, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface listTypeIDProps {
    roomData?: {
        type_id: string;
    };
    onSelectType: (typeId: string) => void; // Thêm prop để truyền hàm chọn loại phòng
}

export const ListTypeID: FC<listTypeIDProps> = ({
    roomData,
    onSelectType, // Nhận hàm chọn loại phòng
}) => {
    const [typeIDs, setTypeIDs] = useState<string[]>([]);

    useEffect(() => {
        if (roomData && roomData.type_id) {
            const storedTypeIDs = localStorage.getItem("listTypeID");
            const newTypeID = { type_id: roomData.type_id };

            if (storedTypeIDs) {
                const parsedTypeIDs = JSON.parse(storedTypeIDs);
                if (!parsedTypeIDs.some((item: { type_id: string }) => item.type_id === newTypeID.type_id)) {
                    parsedTypeIDs.push(newTypeID);
                    localStorage.setItem("listTypeID", JSON.stringify(parsedTypeIDs));
                }
            } else {
                localStorage.setItem("listTypeID", JSON.stringify([newTypeID]));
            }
        }
    }, [roomData]);

    useEffect(() => {
        const storedTypeIDs = localStorage.getItem("listTypeID");
        if (storedTypeIDs) {
            const parsedTypeIDs = JSON.parse(storedTypeIDs);
            setTypeIDs(parsedTypeIDs.map((item: { type_id: string }) => item.type_id));
        }
    }, []);

    const menu = (
        <Menu>
            {typeIDs.map((id, index) => (
                <Menu.Item key={index} onClick={() => onSelectType(id)}> 
                    <Text>{id}</Text>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <span style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Text>{roomData?.type_id || "Chọn loại phòng"}</Text>
                <DownOutlined style={{ marginLeft: 8 }} />
            </span>
        </Dropdown>
    );
};

export default ListTypeID;