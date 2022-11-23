import Logo from "@/assets/logo.png";
import HelloWorld from "@/components/HelloWorld/HelloWorld";

import styles from "./App.module.css";

export default function App() {
  return (
    <main className={styles.main}>
      <img className={styles.logo} alt="React logo" width="400px" src={Logo} />
      <HelloWorld msg="Hello React + TypeScript + Vite" />
    </main>
  );
}
