import {useState} from "react";
import {
  Col,
  Row,
  Avatar,
  Card,
  Spin,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  message,
  TextArea,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  TASK,
} from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Post } from "../../config/api/post";
import { FaArrowLeftLong } from "react-icons/fa6";
import swal from "sweetalert";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import moment from "moment";

const CreateTask = () => {
  const [form] = Form.useForm();
  // const [user, setUser] = useState(null);
  // const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [isBanned, setIsBanned] = useState(false);
  const token = useSelector((state) => state.user.userToken);
  console.log(token, "token10")
  const navigate = useNavigate();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onFinish = (values) => {
    console.log(values, "values2");
    let data = new FormData();
    
    data.append("title", values?.title);
    data.append("description", values?.description);
    data.append("date", moment(values?.date?.$d).format("YYYY-MM-DD"));
    
    Post(TASK.addTask, data, token)
      .then((response) => {
        console.log(response, "response1")
        if (response) {
          form.resetFields();
          swal("System Alert!", response?.message, "success");
          navigate("/taskManagement");
        }
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message;
        if (message) {
          swal("Error!", message, "error");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { TextArea } = Input;
  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <DashbordSidebar />
                    {!loading ? (
                      <div className="about-us-section">
                        <Row align={"middle"} style={{ marginBottom: "15px" }}>
                          <Col lg={24}>
                            <div class="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="main-heading">Create Task</h3>
                            </div>
                          </Col>
                        </Row>

                        <div className="bg-parent">
                          <Row gutter={[16, 16]} align={""} justify={"center"}>
                            <Col md={14} lg={12} xl={16}>
                              <div className="">
                                <div className="logo-rectangle">
                                  <div className="edit-profile-info">
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
                                        style={{ width: "100%" }}
                                        gutter={[16, 16]}
                                      >
                                        <Col xs={24}>
                                          <Form.Item
                                            label="Task Title"
                                            name="title"
                                            required={true}
                                          >
                                            <Input
                                              size="large"
                                              placeholder="Enter Task Title"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                          <Form.Item
                                            label="Description"
                                            name="description"
                                            required={true}
                                          >
                                            <TextArea
                                              rows={4}
                                              placeholder="Description"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Date"
                                            name="date"
                                            required={true}
                                          >
                                            <DatePicker
                                              onChange={onChange}
                                              size="large"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        
                                        <div
                                          style={{
                                            textAlign: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            display: "flex",
                                          }}
                                        >
                                          <Button
                                            type=""
                                            htmlType="submit"
                                            className="btn web-btn px-5"
                                          >
                                            CREATE TASK{" "}
                                            <BsArrowUpRightCircleFill />
                                          </Button>
                                        </div>
                                      </Row>
                                    </Form>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Spin style={{ margin: "250px 600px" }} />
                      </div>
                    )}
                  </section>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreateTask;