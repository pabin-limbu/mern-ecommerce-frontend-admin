import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Layout from "../../components/layout";
import "./style.css";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      <Layout sidebar>
        {/* <Jumbotron
          style={{ margin: "5rem", background: "#fff" }}
          className="text-center"
        >
          <h1>Welcome to admin dashboard</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a eaque
            voluptatem excepturi explicabo magni?
          </p>
        </Jumbotron> */}
      </Layout>
    </div>
  );
}

export default Home;
