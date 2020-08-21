import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";

const EditResultModal = props => {
  const { defaultData = {} } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [editData, setEditData] = useState(defaultData);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = e => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleUpdate = async e => {
    e.preventDefault();

    props.callBack(editData);

    handleClose();
  };

  return (
    <>
      <button
        className="btn btn-warning mr-10 float-right text-white"
        onClick={handleShow}
      >
        Edit Result
      </button>

      <Modal show={show} onHide={setShow}>
        <Form
          method="post"
          onSubmit={async e => handleUpdate(e)}
          noValidate
          validated={validated}
        >
          <Modal.Header>
            <Form.Text>
              <p>Edit this result</p>
            </Form.Text>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Home Score</Form.Label>
              <Form.Control
                type="number"
                name="home_goal"
                defaultValue={editData.home_goal}
                onChange={e => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Away Score</Form.Label>
              <Form.Control
                type="number"
                name="opponent_goal"
                defaultValue={editData.opponent_goal}
                onChange={e => handleChange(e)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Result</Form.Label>
              <Form.Control
                as="select"
                required
                name="icon"
                defaultValue={editData.icon}
                onChange={e => handleChange(e)}
              >
                <option>Select Result</option>
                <option value="WIN">WIN</option>
                <option value="LOSE">LOSE</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary mx-2" type="submit">
              Update
            </button>
            <button
              className="btn btn-default text-danger mx-2"
              onClick={handleClose}
              type="button"
            >
              Close
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditResultModal;
