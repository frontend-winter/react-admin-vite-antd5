import { Avatar, Badge, Dropdown, Layout as LayoutAntd, Space } from "antd";
import styles from "./index.module.scss";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/AuthProvider";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { IUserInitialState } from "@/store/reducers/user";

export function Header() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign out",
      onClick: async () => {
        await authContext.signOut();
        navigate("/login");
      },
    },
  ];

  const { user } = useSelector(state => state) as { user: IUserInitialState };

  return (
    <LayoutAntd.Header className={styles.header}>
      <div />
      <div>
        <Space size={"large"}>
          <Badge count={5}>
            <BellOutlined style={{ fontSize: 20 }} />
          </Badge>
          <Dropdown menu={{ items }}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                {(user.token as unknown as { username: string })?.username}
                <Avatar src="https://joeschmoe.io/api/v1/random" />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
      </div>
    </LayoutAntd.Header>
  );
}
