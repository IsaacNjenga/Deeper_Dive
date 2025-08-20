import React, { useContext, useState } from "react";
import {
  Button,
  Drawer,
  FloatButton,
  Layout,
  Menu,
  Switch,
  Typography,
} from "antd";
import { Link, Outlet } from "react-router-dom";
import FooterSection from "./Footer";
import logo from "../assets/icons/logo.png";
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { UserContext } from "../App";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const logoTextStyle = { display: "flex", flexDirection: "column" };

function Navbar() {
  const { isMobile, setDarkMode, darkMode } = useContext(UserContext);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const toggleMode = () => setDarkMode(!darkMode);

  const menuItems = [
    { key: "1", label: "Home", path: "/" },
    { key: "2", label: "Episodes", path: "/episodes" },
    { key: "3", label: "Guests", path: "/guests" },
    { key: "4", label: "About", path: "/about" },
    { key: "5", label: "Contact", path: "/contact" },
  ];

  const headerStyle = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    width: "100%",
    padding: "0 24px",
    background: darkMode ? "#090c11" : "#f2f5fa",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        <FloatButton.BackTop Title="Back to top" />
      </FloatButton.Group>
      <Layout>
        <Header style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={logo}
              alt="logo"
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover",
                backgroundColor: darkMode ? "whitesmoke" : "#090c11",
                padding: 2,
              }}
            />
            <div style={logoTextStyle}>
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: darkMode ? "#fff" : "#090c11",
                  fontWeight: "bold",
                }}
              >
                A Deeper Dive
              </Title>
              <Text style={{ color: "#aaa", fontWeight: "bold" }}>
                with Jeremy Nyabila
              </Text>
            </div>
          </div>

          {isMobile ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <Button
                type="text"
                onClick={toggleDrawer}
                icon={
                  <MenuOutlined
                    style={{
                      color: darkMode ? "white" : "#090c11",
                      fontSize: 20,
                    }}
                  />
                }
              />
            </div>
          ) : (
            <>
              {/* Menu */}
              <Menu
                theme={darkMode ? "dark" : "light"}
                mode="horizontal"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  background: "transparent",
                }}
                items={menuItems.map(({ key, label, path }) => ({
                  key,
                  label: (
                    <Link to={path} style={{ fontSize: 16 }}>
                      {label}
                    </Link>
                  ),
                }))}
              />
              {/* Theme toggle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: "auto",
                }}
              >
                <Switch
                  uncheckedChildren={<SunOutlined />}
                  checkedChildren={<MoonOutlined />}
                  defaultChecked
                  size="large"
                  onClick={toggleMode}
                />
              </div>
            </>
          )}
        </Header>

        <Drawer
          placement="right"
          width={240}
          onClose={toggleDrawer}
          open={drawerVisible}
          style={{ backgroundColor: darkMode ? "#090c11" : "#f2f5fa" }}
        >
          <Menu
            mode="vertical"
            style={{
              background: "rgb(0,0,0,0)",
              borderColor: "rgb(0,0,0,0)",
              fontFamily: "Raleway",
              fontWeight: "bold",
            }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.path}>
                <Link
                  to={item.path}
                  style={{
                    color: darkMode ? "#f2f5fa" : "#090c11",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item
              style={{ backgroundColor: "rgba(0,0,0,0)", marginTop: 10 }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginLeft: "auto",
                }}
              >
                <Switch
                  checkedChildren={<SunOutlined />}
                  unCheckedChildren={<MoonOutlined />}
                  defaultChecked
                  size="large"
                  onClick={toggleMode}
                />
              </div>
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Main content */}
        <Content
          style={{
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            background: "whitesmoke",
          }}
        >
          <Outlet />
        </Content>

        <Footer>
          <FooterSection />
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
