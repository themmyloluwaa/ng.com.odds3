import { useState } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
const LandingPage = () => {
  const [show, setShow] = useState(false);
  return (
    <Layout title="Odds 3">
      <header className="header p-4">
        <Navbar bg="none" expand="lg" className="mb-40">
          <Navbar.Brand href="#home">
            <img
              src="/img/logo.png"
              width="100"
              height="100"
              className="d-inline-block align-top "
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="text-white" href="#about">
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="text-white" href="#contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar>

        <section className="text-center section">
          <h1 className="heading-primary">
            <span className="heading-primary__main">Odds 3</span>
            <span className="heading-primary__sub">
              Small Games, Bigger Profits
            </span>
          </h1>
          <a href="#download" className="bt btn-animateds">
            Download
          </a>
        </section>
      </header>

      <main>
        <section>
          <div className="text-center u-margin-bottom-big">
            <h2 className="heading-secondary">
              Best Odds Guranteed to Win You Games
            </h2>
          </div>
          <Container>
            <div
              id="about"
              // className="flex-col items-center mx-auto max-w-screen-xl justify-between flex md:flex-row"
            >
              {/* <div className="feature-about_child-1 w-full md:w-1/2 mb-10 md:md-0  feature-about_width"> */}
              <h3 className="heading-tertiary u-margin-bottom-small">
                Cross Platform Odd Suggestion App
              </h3>
              <Row>
                <Col xs="12" md="6">
                  <p>
                    Odds 3 is a bet suggestion mobile application that supplies
                    carefully analysed 3 odds with 99% success rate. We believe
                    in less game more win strategy and we strive to provide
                    nothing but the best correctly analysed games for our users.
                    With a 99% win rate, this is one app you surely need to turn
                    your betting fortunes around.
                  </p>
                  <div
                    id="download"
                    className="img-container mt-10 md:mt-40 sm:mb-30 md:mb-0 flex justify-center mb-5"
                  >
                    <a
                      className="ml-10 mr-5"
                      href="https://play.google.com/store/apps/details?id=ng.com.odds_3"
                    >
                      {" "}
                      <img
                        src="/img/playstore.png"
                        alt="Playstore Image"
                        className=" store-icon"
                        style={{ width: "30%" }}
                      />
                    </a>
                    <a onClick={() => setShow(true)}>
                      {" "}
                      <img
                        src="/img/apple store.png"
                        alt="Playstore Image"
                        className="store-icon"
                        style={{ width: "30%" }}
                      />
                    </a>
                  </div>
                </Col>
                <Col xs="12" md="6">
                  <div className="feature-about_child-2 feature-about_width">
                    <div className="composition mb-40 md:mb-0">
                      <img
                        // className="composition_photo w-3/4  md:w-1/2 composition_photo-1"
                        src="/img/Android 2.png"
                        alt="odds 3 app preview"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            {/* </div> */}
          </Container>
        </section>
      </main>
      <footer id="contact" className="footer text-center my-5 py-5">
        <p className="mb-5">Developed by {"< CodeKagei />"} ☕☕☕</p>
        <div className="flex flex-row justify-center cursor-pointer">
          <a
            className="mr-5"
            href="https://twitter.com/themmyloluwaaa"
            target="_blank"
          >
            <img src="/img/twitter.png" style={{ width: "3%" }} />
          </a>
          <a
            className="mr-5"
            href="https://www.linkedin.com/in/temiloluwa-ojo"
            target="_blank"
          >
            <img src="/img/linkedin.png" style={{ width: "3%" }} />
          </a>
          <a href="https://github.com/themmyloluwaa" target="_blank">
            <img src="/img/github.png" style={{ width: "3%" }} />
          </a>
        </div>
      </footer>
      {show === true ? (
        <>
          <div className="modaling-overlay"></div>
          <div className="modaling mx-auto px-10">
            <h3 className="heading-tertiary mt-10 mb-12 border-b-2 pb-3">
              Coming Soon
            </h3>
            <p>
              We are working hard to ensure that our app is available on the
              apple store. Please be patient with us while we work on this. For
              now you can use the web version that would be released soon.
            </p>

            <div className="close-button">
              <button onClick={() => setShow(false)}>Close</button>
            </div>
          </div>{" "}
        </>
      ) : null}
    </Layout>
  );
};

export default LandingPage;
