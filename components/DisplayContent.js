import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

const renderIcon = (icon = "PAUSE") => {
  if (icon === "PAUSE") {
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
  } else if (icon === "WIN") {
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
  const { data = {} } = props;
  const [icon, setIcon] = useState("PAUSE");
  return (
    <Row className="px-5 py-3 my-5" key={data.id}>
      <Col sm="12">
        <img
          src={data?.logo ?? ""}
          className="mx-auto my-3"
          width="50"
          height="50"
        />
      </Col>
      {/* </Row> */}
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <h3 className="font-weight-bolder">{data?.league ?? ""}</h3>
          </Col>
          <Col>
            <p>{data?.date ?? ""}</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>{data?.home ?? ""}</p>
          </Col>
          <Col>
            <p>{data?.home_goal ?? ""}</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>{data?.time ?? ""}</p>
          </Col>
          <Col>{renderIcon(data?.icon ?? icon)}</Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>{data?.opponent ?? ""}</p>
          </Col>
          <Col>
            <p>{data?.opponent_goal ?? ""}</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12">
        <Row className="mx-auto">
          <Col>
            <p>Tip: {data?.tips ?? ""}</p>
          </Col>
          <Col>
            <p>Odds: {data?.odd ?? ""}</p>
          </Col>
        </Row>
      </Col>
      <Col sm="12" className="border-bottom my-3 py-3">
        <Row className="mx-auto">
          <Col>{props.editButton}</Col>
          <Col>
            <button className="btn btn-danger">Delete</button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DisplayContent;
