import React, { useState, useMemo, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { handleLeagueFetch } from "../lib/utils";
import AlertComponent from "./Alert";

Moment.locale("en");
momentLocalizer();
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JLY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

const PredictionModal = props => {
  const { defaultData = {}, isEdit = false } = props;
  const [alertShow, setAlertShow] = useState(false);
  const [show, setShow] = useState(false);
  const [leagueData, setLeagueData] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState({});
  const [alertResponse, setAlertResponse] = useState({});
  const [validated, setValidated] = useState(false);
  const [dataItems, setDataItems] = useState(defaultData);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const response = await handleLeagueFetch();

    setLeagueData(response.api.leagues);
    setShow(true);
  };

  const selectItems = useMemo(() => {
    return (
      leagueData.length > 0 &&
      leagueData.map((league, i) => {
        return (
          <option key={i} value={JSON.stringify(league)}>
            {`${league.country}-${league.name}`}
          </option>
        );
      })
    );
  }, [leagueData]);

  const handleChange = e => {
    const { name, value } = e.target;

    setDataItems({
      ...dataItems,
      [name]: value
    });
  };

  const handleDateChange = date => {
    const newDate = new Date(date);

    const month = MONTHS[newDate.getMonth()];

    setDataItems({
      ...dataItems,
      date: `${month} ${newDate.getDate()}`,
      time: `${newDate.getHours()}:${newDate.getMinutes()}`
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

  return (
    <>
      <button
        className={`btn btn-${
          isEdit ? "warning" : "primary"
        }  mr-10 float-right text-white`}
        onClick={async () => handleShow()}
      >
        {!isEdit ? "New Prediction" : "Edit Prediction"}
      </button>
      <Modal show={show} onHide={setShow}>
        <Form
          method="post"
          onSubmit={async e => handleSubmit(e)}
          noValidate
          validated={validated}
        >
          <Modal.Header closeButton>
            {alertShow ? (
              <Form.Row>
                <AlertComponent
                  data={[alertShow, setAlertShow]}
                  message={alertResponse.message}
                  variant={alertResponse.variant}
                />
              </Form.Row>
            ) : (
              <Modal.Title id="example-modal-sizes-title-lg">
                {isEdit ? "Update this prediction" : "Create a new prediction"}
              </Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <fieldset>
              <Form.Group>
                <Form.Label>League Name</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={defaultData?.league ?? ""}
                  required
                  onChange={e => {
                    const leagueItem = JSON.parse(e.target.value);
                    setSelectedLeague(leagueItem);

                    setDataItems({
                      ...dataItems,
                      league: `${leagueItem.country} ${leagueItem.name}`,
                      logo: leagueItem.logo,
                      opponent_goal: "?",
                      home_goal: "?",
                      icon: "PAUSE"
                    });
                  }}
                >
                  <option>...</option>
                  {selectItems}
                </Form.Control>
                <Form.Text>
                  Click to drop down to see all available leagues in the world
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Date and Time
                  {/* <DateTimePicker onChange={onChange} value={value} /> */}
                  <DateTimePicker
                    name="date"
                    defaultValue={
                      defaultData?.date &&
                      defaultData?.time &&
                      new Date(`${defaultData.date} ${defaultData.time}`)
                    }
                    min={new Date()}
                    onChange={handleDateChange}
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label>Home</Form.Label>
                <Form.Control
                  type="text"
                  name="home"
                  defaultValue={defaultData?.home ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Away</Form.Label>
                <Form.Control
                  type="text"
                  name="opponent"
                  defaultValue={defaultData?.opponent ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tip</Form.Label>
                <Form.Control
                  type="text"
                  name="tips"
                  defaultValue={defaultData?.tips ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>odd</Form.Label>
                <Form.Control
                  type="number"
                  name="odd"
                  step=".01"
                  defaultValue={defaultData?.odd ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>League Logo</Form.Label>

                <img
                  src={
                    defaultData.hasOwnProperty("logo") &&
                    !selectedLeague.hasOwnProperty("logo")
                      ? defaultData.logo
                      : selectedLeague.logo
                  }
                  width="100"
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
