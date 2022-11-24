import { Avatar, Dropdown, Layout as LayoutAntd, Space } from "antd";
import styles from "@/components/Layout/index.module.scss";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { redirect, useNavigate } from "react-router-dom";
import { removeStorage } from "@/common/utils/storage";
import { TOKEN } from "@/common/utils/contans";

export function Header() {
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign out",
      onClick: () => {
        navigate("/login");
        removeStorage(TOKEN);
        // return redirect('/login')
      },
    },
  ];

  return (
    <LayoutAntd.Header className={styles.header}>
      <div />
      <div>
        <Space>
          <BellOutlined style={{ fontSize: 20 }} />
          <Dropdown menu={{ items }}>
            <a onClick={e => e.preventDefault()}>
              <Space>
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
