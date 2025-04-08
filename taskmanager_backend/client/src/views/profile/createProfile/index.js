import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import DashbordSidebar from "../../../components/DashboardSidebar";
// import "react-phone-number-input/style.css";
import swal from "sweetalert";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Get } from "../../../config/api/get";
import { PROFILE, USER_AUTH } from "../../../config/constants/api";
import { Post } from "../../../config/api/post";
import { addProfileDetails } from "../../../redux/slice/authSlice";
import moment from "moment";
import { useNavigate } from "react-router";
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const DropzoneFiltercards = () => {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.user.userToken);
  const profileDetails = useSelector((state) => state.user.profileDetails);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageObject, setImageObject] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  // const getAccountInfo = () => {
  //   Get(USER_AUTH.getAccountDetails, token)
  //     .then((response) => {
  //       setAccountDetails(response?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, "Error");
  //     });
  // };
  // useEffect(() => {
  //   if (profileDetails) {
  //     navigate("/profile");
  //   }
  // }, []);
  const onFinish = (values) => {
    let { Country, City, State, Street, Gender, DateOfBirth } = values;
    let data = new FormData();
    data.append("image", imageObject);
    data.append(
      "fullName",
      userData?.firstName + " " + userData?.lastName
    );
    data.append("email", userData?.email);
    data.append("phone", userData?.mobile);
    data.append("gender", Gender);
    data.append(
      "location",
      JSON.stringify({
        country: Country,
        city: City,
        state: State,
        street: Street,
      })
    );
    data.append("dateOfBirth", moment(DateOfBirth?.$d).format("YYYY-MM-DD"));
    Post(PROFILE.createProfile, data, token, null, "multipart")
      .then((response) => {
        form.resetFields();
        if (response.status) {
          setImageUrl("");
          setImageObject(null);
          dispatch(addProfileDetails({ details: response?.data }));
          swal("Success", "Profile Created Successfully", "success");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        swal("Error", err?.response?.data?.message, "error");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleChangepro = (info) => {
    setLoading(true);
    getBase64(
      info?.fileList[info?.fileList?.length - 1]?.originFileObj,
      (url) => {
        setImageObject(
          info?.fileList[info?.fileList?.length - 1]?.originFileObj
        );
        setLoading(false);
        setImageUrl(url);
      }
    );
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        cursor: "pointer",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Invalid Uplaod, You can only upload image files!");
    }
    return isImage;
  };
  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            {/* <Row> */}
              {/* <Col xs={24} md={24} lg={24} xl={24}> */}
                {/* <div className="my-account-profile"> */}
                  {/* <section className="side-menu-parent"> */}
                    {/* <DashbordSidebar /> */}
                    <div className="about-us-section">
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">Create Profile</h3>
                      </div>
                      <div className="bg-parent">
                        <Row
                          gutter={[16, 16]}
                          align={""}
                          justify={"space-between"}
                        >
                          <Col md={10} lg={10} xl={8}>
                            <div className="wrapper-group-1000001858">
                              <Upload
                                name="image"
                                showUploadList={false}
                                style={{ position: "relative" }}
                                onChange={handleChangepro}
                                beforeUpload={beforeUpload}
                              >
                                {" "}
                                <div
                                  style={{
                                    height: "300px",
                                    border: "1px solid gray",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  {imageUrl ? (
                                    <img
                                      src={imageUrl}
                                      alt="avatar"
                                      style={{
                                        width: "100%",
                                        height: "360px",
                                        objectPosition: "center",
                                        objectFit: "cover",
                                      }}
                                    />
                                  ) : (
                                    uploadButton
                                  )}
                                </div>{" "}
                              </Upload>
                            </div>
                          </Col>
                          {/* <div>
                                <div>
                                  <input
                                    id="media"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                  />
                                </div>
                                <div style={{ marginTop: "1rem" }}>
                                  {imageObject ? (
                                    <div>
                                      <img
                                        src={URL.createObjectURL(imageObject)}
                                        alt="Preview"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight: "200px",
                                          objectFit: "cover",
                                          objectPosition: "center",
                                        }}
                                      />
                                      <button
                                        onClick={() => {
                                          setImageObject(null);
                                        }}
                                      >
                                        Remove Image
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        textAlign: "center",
                                        border: "2px solid black",
                                        height: "300px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                      }}
                                      onClick={() =>
                                        document.getElementById("media").click()
                                      }
                                    >
                                      <MdOutlinePermMedia
                                        style={{
                                          fontSize: "48px",
                                          color: "grey",
                                        }}
                                      />
                                      <p>Upload</p>
                                    </div>
                                  )}
                                </div>
                              </div> */}
                          <Col md={14} lg={14} xl={16}>
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
                                  >
                                    <Row
                                      style={{ width: "100%" }}
                                      gutter={[16, 16]}
                                    >
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Full Name"
                                          name="FullName"
                                          rules={[
                                            {
                                              required: false,
                                              message:
                                                "Please enter your Full Name!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder={
                                              userData?.firstName +
                                              " " +
                                              userData?.lastName
                                            }
                                            className="web-input"
                                            disabled
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Email"
                                          name="Email"
                                          rules={[
                                            {
                                              required: false,
                                              message:
                                                "Please enter your Email!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder={userData?.email}
                                            className="web-input"
                                            disabled
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Phone Number"
                                          name="Phone Number"
                                          rules={[
                                            {
                                              required: false,
                                              message:
                                                "Please enter your Phone Number!",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder={userData?.mobile}
                                            className="web-input"
                                            disabled
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Gender"
                                          name="Gender"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Please select Gender",
                                            },
                                          ]}
                                        >
                                          <Select placeholder="Select">
                                            <Select.Option value="MALE">
                                              Male
                                            </Select.Option>
                                            <Select.Option value="FEMALE">
                                              Female
                                            </Select.Option>
                                            <Select.Option value="OTHERS">
                                              Others
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Country"
                                          name="Country"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Enter Country",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder="Enter Country"
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="City"
                                          name="City"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Enter City",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder="Enter City"
                                            name="city"
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="State"
                                          name="State"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Enter State ",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder="Enter State"
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Street"
                                          name="Street"
                                          rules={[
                                            {
                                              required: true,
                                              message: "Enter Street",
                                            },
                                          ]}
                                        >
                                          <Input
                                            size="large"
                                            placeholder="Enter street"
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={24} md={12} xs={24}>
                                        <Form.Item
                                          label="Date Of Birth"
                                          name="DateOfBirth"
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "Please enter your Date Of Birth!",
                                            },
                                          ]}
                                        >
                                          <DatePicker className="web-input" />
                                        </Form.Item>
                                      </Col>
                                      <div
                                        className=""
                                        style={{ textAlign: "center" }}
                                      >
                                        <Button
                                          type=""
                                          htmlType="submit"
                                          className={`btn ${
                                            !imageObject
                                              ? "web-btn3"
                                              : "web-btn"
                                          } px-5`}
                                          disabled={!imageObject}
                                          // onClick={handleChange}
                                        >
                                          create
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
                  {/* </section> */}
                {/* </div> */}
              {/* </Col> */}
            {/* </Row> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DropzoneFiltercards;
