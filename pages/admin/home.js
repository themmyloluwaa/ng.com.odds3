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
import { useState, useMemo, useEffect } from "react";
import DisplayContent from "../../components/DisplayContent";
import PredictionModal from "../../components/PredictionModal";
import {
  createPridiction,
  updatePrediction,
  deleteAllPrediction,
  deletePrediction
} from "../../lib/predictionUtils";
import {
  createResult,
  deleteResult,
  updateResult,
  deleteAllResult
} from "../../lib/resultUtils";
import AlertComponent from "../../components/Alert";
import { checkAccess, handleLogout } from "../../lib/utils";
import NewResultModal from "../../components/NewResultModal";
import EditResultModal from "../../components/EditResultModal";
import Router from "next/router";
const Home = props => {
  const [key, setKey] = useState("Result");
  const [predictions, setPredictions] = useState(props.predictions || []);
  const [results, setResults] = useState(props.results || []);
  const [alertResponse, setAlertResponse] = useState({});
  const [alertShow, setAlertShow] = useState(false);

  const handlePredictionCreate = async data => {
    const createdData = await createPridiction(data);

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

  const handlePredictionDelete = async id => {
    const alertResponse = confirm("Are you sure you want to delete ?");

    if (alertResponse) {
      let deletedPrediction = await deletePrediction(id);
      if (Object.entries(deletedPrediction).length === 0) {
        const filteredOutDeletedPredictions = predictions.filter(
          predVar => Number(predVar.id) !== Number(id)
        );

        setAlertResponse({
          message: {
            header: "SUCCESS",
            body: "Deleted successfully"
          },
          variant: "success"
        });
        setAlertShow(true);

        return setPredictions([...filteredOutDeletedPredictions]);
      } else {
        setAlertResponse({
          message: {
            header: "FAILED",
            body: "Failed to delete prediction"
          },
          variant: "danger"
        });
        return setAlertShow(true);
      }
    }
  };

  const handleResultCreate = async data => {
    data.forEach(resVar => delete resVar.id);
    const createdData = await createResult(data);

    // if(data.length !== predictions.length) {
    //   setAlertResponse({
    //     message: {
    //       header: "ERROR",
    //       body:
    //         "You must update all the predictions before creating."
    //     },
    //     variant: "danger"
    //   });
    //   setAlertShow(true);
    //   return;
    // }

    if (Object.entries(createdData).length === 0) {
      setAlertResponse({
        message: {
          header: "ERROR",
          body:
            "Failed to create data, did you put the home, away and tip for all the predictions"
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
    setResults([...createdData]);
  };

  const handleResultDelete = async id => {
    const alertResponse = confirm("Are you sure you want to delete ?");

    if (alertResponse) {
      let deletedResults = await deleteResult(id);
      if (Object.entries(deletedResults).length === 0) {
        const filteredOutDeletedResults = results.filter(
          resVar => Number(resVar.id) !== Number(id)
        );

        setAlertResponse({
          message: {
            header: "SUCCESS",
            body: "Deleted successfully"
          },
          variant: "success"
        });
        setAlertShow(true);

        return setResults([...filteredOutDeletedResults]);
      } else {
        setAlertResponse({
          message: {
            header: "FAILED",
            body: "Failed to delete result"
          },
          variant: "danger"
        });
        return setAlertShow(true);
      }
    }
  };

  const handleResultEdit = async data => {
    const editedData = await updateResult(data);
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

    const indexOfEditedData = results.findIndex(
      result => Number(result.id) === Number(editedData.id)
    );

    const tempResults = [...results];
    tempResults.splice(indexOfEditedData, 1, editedData);

    setResults([...tempResults]);
  };
  const handleDeleteAllPredictions = async e => {
    const alertResponse = confirm(
      "Are you sure you want to delete all the predictions?"
    );

    if (alertResponse) {
      let deletePredictions = await deleteAllPrediction();
      if (Object.entries(deletePredictions).length === 0) {
        setAlertResponse({
          message: {
            header: "SUCCESS",
            body: "Deleted all successfully"
          },
          variant: "success"
        });
        setAlertShow(true);

        return setPredictions([]);
      } else {
        setAlertResponse({
          message: {
            header: "FAILED",
            body: "Failed to delete all  predictions"
          },
          variant: "danger"
        });
        return setAlertShow(true);
      }
    }
  };
  const memoizedPrediction = useMemo(() => {
    return predictions.length > 0 ? (
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
            handleDelete={handlePredictionDelete}
            key={i}
            callBack={handlePredictionEdit}
          />
        );
      })
    ) : (
      <div>No Predictions available</div>
    );
  }, [predictions]);

  const memoizedResult = useMemo(() => {
    return results.length > 0 ? (
      results.map((result, i) => {
        return (
          <DisplayContent
            data={result}
            key={i}
            editButton={
              <EditResultModal
                defaultData={result}
                callBack={handleResultEdit}
              />
            }
            handleDelete={handleResultDelete}
            callBack={handlePredictionEdit}
          />
        );
      })
    ) : (
      <div>No Results available</div>
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
          <Nav.Link
            className="text-white"
            onClick={() => {
              handleLogout();
              Router.reload();
            }}
          >
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
              <Row className="mt-5">
                <Col>
                  <PredictionModal
                    callBack={handlePredictionCreate}
                    isEdit={false}
                  />
                  {predictions.length > 0 && (
                    <button
                      className="btn btn-danger float-right mx-2"
                      onClick={async e => await handleDeleteAllPredictions()}
                    >
                      Delete All Prediction
                    </button>
                  )}
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
              <Row className="mt-5">
                <Col>
                  <NewResultModal
                    isEdit={false}
                    defaultData={props.resultsTobeAdded}
                    callBack={handleResultCreate}
                  />
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
  let predictions,
    results,
    resultsTobeAdded = [];
  checkAccess(context, "/admin/home");

  try {
    predictions = await fetch(`${process.env.API_URL}/prediction`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    predictions = predictions.status === 200 ? await predictions.json() : [];
    predictions = predictions.sort((a, b) => a.id - b.id);

    results = await fetch(`${process.env.API_URL}/result`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    results = results.status === 200 ? await results.json() : [];
    results = results.sort((a, b) => a.id - b.id);

    if (predictions.length > 0) {
      resultsTobeAdded = [...predictions];
      resultsTobeAdded.forEach(predVar => {
        delete predVar.created_at;
        delete predVar.updated_at;
      });
    }
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      predictions,
      results,
      resultsTobeAdded
    } // will be passed to the page component as props
  };
}
export default Home;
