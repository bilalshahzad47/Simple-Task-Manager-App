import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Input,
  Button,
  Popover,
  Skeleton,
  Table,
  Typography,
  Select,
  Modal,
  Pagination,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch, FaFilter, FaEye, FaTrash } from "react-icons/fa";
import { Delete} from "../../config/api/delete";
import { Get } from "../../config/api/get";
import { TASK } from "../../config/constants/api";
import { useDebouncedCallback } from "use-debounce";
// import { userManagementDate } from "../../components/Data/data";
import moment from "moment";
import { extractDate } from "../../config/helpers";
import swal from "sweetalert"

const DropZoneLogs = () => {
  const token = useSelector((state) => state.user.userToken);
  const user = useSelector((state) => state.user.userData);
  const [tasks, setTasks] = useState(null);
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });
  const navigate = useNavigate();

  const getTasks = (pageNumber, pageSize, from, to, keyword) => {
    setLoading(true);
    Get(TASK.getTasks, token, {
      from,
      to,
      keyword,
      page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
      limit: pageSize ? pageSize.toString() : paginationConfig.limit.toString(),
    })
      .then((response) => {
        if (response?.data?.docs) {
          setTasks(response?.data?.docs);
          setPaginationConfig({
            pageNumber: response?.data?.page,
            limit: response?.data?.limit,
            totalDocs: response?.data?.totalDocs,
            totalPages: response?.data?.totalPages,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error Fetching Events", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getTasks();
  }, []);

  const [selectedTask, setSelectedTask] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteButtonClick = (item) => {
    setDeleteModalOpen(true);
    console.log(item);
    setSelectedTask(item);
  };

  const deleteTas = () => {
    setLoading(true);
    Delete(TASK.deleteTask + selectedTask, token)    
      .then((response) => {
        setLoading(false);
        console.log(response, "response12");
        if (response) {
          swal(response.message);
          setDeleteModalOpen(false);
          setTasks(tasks.filter(task => task._id !== selectedTask));
        } else {
          console.error(response?.data?.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error.message);
      });
  };

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = tasks
    ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
    : "Showing records 0 of 0";

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });
    getTasks(pageNumber, paginationConfig.limit);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
    getTasks(
      paginationConfig.pageNumber,
      paginationConfig.limit,
      null,
      null,
      value
    );
  }, 1000);

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const handleTypeChange = (value) => {
    setFilter({
      ...filter,
      type: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };
  const data = {
    keyword: filter.keyword,
    from: filter.from,
    to: filter.to,
  };
  const handleApply = () => {
    let from;
    let to;
    if (data.from) {
      from = moment(filter?.from?.$d).format("YYYY-MM-DD");
    }
    if (data.to) {
      to = moment(filter?.to?.$d).format("YYYY-MM-DD");
    }
    if (from || to) {
      getTasks(paginationConfig.pageNumber, paginationConfig.limit, from, to);
    } else {
      return;
    }
  };
  const handleClear = () => {
    resetFilter();
    getTasks();
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const columns = [
    {
      title: "S. No.	",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 9 && "0") + (index + 1),
    },
    {
      title: "UserID",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value, item, index) =>
        value.length > 25 ? value.slice(0, 25) + "..." : value,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value, item, index) => extractDate(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => (
        <>
          {item === "TODO" ? (
            <span style={{ color: "#DD9F00" }}>{item}</span>
          ) : item === "INPROGRESS" ? (
            <span style={{ color: "#2D308B" }}>{item}</span>
          ) : item === "DONE" ? (
            <span style={{ color: "#00D640" }}>{item}</span>
          ) : (
            <span>{item}</span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <div style={{display: "flex", alignItems: "center"}}>
          <div className="view-link" onClick={() => navigate(`/taskManagement/${item}`)}>
            <FaEye style={{fontSize: "16px", color: "grey"}}/>
          </div>
          <div className="view-link" onClick={() => handleDeleteButtonClick(item)}>
            <FaTrash style={{fontSize: "16px", color: "red"}}/>
          </div>
        </div>
        // <AiOutlineEye
        //   style={{ fontSize: "18px", color: "grey", cursor: "pointer" }}
        //   onClick={() => navigate(`/taskManagement/${value}`)}
        // />
      ),
    },
  ];

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p
          className="mainLabel"
          style={{ padding: "10px", fontSize: "18px", fontWeight: "bold" }}
        >
          Filter
        </p>
      </div>
      <hr style={{ marginBottom: 10 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">From:</p>
        <DatePicker
          className="mainInput filterInput web-input"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
          style={{ width: "100%" }}
        />
        <p className="mainLabel">To:</p>
        <DatePicker
          className="mainInput filterInput web-input"
          value={filter.to}
          onChange={(e) => handleTo(e)}
          style={{ width: "100%" }}
        />

        <Button
          type=""
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="web-btn"
          //   onClick={() => getUsers()}
          onClick={handleApply}
        >
          Apply
        </Button>
        <Button
          type=""
          block
          size={"large"}
          className="web-btn"
          onClick={handleClear}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

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
                        <Col xs={24} md={12}>
                          <h3 className="heading-28">Task Management</h3>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Popover
                            content={filterContent}
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}
                            placement="bottomRight"
                            arrow={false}
                          >
                            <Button
                              shape="circle"
                              style={{
                                padding: "12px 12px 5px",
                                height: "auto",
                                backgroundColor: "#7F00FF",
                              }}
                            >
                              <FaFilter
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                }}
                              />
                            </Button>
                          </Popover>
                          &emsp;
                          <Input
                            style={{ width: "250px" }}
                            className="mainInput dashInput table-search"
                            placeholder="Search By Title Here.."
                            onChange={(e) => handleSearch(e.target.value)}
                            suffix={
                              <FaSearch
                                style={{
                                  color: "grey",
                                  fontSize: 16,
                                  cursor: "pointer",
                                }}
                                // onClick={() =>
                                //   getOrders(
                                //     1,
                                //     paginationConfig.limit,
                                //     filter.keyword
                                //   )
                                // }
                              />
                            }
                            // onPressEnter={(e) =>
                            //   getOrders(
                            //     1,
                            //     paginationConfig.limit,
                            //     filter.keyword
                            //   )
                            // }
                          />
                          <Button
                            className="web-btn"
                            onClick={() => navigate("/createTask")}
                            style={{ margin: "0 0 0 10px" }}
                          >
                            CREATE TASK
                          </Button>
                        </Col>
                      </Row>
                      <div className="">
                        <Row justify="center">
                          <Col xs={24} md={24} xl={24}>
                            <Card>
                              <Row align="middle" gutter={16}>
                                <Col lg={24}>
                                  <div className="boxDetails">
                                    <Row
                                      style={{ padding: 20, overflow: "auto" }}
                                    >
                                      {loading ? (
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                          }}
                                        >
                                          <Skeleton active />
                                          <br />
                                        </div>
                                      ) : (
                                        <Table
                                          className="styledTable"
                                          columns={columns}
                                          dataSource={tasks}
                                          // dataSource={userManagementDate}
                                          pagination={false}
                                        />
                                      )}
                                    </Row>
                                    <Row style={{ padding: "10px 20px" }}>
                                      <Col xs={24} md={12}>
                                        <p>{message}</p>
                                      </Col>
                                      <Col
                                        xs={24}
                                        md={12}
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <Pagination
                                          className="styledPagination"
                                          onChange={(e) => handlePageChange(e)}
                                          current={parseInt(
                                            paginationConfig.pageNumber
                                          )}
                                          pageSize={paginationConfig.limit}
                                          total={paginationConfig.totalDocs}
                                          itemRender={itemRender}
                                        />
                                      </Col>
                                    </Row>
                                    <br />
                                  </div>
                                </Col>
                              </Row>
                            </Card>
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
      <Modal
          open={deleteModalOpen}
          onOk={() => deleteTas()}
          onCancel={() => setDeleteModalOpen(false)}
          okText="Yes"
          className="StyledModal"
          style={{
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
          }}
          cancelText="No"
          cancelButtonProps={{
            className: "no-btn",
          }}
          okButtonProps={{
            className: "yes-btn",
          }}
        >
          {/* <Image
            src={ImageUrl("question.png")}
            preview={false}
            width={74}
            height={74}
          /> */}
          <Typography.Title level={4} style={{ fontSize: "25px" }}>
            System Message!
          </Typography.Title>
          <Typography.Text style={{ fontSize: 16 }}>
            Are You Sure You Want To Delete This Task?
          </Typography.Text>
        </Modal>
    </div>
  );
};

export default DropZoneLogs;