import React from "react";
import { Row, Col } from "antd";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  return (
    <div
      className="HomeView"
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "6px",
        borderColor: "#e8e8e8",
        borderStyle: "solid",
        borderWidth: "1px"
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24 }} type="flex" justify="center">
        <Col span={24}>
          <h2 align="center" style={{ marginBottom: "50px" }}>
            Impressum
          </h2>
        </Col>
        <Col xs={24} sm={24} md={21} lg={21} xl={21}>
          <div className="jumbotron jumbotron-fluid" align="center">
            <div className="container">
              <h3
                style={{
                  fontSize: "200%",
                  color: "yellowgreen",
                  fontStyle: "italic",
                  marginBottom: "30px"
                }}
              >
                Automatisierter Nährstoffkreislauf
              </h3>
              <img
                src="https://cdn.1millionwomen.com.au/media/large_image/how_aquaponics_work.png"
                className="img-fluid"
                alt="Basilikum"
                style={{ marginBottom: "30px" }}
              />
              <p
                className="lead"
                style={{
                  margin: "20px",
                  fontSize: "150%",
                  color: "black",
                  fontStyle: "italic" // normal|italic|oblique|initial|inherit
                }}
              >
                Ein Projekt zur Schonung der natürlichen Ressourcen von Dominic
                Duda, Christopher Hänßel und Stephan Prugner.
              </p>
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={7}
          style={{
            marginBottom: "20px"
          }}
        >
          <div
            className="jumbotron"
            style={{ background: "rgb(178, 207, 255)" }}
          >
            <h3 align="center" style={{ marginBottom: "30px" }}>
              Dominic
            </h3>
            <img
              src="https://www.gartenjournal.net/wp-content/uploads/Basilikum-im-Topf.jpg"
              className="img-fluid"
              alt="System"
              style={{ marginBottom: "30px" }}
            />
            <p style={{ marginBottom: "50px" }} className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              laboriosam nostrum aliquam ab quia expedita? Exercitationem
              cupiditate aperiam officiis molestias eligendi quod. Laboriosam
              dolorem laudantium ipsa quibusdam, sunt inventore alias!
            </p>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={7}
          style={{
            marginBottom: "20px"
            /*             backgroundColor: "lightgreen" */
          }}
        >
          <div
            className="jumbotron"
            style={{ background: "rgb(198, 255, 243)" }}
          >
            <h3 align="center" style={{ marginBottom: "30px" }}>
              Chris
            </h3>
            <img
              src="https://www.gartenjournal.net/wp-content/uploads/Basilikum-im-Topf.jpg"
              className="img-fluid"
              alt="Basilikum"
              style={{ marginBottom: "30px" }}
            />
            <p style={{ marginBottom: "50px" }} className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              laboriosam nostrum aliquam ab quia expedita? Exercitationem
              cupiditate aperiam officiis molestias eligendi quod. Laboriosam
              dolorem laudantium ipsa quibusdam, sunt inventore alias!
            </p>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={7}
          lg={7}
          xl={7}
          style={{
            marginBottom: "20px"
            /*             backgroundColor: "lightgreen" */
          }}
        >
          <div
            className="jumbotron"
            style={{ background: "rgb(227, 255, 198)" }}
          >
            <h3 align="center" style={{ marginBottom: "30px" }}>
              Stephan
            </h3>
            <img
              src="https://www.gartenjournal.net/wp-content/uploads/Basilikum-im-Topf.jpg"
              className="img-fluid"
              alt="Basilikum"
              style={{ marginBottom: "30px" }}
            />
            <p style={{ marginBottom: "50px" }} className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              laboriosam nostrum aliquam ab quia expedita? Exercitationem
              cupiditate aperiam officiis molestias eligendi quod. Laboriosam
              dolorem laudantium ipsa quibusdam, sunt inventore alias!
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

/* 
---------------------------------
old code
-----------------------------------
import React from "react";
import { Row, Col } from "antd";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
      <Col span={24}>
        <h2 align="center" style={{ marginBottom: "50px" }}>
          Übersicht
        </h2>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        style={{ marginBottom: "20px" }}
      >
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1
              className="display-4"
              style={{
                margin: " 50px",
                fontSize: "300%",
                color: "yellowgreen",
                fontStyle: "normal",
                fontFamily: "Trebuchet MS",
                fontWeight: "normal"
              }}
            >
              Automatisierter Nährstoffkreislauf
            </h1>
            <p
              className="lead"
              style={{
                margin: "50px",
                fontSize: "180%",
                color: "black",
                fontStyle: "italic" // normal|italic|oblique|initial|inherit
              }}
            >
              Ein Projekt zur Schonung der natürlichen Ressourcen von Dominic
              Duda, Christopher Hänßel und Stephan Prugner.
            </p>
          </div>
        </div>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        style={{ marginBottom: "20px" }}
      >
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            title="Aquaponic"
            className="embed-responsive-item"
            src="https://www.youtube.com/embed/LAFE5lAq_io"
            allowFullScreen
          />
        </div>
      </Col>
    </Row>
  );
};

export default Home;
 */
