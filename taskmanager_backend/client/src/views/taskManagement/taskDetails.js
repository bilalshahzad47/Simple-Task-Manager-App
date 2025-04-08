import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  TextArea,
  Button,
  Layout,
  Skeleton,
  DatePicker,
  Radio,
} from "antd";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import moment from "moment";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TASK } from "../../config/constants/api";
import { extractDate } from "../../config/helpers";
import { Put } from "../../config/api/put";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import DashbordSidebar from "../../components/DashboardSidebar";


function TaskDetails() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [task, setTask] = useState(null);

  const getTask = () => {
    setLoading(true);
    Get(`${TASK.getTaskById}${id}`, token, null)
      .then((response) => {
        console.log(response, "response19");
        setTask(response?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching user details", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTask();
  }, []);

  const onFinish = (values) => {
    console.log(values, "values15");
    Put(TASK.updateTask + id, token, values, null)
      .then((response) => {
        setLoading(false);
        console.log(response, "response22");
        if (response) {
          swal("Success", "Task updated successfully", "success");
          navigate(-1);
        } else {
          swal(
            "Oops!",
            response?.data?.message || response?.response?.data?.message,
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(":::;", e);
        setLoading(false);
      });
  };

  const [status, setStatus] = useState(task?.status);

  useEffect(() => {
    setStatus(task?.status);
  }, [task]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    completedTask(task._id, newStatus);
  };

  const completedTask = (id, status) => {
    Put(`${TASK.updateTaskStatus}${id}`, token, { status }, null)
      .then((response) => {
        console.log(response, "response11");
        if (response.status) {
          swal("System Alert!", response?.message, "success");
        }
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };

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
                    <div className="about-us-section">
                    <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={16}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px", color: "black" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageName" style={{ margin: 0 }}>
              {editMode ? "UPDATE" : "VIEW"} Task
            </h1>
          </Col>
          <Col
            xs={24}
            md={8}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <Radio.Group
              value={status}
              onChange={handleStatusChange}
              style={{ marginBottom: "10px" }}
            >
              <Radio.Button value="TODO">TODO</Radio.Button>
              <Radio.Button value="INPROGRESS">IN PROGRESS</Radio.Button>
              <Radio.Button value="DONE">DONE</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <br />
        {loading ? (
          <div style={{ padding: "30px" }}>
            <Skeleton.Image active /> <br />
            <br /> <Skeleton active /> <br />
            <br /> <Skeleton active /> <br />
            <br /> <Skeleton.Button active />
          </div>
        ) : (
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={16}>
              <Row style={{ padding: "10px" }}>
                <Col xs={24} md={14}>
                  <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    onFinish={onFinish}
                  >
                    {editMode ? (
                      <>
                        <Form.Item
                          label="Title"
                          name="title"
                          initialValue={task?.title}
                          rules={[
                            {
                              required: true,
                              message: "Please input task title!",
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter Task Title"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "12px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Description"
                          name="description"
                          initialValue={task?.description}
                          rules={[
                            {
                              required: true,
                              message: "Please input task Description!",
                            },
                          ]}
                        >
                          <TextArea
                            rows={5}
                            suffix="days"
                            size="large"
                            placeholder="Enter Task Description"
                            style={{
                              borderRadius: "5px",
                              background: "white",
                              fontSize: "14px",
                              padding: "12px 20px",
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Task End Date"
                          name="date"
                          initialValue={task?.date ? moment(task.date) : null}
                          rules={[
                            {
                              required: true,
                              message: "Please enter your Task End Date",
                            },
                          ]}
                        >
                          <DatePicker className="web-input" />
                        </Form.Item>
                        <br />
                        <Row justify="">
                          <Form.Item>
                            
                            <Button
                              type="button"
                              htmlType="submit"
                              size={"large"}
                              style={{ padding: "12px 40px", height: "auto" }}
                              className="btn web-btn px-5"
                            >
                              UPDATE
                              <BsArrowUpRightCircleFill />
                            </Button>
                          </Form.Item>
                          &emsp;
                          <Button
                            type="button"
                            htmlType="button"
                            size="large"
                            ghost
                            style={{
                              padding: "10px 40px",
                              // height: "43px",
                              height: "50px",
                              width: "144px",
                              borderColor: "#aeafaf",
                              color: "#aeafaf",
                            }}
                            className="mainButton cancelBtn"
                            onClick={() => setEditMode(false)}
                          >
                            CANCEL
                          </Button>
                        </Row>{" "}
                      </>
                    ) : (
                      <>
                        <Row style={{ padding: "10px" }} align={"top"}>
                          <Col xs={12} flex={"auto"}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Task Title:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {task?.title}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }} align={"top"}>
                          <Col xs={12} flex={"auto"}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Task Description:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {task?.description}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }} align="top">
                          <Col xs={12}>
                            <Typography.Title
                              level={4}
                              style={{ fontSize: "18px", marginTop: 0 }}
                            >
                              Task Date:
                            </Typography.Title>
                          </Col>
                          <Col xs={12}>
                            <Typography.Text style={{ fontSize: "16px" }}>
                              {extractDate(task?.date)}
                            </Typography.Text>
                          </Col>
                        </Row>
                        <br />
                        <Row style={{ padding: "10px" }}>
                          <Button
                            type="button"
                            htmlType="button"
                            size={"large"}
                            style={{ padding: "12px 40px", height: "auto" }}
                            className="btn web-btn px-5"
                            onClick={() => setEditMode(true)}
                          >
                            EDIT TASk
                            <BsArrowUpRightCircleFill />
                          </Button>
                        </Row>
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        </div>
                   </section>
                </div>
               </Col>
            </Row>
          </div>
        </Col>
       </Row>
    </div>             
      
  );
}
export default TaskDetails;
