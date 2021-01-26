import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import Input from "../../components/UI/input";

import { login } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Signin() {
  //linking form value with state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth); //fetch state.auth as state from store.
  const dispatch = useDispatch();

  // //check and restrit user to navigate to signin page if user is already logged in.
  // useEffect(() => {
  //   if (!auth.authenticate) dispatch(isUserLogedIn());
  // }, []);

  const userLogin = (e) => {
    e.preventDefault();
    // const user = { email: "pabin@gmail.com", password: "123qwe" };
    const user = { email, password };
    dispatch(login(user));
  };

  //if user is loged in redirect to dashboard
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <div>
      <Layout>
        <Container>
          <Row style={{ marginTop: "60px" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <Input
                  label="Password"
                  placeholder="Password"
                  value={password}
                  type="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}

export default Signin;
