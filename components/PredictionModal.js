import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

Moment.locale("en");
momentLocalizer();

const PredictionModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataItems, setDataItems] = useState({});

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleChange = e => {
    const { name, value } = e.target;

    setDataItems({
      ...dataItems,
      [name]: value
    });

    console.log(dataItems);
  };

  const handleDateChange = date => {
    console.log(date);
    setSelectedDate(date);
  };
  const [value, onChange] = useState(new Date());
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
              Create A New Prediction
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="disabledTextInput">League Name</Form.Label>
                <Form.Control
                  name="league"
                  type="text"
                  onChange={e => handleChange(e)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="disabledTextInput">
                  Date and Time
                  {/* <DateTimePicker onChange={onChange} value={value} /> */}
                  <DateTimePicker name="date" onChange={handleDateChange} />
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="disabledTextInput">Home</Form.Label>
                <Form.Control
                  type="text"
                  name="home"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="disabledTextInput">Away</Form.Label>
                <Form.Control
                  type="text"
                  name="opponent"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="disabledTextInput">Tip</Form.Label>
                <Form.Control
                  type="text"
                  name="tips"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="disabledTextInput">odd</Form.Label>
                <Form.Control
                  type="number"
                  name="odd"
                  onChange={handleChange}
                />
              </Form.Group>
            </fieldset>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-primary mx-2" type="submit">
              Create
            </button>
            <button
              className="btn btn-default text-danger mx-2"
              onClick={handleClose}
              type="button"
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
