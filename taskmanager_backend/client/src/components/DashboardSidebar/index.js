import { useState } from "react";
import { Col, Row, Drawer, Image } from "antd";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
// import icon3 from "../../assets/icon3.png";
// import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
// import icon6 from "../../assets/icon6.png";
// import icon7 from "../../assets/icon7.png";
// import icon8 from "../../assets/icon8.png";
// import icon9 from "../../assets/icon9.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import { MdMenu } from "react-icons/md";
const SideMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const location = useLocation();
  return (
    <>
      <Row>
        <Col xs={0} md={0} lg={0} xl={24}>
          <div className="side-menu">
            {/* ... other menu items ... */}
            <div
              className={`vector-one-parent ${
                location.pathname === "/" || location.pathname === "/"
                  ? "active"
                  : ""
              }`}
            >
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={icon1}
                className="vector-one-icon"
              />
              <div
                className="my-profile"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Dashboard
              </div>
            </div>
            <div
              className={`vector-one-parent ${
                location.pathname === "/userManagement" ||
                location.pathname.includes("/userManagementDetail")
                  ? "active"
                  : ""
              }`}
            >
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={icon2}
                className="vector-one-icon"
              />
              <div
                className="my-profile"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/userManagement")}
              >
                User Management
              </div>
            </div>
            <div
              className={`vector-one-parent ${
                location.pathname.includes("/taskManagement") ||
                location.pathname === "/taskManagement"
                  ? "active"
                  : ""
              }`}
            >
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={icon5}
                className="vector-one-icon"
              />
              <div
                className="my-profile"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/taskManagement")}
              >
                Task Management
              </div>
            </div>
            
          </div>
        </Col>

        <Col xs={24} md={24} lg={24} xl={0}>
          <>
            <MdMenu
              style={{ fontSize: 26, color: "#000" }}
              onClick={showDrawer}
            />
            <Drawer
              // title="Basic Drawer"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <div className="side-menu">
                {/* ... other menu items ... */}
                <div
                  className={`vector-one-parent ${
                    location.pathname === "/" || location.pathname === "/"
                      ? "active"
                      : ""
                  }`}
                >
                  <Image
                    preview={false}
                    alt={"Failed to load image"}
                    src={icon1}
                    className="vector-one-icon"
                  />
                  <div
                    className="my-profile"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    Dashboard
                  </div>
                </div>
                
                <div
                  className={`vector-one-parent ${
                    location.pathname === "/userManagement" ||
                    location.pathname === "/userManagement"
                      ? "active"
                      : ""
                  }`}
                >
                  <Image
                    preview={false}
                    alt={"Failed to load image"}
                    src={icon2}
                    className="vector-one-icon"
                  />
                  <div
                    className="my-profile"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/userManagement")}
                  >
                    user Management
                  </div>
                </div>
                <div
                  className={`vector-one-parent ${
                    location.pathname === "/taskManagement" ||
                    location.pathname === "/taskManagement"
                      ? "active"
                      : ""
                  }`}
                >
                  <Image
                    preview={false}
                    alt={"Failed to load image"}
                    src={icon5}
                    className="vector-one-icon"
                  />
                  <div
                    className="my-profile"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/taskManagement")}
                  >
                    Task Management
                  </div>
                </div>
                
              </div>
            </Drawer>
          </>
        </Col>
      </Row>
    </>
  );
};

export default SideMenu;
