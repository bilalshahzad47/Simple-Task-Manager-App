import React from "react";
import { Layout, Col, Row, Button, Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { PROFILE, USER_AUTH } from "../../config/constants/api";
import { addUser , addProfileDetails } from "../../redux/slice/authSlice";
import swal from "sweetalert";
// import socket from "../../config/socket";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  // useEffect if user is already logged in
  // React.useEffect(() => {
  //   if (user && token) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user, token]);


  const onFinish = (values) => {
    setLoading(true);
    let data = {
      email: values.email,
      password: values.password,
    };
    Post(USER_AUTH.login, data)
      .then((response) => {
        console.log(response, "response3");
          if(response?.data){
            setLoading(false);
            dispatch(
              addUser({ user: response?.data?.user, token: response?.data?.token })
            );
            navigate("/");
          }
          else{
            setLoading(false);
            swal("Error",'Invalid Credentials!', 'error')
          }
        // socket.emit("setupAdmin", response?.data?.user);
      })
      .catch((err) => {
        let message = err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.message;
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
          <Col lg={8}>
            <div className="auth-box">
              <h2 className="auth-heading">Login</h2>
              <p className="auth-p">
                Enter your credentials to log in to the platform
              </p>
              <Form
                layout="vertical"
                name="basic"
                labelCol={{
                  span: 0,
                }}
                wrapperCol={{
                  span: 24,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please input valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter Email Address"
                    className="web-input"
                    
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      type: "string",
                      min: 8,
                      message: "password must be atleast 8 characters!",
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
                    }}
                  />
                </Form.Item>
                <Row>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Button
                      type="link"
                      className="forgot-text"
                      style={{
                        float: "right",
                      }}
                      onClick={() => navigate("/forget-password-1")}
                    >
                      Forgot Password?
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row justify={"center"}>
                  <Col>
                  <Form.Item style={{ textAlign: "center", margin: "0" }}>
                  <Button
                    type="submit"
                    htmlType="submit"
                    className="web-btn"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {loading ? "Loading..." : "Login"}
                    <BsArrowUpRightCircleFill />
                  </Button>
                </Form.Item>
                </Col>
                </Row>
                
                <div
               
                  style={{ textAlign: "center" , marginTop:"5px" }}
                >
                  Don't have an account? 
                  <span onClick={() => navigate("/signUp")} style={{cursor : 'pointer' , marginLeft:'4px'}}    className="already-account-text" >
                    Sign Up
                  </span>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Login;
