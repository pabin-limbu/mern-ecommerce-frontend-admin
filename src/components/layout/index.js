import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./style.css";
import Header from "../header/index";
function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col
              md={2}
              sm={12}
              className="sidebar"
              style={{ display: "block" }}
            >
              <ul>
                <li>
                  <NavLink exact to={"/"}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>orders</NavLink>
                </li>
                <li>
                  <NavLink to={"/category"}>categry</NavLink>
                </li>
              </ul>
            </Col>
            <Col
              md={10}
              sm={12}
              style={{
                marginLeft: "auto",
                paddingTop: "60px",
                display: "block",
              }}
            >
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}

export default Layout;
