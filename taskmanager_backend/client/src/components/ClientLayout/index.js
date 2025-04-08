import { Layout, Modal, message } from "antd";
import ClientHeader from "./ClientHeader";
// import ClientFooter from "./ClientFooter";

const ClientLayout = ({ children, bg=true }) => {
  return (
    <Layout
      style={{
        backgroundColor: "transparent",
        scrollBehavior: "smooth",
        position: "relative",
      }}
    >
      <ClientHeader />
      <span className={bg ? "footer-bg" : ""}>
        {children}
        {/* {footer && <ClientFooter />} */}
      </span>
    </Layout>
  );
};
export default ClientLayout;
