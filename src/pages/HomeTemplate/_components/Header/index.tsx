import { Button, Dropdown, Layout, MenuProps, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import Flag from "react-flagkit";
import { DownOutlined, GlobalOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect } from "react";
export default function HeaderComponent() {
  const { Header } = Layout;
  const [t, i18n] = useTranslation("global");
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const navigate = useNavigate();
  function handleChangeLanguage (lang:any) {
    localStorage.setItem('myKey', lang);
    
  };
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "vn":
        message.info("Đã đổi sang Tiếng Việt.");
        i18n.changeLanguage(e.key)
        break;
      case "tw":
        message.info("改成繁體中文了.");
        i18n.changeLanguage(e.key)
        break;
      case "cn":
        message.info("改成簡體中文了.");
        i18n.changeLanguage(e.key)
        break;
      case "en":
        message.info("Changed to English.");
        i18n.changeLanguage(e.key)
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "USA",
      key: "en",
      icon: <Flag country="US" onClick={() => handleChangeLanguage("en")}/>,
    },
    {
      label: "Taiwan",
      key: "tw",
      icon: <Flag country="TW" onClick={() => handleChangeLanguage("tw")}/>,
    },
    // {
    //   label: "China",
    //   key: "cn",
    //   icon: <Flag country="CN" onClick={() => handleChangeLanguage("cn")}/>,
    //   danger: false,
    // },
    {
      label: "Vietnam",
      key: "vn",
      icon: <Flag country="VN" onClick={() => handleChangeLanguage("vn")}/>,
      danger: false,
      disabled: false,
    },
  ];
  let isLogin = useSelector(
    (state: RootState) => state.userReducer.data
  );
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  
  function logout(){
    navigate("/");
  }
  return (
    <Header style={{ background: "#ffffff" }}>
      <div className="d-flex justify-content-end align-items-center h-100">
        <Dropdown menu={menuProps} className="mr-2">
          <Button>
            <Space>
              <GlobalOutlined />
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        
        <Button
          type="primary" danger
          icon={<PoweroffOutlined />}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </Header>
  );
}
