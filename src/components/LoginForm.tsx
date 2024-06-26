import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";

import "../pages/Login/Login.css";

const LoginForm: React.FC = () => {
  const postFormData = async (url: string, formData: any) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      return { data, status: response.ok };
    } catch (error: any) {
      console.error("Error:", error);
      return { error: error.message, status: false };
    }
  };

  const onFinish = async (values: any) => {
    try {
      const { data, status } = await postFormData(
        "http://localhost:8000/api/user/login",
        values
      );
      if (status) {
        // Successful login
        message.success("Login successful!");
        console.log("Logged in successfully");

        // Redirect to the dashboard or any other page
      } else {
        // Failed login
        message.error(data.message || "Login failed");
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
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
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="login-checkbox">Remember me</Checkbox>
          <a className="login-form-forgot" href="/forgotpassword">
            Forgot password
          </a>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ backgroundColor: "#04c45c" }}
        >
          Log in
        </Button>

        <a href="/signup" className="registration">
          Register now!
        </a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
