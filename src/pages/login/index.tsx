import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { setUserToken } from "@/store/actions";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const onFinish = (values: any) => {
    // console.log("Received values of form: ", values);
    dispatch(setUserToken(JSON.stringify(values)));
    navigator("/");
  };

  const [form] = Form.useForm();

  return (
    <div id={styles.loginContainer}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
        form={form}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Log in
          </Button>
          Or{" "}
          <a
            onClick={() => {
              form.resetFields();
            }}
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
