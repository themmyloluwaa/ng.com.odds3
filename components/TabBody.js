import React from "react";
import { Row, Col, TabContent } from "react-bootstrap";
import DisplayContent from "./DisplayContent";

const TabBody = data => {
  return (
    <>
      <TabContent className="my-10 ">
        <DisplayContent />
        <DisplayContent />
        <DisplayContent />
      </TabContent>
    </>
  );
};

export default TabBody;
