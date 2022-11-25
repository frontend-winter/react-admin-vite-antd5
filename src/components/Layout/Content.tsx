import { Breadcrumb, Layout as LayoutAntd } from "antd";
import styles from "./index.module.scss";
import KeepAlive from "@/common/hocs/keepAlive";
import { Link } from "react-router-dom";

export function Content() {
  const pathSnippets = location.pathname.split("/").filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  // const breadcrumbItems = [
  //   <Breadcrumb.Item key="home">
  //     <Link to="/">Home</Link>
  //   </Breadcrumb.Item>,
  // ].concat(extraBreadcrumbItems);

  return (
    <LayoutAntd.Content style={{ margin: "0 16px" }}>
      <div className={styles.breadcrumb}>
        <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
      </div>
      <div
        id="content"
        className={styles.content}
        style={{ padding: 24, minHeight: 360 }}
      >
        <KeepAlive
          include={["/center/sys/user", "/center/sys/role"]}
          keys={[]}
        />
      </div>
    </LayoutAntd.Content>
  );
}