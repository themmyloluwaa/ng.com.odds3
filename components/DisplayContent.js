import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

const renderIcon = (icon = "pause") => {
  if (icon === "pause") {
    return (
      <div
        style={{
          backgroundColor: "#FFE03F",
          borderRadius: "50%",
          width: "22%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <p className="pl-3 py-2 text-white">&#9612;&#9612;</p>
      </div>
    );
  } else if (icon === "win") {
    return (
      <div
        style={{
          backgroundColor: "green",
          borderRadius: "50%",
          width: "22%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <p className="py-2 text-white">&#10004;</p>
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundColor: "red",
          borderRadius: "50%",
          width: "22%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        <p className="py-2 text-white">&#10005;</p>
      </div>
    );
  }
};

const DisplayContent = props => {
  const [icon, setIcon] = useState("pause");
  return (
    <Row className="px-5 py-3 my-5">
      <Col sm="12">
        <img
          src="/img/logo-2.png"
          className="mx-auto my-3"
          width="50"
          height="50"
        />
      </Col>
      {/* </Row> */}
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <h3 className="font-weight-bolder">English Premier Leauge</h3>
          </Col>
          <Col>
            <p>04 Aug</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>Arsenal FC</p>
          </Col>
          <Col>
            <p>?</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>14:00</p>
          </Col>
          <Col>{renderIcon(icon)}</Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>Chelsea FC</p>
          </Col>
          <Col>
            <p>?</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12" className="border-bottom">
        <Row className="mx-auto">
          <Col>
            <p>Tip:Over 2.5</p>
          </Col>
          <Col>
            <p>Odds:1.3</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DisplayContent;
