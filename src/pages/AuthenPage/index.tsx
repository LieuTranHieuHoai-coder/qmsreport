import React, { useEffect, useState } from "react";
import type { FormProps, MenuProps } from "antd";
import { Button, Checkbox, Dropdown, Form, Input, Layout, Space, message } from "antd";
import { acFetchUserLogin } from "./duck/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import qmslogo from "./../../assets/images/QMSLogo.PNG";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Flag from "react-flagkit";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function LoginComponent() {
  const dispatch: any = useDispatch();
  const [userData, setUserData] = useState<FieldType>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.userReducer
  );
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setUserData(values);
    navigate("/home/index");
  };
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (data) {
  //     navigate("/home/index");
  //   } else {
  //     navigate("");
  //   }
  // }, [data]);

  useEffect(() => {
    if (!userData) {
    } else {
      dispatch(acFetchUserLogin(userData));
    }
  }, [userData]);
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };



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

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
    
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
          <div className="card">
            <div className="card-header text-center" style={{background:"#102750"}}>
                <img src={qmslogo} className="img-fuild"/>
            </div>
            <div className="card-body">
              <Form
                name="basic"
                
                style={{ width:"100%" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label={t("loginpage.username")}
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label={t("loginpage.password")}
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {/* <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

                <Form.Item className="text-right">
                <Dropdown menu={menuProps} className="mr-2">
          <Button>
            <Space>
              <GlobalOutlined />
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
