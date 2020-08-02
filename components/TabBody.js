import React from "react";
import { Row, Col, TabContent } from "react-bootstrap";

const TabBody = data => {
  return (
    <>
      <TabContent className="my-10">
        <Row className="border py-3 px-5">
          <Col sm="12">
            <Row>
              <Col sm="4">
                <div
                  style={{
                    borderRadius: "50%",
                    width: "20%",
                    height: "100%",
                    // background: `url(/img/logo-2.png) center center cover no-repeat`
                    background: 'url("/img/logo.png") no-repeat center center'
                  }}
                ></div>
              </Col>
              <Col style={{ alignSelf: "flex-end" }}>
                <Row>
                  <Col sm="8">
                    <p>English Premier league </p>
                  </Col>
                  <Col>
                    {" "}
                    <p>04 Aug</p>
                  </Col>
                </Row>
                <hr style={{ backgroundColor: "#fff" }}></hr>
                <Row>
                  <Col sm="8">
                    <p>Arsenal </p>
                  </Col>
                  <Col>
                    {" "}
                    <p>04 Aug</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm="4">14.00</Col>
              <Col className="float-right">
                <img src="/img/logo.png" width="100" height="100" />
              </Col>
            </Row>{" "}
            <Row>
              <Col sm="4"></Col>
              <Col>
                <p>
                  English Premier league{" "}
                  <span className="text-right"> 04 Aug</span>
                </p>
                <hr style={{ backgroundColor: "#fff" }}></hr>
                <p>
                  Arsenal Fc <span className="text-right"> 04 Aug</span>
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <p className="text-white">h1</p>
          </Col>
        </Row>
      </TabContent>
    </>
  );
};

export default TabBody;
