import { useState, useEffect } from "react";
import { Col, Row, Image, Divider } from "antd";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
// import dicon from "../../assets/d-icon.png";
// import dicon2 from "../../assets/d-icon2.png";
// import dicon3 from "../../assets/d-icon3.png";
// import dicon4 from "../../assets/d-icon4.png";
// import dicon5 from "../../assets/d-icon5.png";
// import dicon6 from "../../assets/d-icon6.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Get } from "../../config/api/get";
import { ADMIN } from "../../config/constants/api";
import { BsArrowLeftRight } from "react-icons/bs";

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);
ChartJS.register(BarElement);
ChartJS.register(Title);
ChartJS.register(Tooltip);
ChartJS.register(Legend);

const data = {
  labels: [
    "Nov 2015",
    "March 2016",
    "July 2017",
    "August 2018",
    "Sep 2019",
    "Oct 2020",
    "July 2021",
  ],
  datasets: [
    {
      label: "Users",
      data: [30000, 20000, 30000, 25000, 35000, 49000, 40000],
      fill: true,
      backgroundColor: "rgba(157,98,245,0.2)",
      borderColor: "#9D62F5",
      pointRadius: 3,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Users",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Dashboard = () => {
  const token = useSelector((state) => state?.user?.userToken);
  console.log(token, "token2");

  const [info, setInfo] = useState(null);
  
  const getDashboardInfo = () => {
    Get(ADMIN.dashboardInfo, token)
      .then((response) => {
        console.log(response, "response4")
        if (response) {
          setInfo(response?.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching dashboard info ", err);
      });
  };
  useEffect(() => {
    getDashboardInfo();
  }, []);

  return (
    <div className="shop-page">
      <Row style={{ justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <DashbordSidebar />
                    <div className="about-us-section">
                      <div className="">
                        <h3 className="heading-28">Dashboard</h3>
                      </div>
                    <Row>
                      <Col xs={24}>
                        <div  style={{ background: "#fff", padding:"20px", borderRadius:"10px" }}>
                        <Row  gutter={[16, 0]}>
                        <Col xs={24} md={12} lg={8}>
                          <div className="boxDetails analytics1 bg-parent dashboard-right-card">
                            <Row
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={15} md={18}>
                                <h4
                                  className="analyticsText"
                                  style={{ margin: 0 }}
                                >
                                  Number of Users
                                </h4>
                                
                              </Col>
                              {/* <Col xs={7} md={6}>
                                <div className="analyticsIcon">
                                  <Image
                                    src={dicon}
                                    alt="Analytics Image"
                                    preview={false}
                                  />
                                </div>
                              </Col> */}

                              <Col xs={24} md={24}>
                                <p
                                  className="testi-date"
                                  style={{
                                    lineHeight: "20px",
                                    textAlign: "start",
                                  }}
                                >
                                  <BsArrowLeftRight /> {info?.totalCustomers}
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <div className="boxDetails analytics1 bg-parent dashboard-right-card">
                            <Row
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={15} md={18}>
                                <h4
                                  className="analyticsText"
                                  style={{ margin: 0 }}
                                >
                                  TODO TASKS
                                </h4>
                              </Col>
                              {/* <Col xs={7} md={6}>
                                <div className="analyticsIcon">
                                  <Image
                                    src={dicon2}
                                    alt="Analytics Image"
                                    preview={false}
                                  />
                                </div>
                              </Col> */}

                              <Col xs={24} md={24}>
                                <p
                                  className="testi-date"
                                  style={{
                                    lineHeight: "20px",
                                    textAlign: "Start",
                                  }}
                                >
                                  <BsArrowLeftRight />  {info?.todoTasks}
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                          <div className="boxDetails analytics1 bg-parent dashboard-right-card">
                            <Row
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={15} md={18}>
                                <h4
                                  className="analyticsText"
                                  style={{ margin: 0 }}
                                >
                                  PENDING TASKS
                                </h4>
                              </Col>
                              {/* <Col xs={7} md={6}>
                                <div className="analyticsIcon">
                                  <Image
                                    src={dicon2}
                                    alt="Analytics Image"
                                    preview={false}
                                  />
                                </div>
                              </Col> */}

                              <Col xs={24} md={24}>
                                <p
                                  className="testi-date"
                                  style={{
                                    lineHeight: "20px",
                                    textAlign: "Start",
                                  }}
                                >
                                  <BsArrowLeftRight />  {info?.pendingTasks}
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        {/* <Col xs={24} md={12} lg={6}>
                          <div className="boxDetails analytics1 bg-parent dashboard-right-card">
                            <Row
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={15} md={18}>
                                <h4
                                  className="analyticsText"
                                  style={{ margin: 0 }}
                                >
                                  BRANDS
                                </h4>
                              </Col>
                              <Col xs={7} md={6}>
                                <div className="analyticsIcon">
                                  <Image
                                    src={dicon3}
                                    alt="Analytics Image"
                                    preview={false}
                                  />
                                </div>
                              </Col>

                              <Col xs={24} md={24}>
                                <p
                                  className="testi-date"
                                  style={{
                                    lineHeight: "20px",
                                    textAlign: "start",
                                  }}
                                >
                                  <BsArrowLeftRight /> 08% Since last week
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Col> */}
                        <Col xs={24} md={12} lg={8}>
                          <div className="boxDetails analytics1 bg-parent dashboard-right-card">
                            <Row
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Col xs={15} md={18}>
                                <h4
                                  className="analyticsText"
                                  style={{ margin: 0 }}
                                >
                                  COMPLETED TASKS
                                </h4>
                              </Col>
                              {/* <Col xs={7} md={6}>
                                <div className="analyticsIcon">
                                  <Image
                                    src={dicon4}
                                    alt="Analytics Image"
                                    preview={false}
                                  />
                                </div>
                              </Col> */}

                              <Col xs={24} md={24}>
                                <p
                                  className="testi-date"
                                  style={{
                                    lineHeight: "20px",
                                    textAlign: "start",
                                  }}
                                >
                                  <BsArrowLeftRight /> {info?.completedTasks}
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                        </div>
                      
                      </Col>
                    </Row>
                     
                      <Row>
                        <Col xs={24}>
                        <div
                        className="bg-parent dashboard-right-card"
                        style={{ margin: "20px 0" }}
                      >
                        <Row  >
                          
                          <Col xs={24}>
                            <div
                              className="boxDetails"
                              style={{ padding: "30px" }}
                            >
                              <Row
                                style={{
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Col xs={24} md={24}>
                                  <h3 className="sectionTitle" style={{marginBottom:"15px"}}>Quick stats</h3>
                                </Col>
                              </Row>
                              <Row
                                style={{
                                  minHeight: "400px",
                                  overflowX: "auto",
                                }}
                              >
                                <div
                                  style={{ minWidth: "530px", width: "100%" }}
                                >
                                  <Bar options={options} data={data} />
                                </div>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                        </Col>
                      </Row>
                      
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
};

export default Dashboard;
