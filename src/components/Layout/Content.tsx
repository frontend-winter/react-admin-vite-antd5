import { Breadcrumb, Layout as LayoutAntd } from "antd";
import styles from "./index.module.scss";
import KeepAlive from "@/common/hocs/keepAlive";
import { Link } from "react-router-dom";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

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
        <ErrorBoundary>
          <KeepAlive include={[]} keys={[]} />
        </ErrorBoundary>
      </div>
    </LayoutAntd.Content>
  );
}
