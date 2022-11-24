import { Breadcrumb, Layout as LayoutAntd } from "antd";
import styles from "@/components/Layout/index.module.scss";
import KeepAlive from "@/common/hocs/keepAlive";

export function Content() {
  return <LayoutAntd.Content style={{ margin: "0 16px" }}>
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
    <div
      id="content"
      className={styles.content}
      style={{ padding: 24, minHeight: 360 }}
    >
      <KeepAlive
        include={["/center/sys/user", "/center/sys/role"]}
        keys={[]} />
    </div>
  </LayoutAntd.Content>;
}