import React, { useState } from "react";
import { Modal, Form, Card } from "react-bootstrap";

const PredictionModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        className="btn btn-primary  mr-10 float-right"
        onClick={handleShow}
      >
        New Prediction
      </button>
      <Modal show={show} onHide={setShow}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Proposal Sent by Mopa Chris
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Report Details</Form.Label>
              <Form.Control as="textarea" rows="10" required />
            </Form.Group>
            <div className="mb-3">
              <Form.Label>Photos</Form.Label>
              <Form.File id="formcheck-api-custom" custom>
                <Form.File.Input required multiple />
                <Form.File.Label data-browse="Upload">
                  Select one or more pictures
                </Form.File.Label>
              </Form.File>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-primary mx-2" type="submit">
              Create
            </button>
            <button
              className="btn btn-default text-danger mx-2"
              onClick={handleClose}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PredictionModal;
