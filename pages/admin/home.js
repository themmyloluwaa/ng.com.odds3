import {
  Container,
  Card,
  Row,
  Col,
  Navbar,
  Nav,
  Tabs,
  Tab
} from "react-bootstrap";
import { useState } from "react";
import TabBody from "../../components/TabBody";

const Home = () => {
  const [key, setKey] = useState("Prediction");
  return (
    <>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="/img/logo.png"
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" className="text-white">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "80vw"
        }}
      >
        <Card
          style={{
            minWidth: "80%",
            minHeight: "30vh",
            maxHeight: "70vh"
            // overflow: "auto"
            // color: "#fff"
          }}
          // bg="primary"
        >
          <Tabs activeKey={key} onSelect={k => setKey(k)}>
            <Tab eventKey="Prediction" title="Prediction">
              <TabBody />
            </Tab>
            <Tab eventKey="Result" title="Result">
              <TabBody />
            </Tab>
            <Tab eventKey="Code" title="Code">
              <TabBody />
            </Tab>
          </Tabs>
        </Card>
      </Container>
      <style jsx global>
        {`
          body {
            padding: 0;
          }
        `}
      </style>
    </>
  );
};

export default Home;
