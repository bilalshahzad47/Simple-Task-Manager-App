//axios imports
// const axios = require("axios");
import axios from 'axios';

//constants imports
const { BASE_URL } = require("../constants/api");

//main function
async function Post(path, postData, token, paramObj, contentType) {
  let url = BASE_URL + path;
  let headers;

  if (contentType === "multipart") {
    headers = {
      headers: token
        ? {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "multipart/form-data",
          },
    };
  } else {
    headers = {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : {
            "Content-Type": "application/json",
          },
    };
  }

  if (paramObj) {
    const config = {
      // headers: { Authorization: `Bearer ${token}` },
      headers : headers,
      params: { paramObj },
    };
    const { data } = await axios.post(url, postData, config);
    return data;
  }
  const { data } = await axios.post(url, postData, headers);
  return data;
}

export { Post };
