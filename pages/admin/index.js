import { useState } from "react";
import { Form, Container, Row, Col, Image, Button } from "react-bootstrap";
import Layout from "../../components/Layout";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Layout title="Login:Odds-3">
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column"
        }}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          style={{
            width: "300px",
            height: "400px",
            padding: 20,
            backgroundColor: "white",
            margin: "0 auto"
          }}
          className="border"
        >
          <Form.Row>
            <Form.Group as={Col} controlId="logo">
              <Image
                src="/img/logo-2.png"
                alt="logo"
                width="100px"
                style={{
                  margin: "0 auto"
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={e => setUsername(e.target.value)}
                style={{ fontSize: 16 }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={e => setPassword(e.target.value)}
                style={{ fontSize: 16 }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="code" className="pb-5">
            <Form.Label>Code</Form.Label>
            <Form.Control
              required
              onChange={e => setCode(e.target.value)}
              type="password"
              style={{ fontSize: 16 }}
            />
          </Form.Group>
          <Form.Row className="text-center">
            <Form.Group as={Col}>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#090752"
                }}
                className="px-5 py-3"
                type="submit"
              >
                {loading ? "LOADING..." : "SUBMIT"}
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Container>
      <style jsx global>
        {`
          body {
            background-color: #eee;
            font-size: 16px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Login;
