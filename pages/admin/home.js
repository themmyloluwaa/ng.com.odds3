import {
  Container,
  Card,
  Row,
  Col,
  Navbar,
  Nav,
  Tabs,
  Tab,
  TabContent
} from "react-bootstrap";
import { useState, useMemo } from "react";
import DisplayContent from "../../components/DisplayContent";
import PredictionModal from "../../components/PredictionModal";
import { createPridiction, updatePrediction } from "../../lib/predictionUtils";
import AlertComponent from "../../components/Alert";
import { checkAccess } from "../../lib/utils";

const Home = props => {
  const [key, setKey] = useState("Prediction");
  const [predictions, setPredictions] = useState(props.predictions || []);
  const [results, setResults] = useState(props.results || []);
  const [alertResponse, setAlertResponse] = useState({});
  const [alertShow, setAlertShow] = useState(false);

  const handlePredictionCreate = async data => {
    const createdData = await createPridiction(data);
    console.log(createdData);

    if (Object.entries(createdData).length === 0) {
      setAlertResponse({
        message: {
          header: "ERROR",
          body:
            "Failed to create data, did you select a date, time, or the league name"
        },
        variant: "danger"
      });
      setAlertShow(true);
      return;
    }
    setAlertResponse({
      message: {
        header: "SUCCESS",
        body: "Created successfully"
      },
      variant: "success"
    });
    setAlertShow(true);
    setPredictions([createdData, ...predictions]);
  };

  const handlePredictionEdit = async data => {
    const editedData = await updatePrediction(data);
    if (Object.entries(editedData).length === 0) {
      setAlertResponse({
        message: {
          header: "ERROR",
          body: "Failed to update data, did you select all fields"
        },
        variant: "danger"
      });
      setAlertShow(true);
      return;
    }
    setAlertResponse({
      message: {
        header: "SUCCESS",
        body: "Updated successfully"
      },
      variant: "success"
    });
    setAlertShow(true);

    const indexOfEditedData = predictions.findIndex(
      prediction => +prediction.id === +editedData.id
    );

    const tempPredictions = [...predictions];
    tempPredictions.splice(indexOfEditedData, 1, editedData);

    setPredictions([...tempPredictions]);
  };

  const memoizedPrediction = useMemo(() => {
    return (
      predictions.length > 0 &&
      predictions.map((prediction, i) => {
        return (
          <DisplayContent
            data={prediction}
            editButton={
              <PredictionModal
                defaultData={prediction}
                isEdit={true}
                callBack={handlePredictionEdit}
              />
            }
            key={i}
            callBack={handlePredictionEdit}
          />
        );
      })
    );
  }, [predictions]);

  const memoizedResult = useMemo(() => {
    return (
      results.length > 0 &&
      results.map((result, i) => {
        return (
          <DisplayContent
            data={result}
            key={i}
            callBack={handlePredictionEdit}
          />
        );
      })
    );
  }, [results]);

  return (
    <>
      <Navbar bg="primary" expand="lg" className="mb-40">
        <Navbar.Brand href="#home">
          <img
            src="/img/logo.png"
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" className="text-white">
            Logout
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "80vw"
        }}
      >
        <Card>
          <Tabs activeKey={key} onSelect={k => setKey(k)}>
            <Tab eventKey="Prediction" title="Prediction">
              <Row>
                <Col>
                  <PredictionModal
                    callBack={handlePredictionCreate}
                    isEdit={false}
                  />
                  <button className="btn btn-danger float-right mx-2">
                    Delete All Prediction
                  </button>
                </Col>
              </Row>
              {alertShow && (
                <Row>
                  <Col>
                    <AlertComponent
                      data={[alertShow, setAlertShow]}
                      message={alertResponse.message}
                      variant={alertResponse.variant}
                    />
                  </Col>
                </Row>
              )}
              {/* <DisplayContent  /> */}
              <TabContent className="my-10 ">{memoizedPrediction}</TabContent>
            </Tab>
            <Tab eventKey="Result" title="Result">
              <TabContent className="my-10 ">{memoizedResult}</TabContent>
            </Tab>
            {/* <Tab eventKey="Code" title="Code">
              <DisplayContent />
            </Tab> */}
          </Tabs>
        </Card>
      </Container>

      <style jsx global>
        {`
          body {
            padding: 0;
          }
        `}
      </style>
    </>
  );
};

export async function getServerSideProps(context) {
  let predictions, results;
  checkAccess(context, "/admin/home");

  try {
    predictions = await fetch(`${process.env.DEV_API}/prediction`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    predictions = predictions.status === 200 ? await predictions.json() : [];
    predictions = predictions.sort((a, b) => a.id - b.id);

    results = await fetch(`${process.env.DEV_API}/result`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    results = results.status === 200 ? await results.json() : [];
    results = results.sort((a, b) => a.id - b.id);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      predictions,
      results
    } // will be passed to the page component as props
  };
}
export default Home;
