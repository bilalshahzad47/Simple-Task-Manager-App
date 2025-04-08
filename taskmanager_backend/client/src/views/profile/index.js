import { Layout  } from "antd";

import ProfileInfo from "../../views/profile/profileInfo";
import { useEffect } from "react";
// import { io } from 'socket.io-client'
function DropZone() {
  return (
    <Layout
      className=""
      style={{ backgroundColor: "transparent", minHeight: "100vh" }}
    >
      <ProfileInfo />
    </Layout>
  );
}

export default DropZone;
