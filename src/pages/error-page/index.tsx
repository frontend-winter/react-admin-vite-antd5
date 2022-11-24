import { useRouteError } from "react-router-dom";


import React from "react";
import styles from "./index.module.scss";


function ErrorPage() {
  const error= useRouteError() as {statusText?: string, message?: string} ;
  console.error(error);
  
  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;