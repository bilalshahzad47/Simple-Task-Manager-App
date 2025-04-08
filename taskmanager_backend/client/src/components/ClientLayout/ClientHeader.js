import { useEffect, useState } from "react";
import { Image } from "antd";
import { MdMenu } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Drawer,
  Dropdown,
  Avatar,
} from "antd";
import { removeUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import logo1 from "../../assets/logo1.png";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import { UPLOADS_URL } from "../../config/constants/api";

const { Header } = Layout;

const ClientHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const userData = useSelector((state) => state.user.userData);
  const profileDetails = useSelector((state) => state?.user?.profileDetails);
  // const cart = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.userToken);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    setLogoutModal(false);
    dispatch(removeUser());
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            padding: "2px 8px",
          }}
          onClick={() => navigate("/profile")}
        >
          My Profile
          {/* <FaUser style={{ fontSize: "14px" }} /> &nbsp; My Profile */}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            padding: "2px 8px",
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <Header
      style={{
        height: "auto",
        width: "100%",
        top: 0,
        zIndex: 20,
        padding: "0px",
        background: "#fff",
        scrollBehavior: "smooth",
      }}
    >
      <Row
        style={{
          padding: "5px 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} md={22} lg={24}>
          <Row className="header-row">
            <Col xs={12} md={12} xl={3} className="" style={{textAlign:"center"}}>
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={logo1}
                style={{height: "50px", width: "50px"}}
                onClick={() => navigate("/")}
              />
            </Col>

            <Col xs={12} lg={12} xl={21}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
                className="header-find-box"
              >
                {!token ? (
                  <>
                    
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "right",
                      gap: "5%",
                    }}
                    className="header-btn-container"
                  >
                    <div
                      style={{
                        minWidth: "220px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        size={30}
                        src={
                          !profileDetails?.image
                            ? icon2
                            : `${UPLOADS_URL}${profileDetails?.image}`
                        }
                      />

                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <p
                          style={{
                            marginLeft: 10,
                            fontSize: "16px",
                            textTransform: "capitalize",
                            color: "#000",
                          }}
                        >
                          {user?.firstName} <AiFillCaretDown fontSize={12} />{" "}
                        </p>
                      </Dropdown>
                    </div>
                  </div>
                )}
              </div>
            </Col>

            <Col xs={0} lg={0} xl={0} style={{ textAlign: "end" }}>
              <MdMenu
                style={{ fontSize: 26, color: "#000" }}
                onClick={() => setVisible(true)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        className="drawer"
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={"drawer"}
      >
        <ImCross
          onClick={() => setVisible(false)}
          style={{
            fontSize: "18px",
            color: "#000",
            display: "block",
            cursor: "pointer",
            marginBottom: "14px",
          }}
        />
        <Image
          preview={false}
          alt={"Failed to load image"}
          width={100}
          height={100}
          src={icon2}
          style={{ maxWidth: 100 }}
        />
        <br />
        <br />
        <br />
        {!token ? (
          <span
            onClick={() => navigate("/login")}
            className="hover signin-link"
            key="products"
          >
            Login I Sign Up
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
            className="header-btn-container"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                size={40}
                src={
                  !profileDetails?.image
                    ? icon2
                    : `${UPLOADS_URL}${profileDetails?.image}`
                }
              />

              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <p
                  style={{
                    marginLeft: 10,
                    fontSize: "16px",
                    textTransform: "capitalize",
                    color: "#000",
                  }}
                >
                  {user?.firstName} <AiFillCaretDown fontSize={12} />{" "}
                </p>
              </Dropdown>
            </div>
          </div>
        )}
        <br />
        <br />
      </Drawer>
    </Header>
  );
};

export default ClientHeader;
