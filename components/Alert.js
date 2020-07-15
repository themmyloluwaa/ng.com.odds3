import { useState } from "react";

import { Alert } from "react-bootstrap";
const AlertComponent = ({ data, variant, message }) => {
  const [show, setShow] = data;
  if (show === true) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{message.header}</Alert.Heading>
        <p>{message.body}</p>
      </Alert>
    );
  }
};

export default AlertComponent;
