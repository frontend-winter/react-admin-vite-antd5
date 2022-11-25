import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export function Logo(props: { collapsed: boolean }) {
  return (
    <div className={styles.logo}>
      <Link to={"/"}>
        {props.collapsed ? (
          <div className="show">admin</div>
        ) : (
          <div className={"hidden"}>react-admin-vite-antd5</div>
        )}
      </Link>
    </div>
  );
}
