import React, { useState } from "react";
import {
  Layout,
  Col,
  Row,
  Button,
  Form,
  Input,
  Checkbox,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { USER_AUTH } from "../../config/constants/api";
import { addUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import { Get } from "../../config/api/get";
// import socket from "../../config/socket";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

function SignUp() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log('skhdn', values)
    let data = new FormData();
    data.append("password", values?.password);
    data.append("firstName", values?.firstName);
    data.append("lastName", values?.lastName);
    data.append("email", values?.email);
    data.append("mobile", values?.mobile);
    Post(USER_AUTH.signup, data)
      .then((response) => {
        console.log(response, "response2");
        setLoading(false);
        dispatch(
          addUser({ user: response.data?.user, token: response.data?.token })
        );
        swal("Success!", response?.message, "success");
        navigate("/createProfile");
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        setLoading(false);
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout
      className=""
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <div className="auth-banner">
        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Col xs={23} md={18} lg={15}>
            <div className="auth-box mb-50 mt-50">
              <div className="blur-bg-inner-card-form">
                <h2 className="auth-heading">CREATE AN ACCOUNT</h2>
                <p className="auth-p">Fill out this form to signup</p>
                <Form
                  className="row g-3"
                  name="basic"
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  form={form}
                >
                  <Row
                    style={{ width: "100%", justifyContent: "center" }}
                    gutter={[16, 16]}
                  >
                    <Col lg={12}>
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter First Name"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Enter Last Name",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Email Address"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                          {
                            type: "email",
                            message: "Please enter a valid email address!",
                          },
                          {
                            required: true,
                            message: "Please enter your email address!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="James.Anderson@gmail.com"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Phone Number"
                        name="mobile"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone number!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Phone Number"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Enter Password",
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Enter Password"
                          className="web-input"
                          style={{
                            borderRadius: "5px",
                            fontSize: "14px",
                            paddingRight: "10px",
                            backgroundColor: "transparent",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("The two passwords do not match!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Confirm Password"
                          className="web-input"
                          style={{
                            borderRadius: "5px",
                            fontSize: "14px",
                            paddingRight: "10px",
                            backgroundColor: "transparent",
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <div
                        className=""
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="mainbtn"
                          style={{
                            cursor: "pointer",
                            paddingRight: "60px",
                            paddingLeft: "60px",
                          }}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </Col>
                    <div
                      className="already-account-text"
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      Already Have An Account?{" "}
                      <span onClick={() => navigate("/login")}>Login</span>{" "}
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default SignUp;
