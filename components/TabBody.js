import React from "react";
import { Row, Col, TabContent } from "react-bootstrap";
import DisplayContent from "./DisplayContent";

const TabBody = data => {
  return (
    <TabContent className="my-10">
      <Row>
        {/* <Col sm="12">hi</Col> */}
        <Col>
          <button className="btn btn-primary  mr-10 float-right">
            New Prediction
          </button>
        </Col>
      </Row>
      <DisplayContent />
      <DisplayContent />
      <DisplayContent />
    </TabContent>
  );
};

export default TabBody;
