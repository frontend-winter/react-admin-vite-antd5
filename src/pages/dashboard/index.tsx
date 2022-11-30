import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      Dashboard
      <Button
        onClick={() => {
          // console.log(navigate());
          navigate({
            pathname: "/user",
          });
        }}
        type={"primary"}
      >
        user
      </Button>
    </div>
  );
}

export default Dashboard;
