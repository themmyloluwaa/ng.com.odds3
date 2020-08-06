import React from "react";
import { Row, Col, TabContent } from "react-bootstrap";
import DisplayContent from "./DisplayContent";
import PredictionModal from "./PredictionModal";

const TabBody = data => {
  return (
    <>
      <Row>
        <Col>
          <PredictionModal />
        </Col>
      </Row>

      <TabContent className="my-10 ">
        <DisplayContent />
        <DisplayContent />
        <DisplayContent />
      </TabContent>
    </>
  );
};

export default TabBody;
