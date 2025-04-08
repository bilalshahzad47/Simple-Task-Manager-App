import { useEffect } from "react";
import { Col, Row, Button } from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UPLOADS_URL } from "../../../config/constants/api";
import DashbordSidebar from "../../../components/DashboardSidebar";
// import { myprofiledata } from "../../../components/Data/data";
import { extractDate } from "../../../config/helpers/index";

const DropzoneFiltercards = () => {
  const userData = useSelector((state) => state?.user?.userData);
  console.log(userData, "userData1");
  const profileDetails = useSelector((state) => state?.user?.profileDetails);
  console.log(profileDetails, "profileDetails3");
  const navigate = useNavigate();
  useEffect(() => {
    if (!profileDetails) {
      navigate("/createProfile");
    }
  }, []);

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
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">Profile Information</h3>
                      </div>
                      <div className="bg-parent">
                        <Row
                          gutter={[16, 16]}
                          align={"middle"}
                          justify={"center"}
                        >
                          <Col md={14} lg={14} xl={14}>
                            <div className="">
                              <div className="logo-rectangle">
                                <div className="profile-info">
                                <div className="wrapper-group-1000001858" style={{width:"150px"}}>
                                      <img
                                        src={UPLOADS_URL + profileDetails?.image}
                                        alt="event image"
                                        preview="false"
                                        style={{
                                          borderRadius: "100%",
                                          objectFit: "cover",
                                          objectPosition: "center",
                                          height:"150px",
                                          width:"150px"
                                        }}
                                      />
                                    </div>
                                  <div className="full-name">
                                    <div className="jake-dawson">
                                      <div className="phone-number">
                                        <div className="full-name1">
                                          <p className="full-name2">
                                            Full Name
                                          </p>
                                        </div>
                                        <div className="jake-dawson1">
                                          {profileDetails?.fullName}
                                        </div>
                                      </div>
                                      <div className="gender">
                                        <div className="phone-number1">
                                          Phone Number
                                        </div>
                                        <div className="frame-parent">
                                          <div className="a-b-c">
                                            {profileDetails?.phone}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="location">Location</div>
                                    </div>
                                    <div className="changepassword">
                                      <div className="b-g">
                                        <div className="email">Email</div>
                                        <div className="jakesamplecom">
                                          {profileDetails?.email}
                                        </div>
                                      </div>
                                      <div className="b-g1">
                                        <div className="gender1">Gender</div>
                                        <div className="male">
                                          {profileDetails?.gender}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {profileDetails?.location && (
                                    <div className="abc-location-town" style={{marginLeft: "44px"}}>
                                      {profileDetails?.location?.street +
                                        ", " +
                                        profileDetails?.location?.state +
                                        ", " +
                                        profileDetails?.location?.city +
                                        ", " +
                                        profileDetails?.location?.country}
                                    </div>
                                  )}
                                </div>
                                <div className="f-a-qs" style={{marginLeft: "44px"}}>
                                    <div className="career">
                                      <div className="date-of-birth">
                                        Date Of Birth
                                      </div>
                                    </div>
                                    <div className="termsconditions">
                                      <div className="jan-28-1998">
                                        {extractDate(
                                          profileDetails?.dateOfBirth
                                        )}
                                      </div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
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

export default DropzoneFiltercards;
