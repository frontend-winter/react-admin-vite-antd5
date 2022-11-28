import styles from "./index.module.scss";
import { Link } from "react-router-dom";

export function Logo(props: { collapsed: boolean }) {
  return (
    <div className={styles.logo}>
      <Link to={"/"}>
        {props.collapsed ? (
          <div className={styles.visible}>admin</div>
        ) : (
          <div className={styles.visible}>react-admin-vite-antd5</div>
        )}
      </Link>
    </div>
  );
}
