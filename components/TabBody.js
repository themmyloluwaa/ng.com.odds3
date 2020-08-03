import React from "react";
import { Row, Col, TabContent } from "react-bootstrap";
import DisplayContent from "./DisplayContent";
import PredictionModal from "./PredictionModal";

const TabBody = data => {
  return (
    <>
      <PredictionModal />

      <TabContent className="my-10">
        <Row></Row>
        <DisplayContent />
        <DisplayContent />
        <DisplayContent />
      </TabContent>
    </>
  );
};

export default TabBody;
