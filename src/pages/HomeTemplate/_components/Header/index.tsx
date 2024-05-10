import { Button, Dropdown, Layout, MenuProps, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import Flag from "react-flagkit";
import { DownOutlined, GlobalOutlined, UserOutlined } from "@ant-design/icons";
export default function HeaderComponent() {
  const { Header } = Layout;
  const [t, i18n] = useTranslation("global");
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
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
        message.info("换成台湾人了.");
        i18n.changeLanguage(e.key)
        break;
      case "cn":
        message.info("改成中文了.");
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
      label: "United Kingdom",
      key: "en",
      icon: <Flag country="US" onClick={() => handleChangeLanguage("en")}/>,
    },
    {
      label: "Taiwan",
      key: "tw",
      icon: <Flag country="TW" onClick={() => handleChangeLanguage("tw")}/>,
    },
    {
      label: "China",
      key: "cn",
      icon: <Flag country="CN" onClick={() => handleChangeLanguage("cn")}/>,
      danger: false,
    },
    {
      label: "Vietnam",
      key: "vn",
      icon: <Flag country="VN" onClick={() => handleChangeLanguage("vn")}/>,
      danger: false,
      disabled: false,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Header style={{ background: "#ffffff" }}>
      <div className="d-flex justify-content-end align-items-center h-100">
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              <GlobalOutlined />
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
}
