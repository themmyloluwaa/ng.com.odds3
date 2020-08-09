import React, { useState } from "react";
import { Form } from "react-bootstrap";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import { handleLeagueFetch } from "../../lib/utils";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

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

const Test = () => {
  const [leagueData, setLeagueData] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    const response = await handleLeagueFetch();

    setLeagueData(response.api.leagues);
    setShow(true);
  };

  const [dataItems, setDataItems] = useState({});
  const [test, setTest] = useState("");

  const [validated, setValidated] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    setDataItems({
      ...dataItems,
      [name]: value
    });
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    console.log(form.checkValidity());
    return;
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

  return (
    <Form
      method="post"
      onSubmit={handleSubmit}
      noValidate
      validated={validated}
    >
      <fieldset>
        <Form.Group>
          <Form.Label>League Name</Form.Label>
          <Form.Control
            as="select"
            required
            onChange={e => {
              const leagueItem = JSON.parse(e.target.value);
              setSelectedLeague(leagueItem);

              setDataItems({
                ...dataItems,
                name: `${leagueItem.country} ${leagueItem.name}`,
                logo: leagueItem.logo,
                opponent_goal: "?",
                home_goal: "?",
                icon: "pause"
              });
            }}
          >
            <option>...</option>
            {leagueData.length > 0 &&
              leagueData.map((league, i) => {
                return (
                  <option key={i} value={JSON.stringify(league)}>
                    {`${league.country}-${league.name}`}
                  </option>
                );
              })}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Date and Time
            {/* <DateTimePicker onChange={onChange} value={value} /> */}
            <DateTimePicker
              name="date"
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
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Away</Form.Label>
          <Form.Control
            type="text"
            name="opponent"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tip</Form.Label>
          <Form.Control
            type="text"
            name="tips"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>odd</Form.Label>
          <Form.Control
            type="number"
            name="odd"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>League Logo</Form.Label>

          <img src={selectedLeague.logo} width="100" />
        </Form.Group>

        <input
          onChange={e => setTest(e.target.value)}
          style={{
            height: "40vh",
            background: "yellow"
          }}
        />
      </fieldset>

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
    </Form>
  );
};

export default Test;
