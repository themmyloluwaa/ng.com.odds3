import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const NewResultModal = props => {
  const { defaultData = [], isEdit = false } = props;
  const [alertShow, setAlertShow] = useState(false);
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertResponse, setAlertResponse] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [dataItems, setDataItems] = useState(defaultData);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // console.log(finalData);
    if (defaultData.length === finalData.length) {
      setIsDisabled(false);
    }
  }, [tempData]);

  // useEffect(() => {
  //   // console.log(finalData);
  //   const isIncluded = finalData.findIndex(fd => fd.id === tempData.id);
  //   if (isIncluded === -1) {
  //     setIsDisabled(false);
  //   }
  // }, [tempData]);
  const onPredictionSelect = id => {
    const valueToTemp = defaultData.find(ids => +ids.id === +id);

    setTempData({ ...valueToTemp });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setTempData({
      ...tempData,
      [name]: value
    });
  };
  const handleSubmit = async event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (
      form.checkValidity() === false ||
      !dataItems.hasOwnProperty("league") ||
      !dataItems.hasOwnProperty("date") ||
      !dataItems.hasOwnProperty("logo") ||
      !dataItems.hasOwnProperty("time")
    ) {
      event.stopPropagation();
      setAlertResponse({
        message: {
          header: "ERROR",
          body: `Failed to ${
            isEdit ? "update" : "create"
          } data, did you select a date, time, or the league name`
        },
        variant: "danger"
      });
      setAlertShow(true);
    }
    setValidated(true);

    if (
      form.checkValidity() &&
      dataItems.hasOwnProperty("league") &&
      dataItems.hasOwnProperty("date") &&
      dataItems.hasOwnProperty("logo") &&
      dataItems.hasOwnProperty("time")
    ) {
      await props.callBack(dataItems);
      handleClose();
    }
  };

  const handleAdd = () => {
    const isIncluded = finalData.findIndex(fd => fd.id === tempData.id);

    if (isIncluded !== -1) {
      const temporaryFinalData = finalData.filter(
        fd => +fd.id !== +tempData.id
      );

      setFinalData([...temporaryFinalData, tempData]);
      return setTempData({});
    }

    setFinalData([...finalData, tempData]);
    return setTempData({});
  };

  const handleCancel = () => {
    return setTempData({});
  };
  return (
    <>
      <button
        className={`btn btn-${
          isEdit ? "warning" : "primary"
        }  mr-10 float-right text-white`}
        onClick={handleShow}
      >
        {!isEdit ? "New Result" : "Edit Result"}
      </button>

      <Modal show={show} onHide={setShow}>
        <Form
          method="post"
          onSubmit={async e => handleSubmit(e)}
          noValidate
          validated={validated}
        >
          <h4 className="text-center font-weight-bolder mt-3">Instructions</h4>
          <Modal.Header>
            <Form.Text>
              <p>
                First select the prediction you would like to update, then click
                add to add it to a bulk, once you have created all the results
                from available predictions, you will be able to submit. Click
                Submit
              </p>
            </Form.Text>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Select Prediction</Form.Label>
              <Form.Text>
                Total Done {finalData.length}/{defaultData.length}
              </Form.Text>
              <Form.Control
                as="select"
                onChange={e => onPredictionSelect(e.target.value)}
              >
                <option>Please select an option</option>
                {defaultData.map((prediction, i) => {
                  const doesFinalDataInclude = finalData.findIndex(
                    fd => fd.id === prediction.id
                  );

                  console.log(doesFinalDataInclude);

                  return (
                    <option value={prediction.id} key={i}>
                      {i + 1} -
                      {doesFinalDataInclude !== -1 ? "Done" : "Not Done"}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            {tempData.hasOwnProperty("home_goal") && (
              <>
                <Form.Group>
                  <Form.Label>Home Score</Form.Label>
                  <Form.Control
                    type="text"
                    name="home_goal"
                    // defaultValue={data?.home_goal ?? ""}
                    onChange={e => handleChange(e)}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Away Score</Form.Label>
                  <Form.Control
                    type="text"
                    name="opponent_goal"
                    // defaultValue={data?.opponent_goal ?? ""}
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
                    onChange={e => handleChange(e)}
                  >
                    <option>Select Result</option>
                    <option value="WIN">WIN</option>
                    <option value="LOSE">LOSE</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Add it to results to be created or press cancel to select
                    another option
                  </Form.Label>
                  <div>
                    <button className="btn btn-info" onClick={handleAdd}>
                      Add
                    </button>
                    <button className="btn btn-link" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {finalData.length === defaultData.length && (
              <button
                className="btn btn-primary mx-2"
                type="submit"
                disabled={isDisabled}
              >
                Create
              </button>
            )}
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

export default NewResultModal;
