// export const BASE_URL = "https://secure.demo243.webhostlabs.net:3002/api/"
// export const UPLOADS_URL = "https://secure.demo243.webhostlabs.net:3002/Uploads/"
const { NODE_ENV } = process.env;
const { hostname } = window.location;

const servers = {
  local: "http://localhost:3020",
  live: "https://api.taskmanager.com/",
};

var URL;
if (NODE_ENV === "production" && hostname.includes("taskmanager.com"))
  URL = servers.live;
else URL = servers.local;

export const SOCKET_URL = `${URL}`;

export const UPLOADS_URL = URL + "/Uploads/";
export const BASE_URL = URL + "/api";

export const USER_AUTH = {
  signup: "/user/signup",
  login: "/user/login",
  getUsers: "/user/getUsers",
};

export const PROFILE = {
  getMyProfile: "/user/getMyProfile",
  createProfile: "/user/createProfile",
  updateMyProfile: "/user/updateMyProfile",
};
export const ADMIN = {
  // getUsers: "/user/admin/getUsers",
  getUserById: "/user/admin/getUser/",
  dashboardInfo: "/user/dashboard"
};

export const TASK = {
  updateTaskStatus: "/task/updateTaskStatus/",
  getTasks: "/task/getAllTasks",
  getTaskById: "/task/getTask/",
  addTask: "/task/addTask",
  updateTask: "/task/updateTask/",
  deleteTask: "/task/deleteTask/",
};


