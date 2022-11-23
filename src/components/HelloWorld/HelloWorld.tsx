import { useState } from "react";

import styles from "./HelloWorld.module.css";

interface HelloWorldProps {
  msg: string;
}

export default function HelloWorld(props: HelloWorldProps) {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);

  return (
    <div className={styles.HelloWorld}>
      <h1 data-testid="title">{props.msg}</h1>

      <p>
        Recommended IDE setup:{" "}
        <a
          href="https://code.visualstudio.com/"
          target="_blank"
          rel="noreferrer"
        >
          VSCode
        </a>
      </p>

      <p>
        See <code>README.md</code> for more information.
      </p>

      <p>
        <a
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noreferrer"
        >
          Vite Docs
        </a>{" "}
        |{" "}
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
          React Docs
        </a>
      </p>

      <button type="button" onClick={increment}>
        count is: {count}
      </button>
      <p>
        Edit
        <code>components/HelloWorld/HelloWorld.tsx</code> to test hot module
        replacement.
      </p>
    </div>
  );
}
