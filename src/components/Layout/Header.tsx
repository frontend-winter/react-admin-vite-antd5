import { Avatar, Badge, Dropdown, Layout as LayoutAntd, Space } from "antd";
import styles from "./index.module.scss";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUserInitialState } from "@/store/reducers/user";
import Texty from "rc-texty";
import "rc-texty/assets/index.css";
import { AuthContext } from "@/common/context";
import { currentTimeRange } from "@/common/utils/common";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signOut } = useContext(AuthContext);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Sign out",
      onClick: async () => {
        await signOut(dispatch);
        navigate("/login");
      },
    },
  ];

  const { user } = useSelector(state => state) as { user: IUserInitialState };
  const text = `${currentTimeRange()}，吴彦祖，祝你开心每一天！`;

  return (
    <LayoutAntd.Header className={styles.header}>
      <Space align={"center"}>
        <Avatar
          src={
            "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          }
        />

        <Texty interval={100} mode={"smooth"} className={styles.markedWords}>
          {text}
        </Texty>
      </Space>
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
