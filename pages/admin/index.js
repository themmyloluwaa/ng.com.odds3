import { useState } from "react";
import { Form, Container, Row, Col, Image, Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import { handleLogin, checkAccess } from "../../lib/utils";
import Alert from "../../components/Alert";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Login = props => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    let isValidated = true;
    if (username.length === 0 || password.length === 0 || code.length === 0) {
      isValidated = handleValidation(e);
    }

    if (isValidated) {
      setLoading(true);

      const data = {
        username,
        password,
        code
      };
      const auth = await handleLogin(data);

      if (Object.entries(auth).length === 0) {
        setResponse({
          message: {
            header: "ERROR",
            body: "Failed to login. Incorrect credentials provided"
          },
          variant: "danger"
        });
        setShow(true);

        return setLoading(false);
      }

      cookie.set("token", auth.token);
      setUsername("");
      setPassword("");
      setCode("");

      setResponse({
        message: {
          header: "SUCCESSFUL",
          body: "Logged in successfully"
        },
        variant: "success"
      });
      setShow(true);
      setLoading(false);

      router.push("/admin/home");
    }
  };

  const handleValidation = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();

    setValidated(true);
    return validated;
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
          method="post"
          validated={validated}
          onSubmit={async e => await handleSubmit(e)}
          style={{
            width: "300px",
            maxHeight: "500px",
            padding: 20,
            backgroundColor: "white",
            margin: "0 auto"
          }}
          className="border"
        >
          {show === true && (
            <Form.Row>
              <Form.Group as={Col} controlId="error">
                <Alert
                  data={[show, setShow]}
                  message={response.message}
                  variant={response.variant}
                />
              </Form.Group>
            </Form.Row>
          )}
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
          <Form.Row className="text-center pb-5">
            <Form.Group as={Col}>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#090752",
                  minHeight: "30px",
                  minWidth: "30px",
                  fontSize: "16px"
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

export async function getServerSideProps(ctx) {
  checkAccess(ctx, "/admin");
  return {
    props: {} // will be passed to the page component as props
  };
}

export default Login;
