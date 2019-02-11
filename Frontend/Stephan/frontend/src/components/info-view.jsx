import React from "react";
import { Row, Col } from "antd";
import "bootstrap/dist/css/bootstrap.css";

const Info = () => {
  return (
    <div
      className="InfoView"
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "6px",
        borderColor: "#e8e8e8",
        borderStyle: "solid",
        borderWidth: "1px"
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col span={24}>
          <h2 align="center" style={{ marginBottom: "50px" }}>
            How much is the fish?
          </h2>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{
            marginBottom: "20px"
          }}
        >
          <div className="jumbotron">
            <h3 align="center" style={{ marginBottom: "50px" }}>
              Fischgattung
            </h3>
            <p style={{ marginBottom: "50px" }} className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              laboriosam nostrum aliquam ab quia expedita? Exercitationem
              cupiditate aperiam officiis molestias eligendi quod. Laboriosam
              dolorem laudantium ipsa quibusdam, sunt inventore alias!
            </p>
            <img
              src="https://www.peta.de/mediadb/cache/990x655/TitelBild-Fisch-Karpfen-iStock_64656759-c-abadonian-680x300px.jpg"
              className="img-fluid"
              alt="Fisch"
            />
            <a
              className="btn btn-outline-primary btn-lg"
              href="https://de.wikipedia.org/wiki/Wikipedia:Hauptseite"
              role="button"
              style={{ marginTop: "20px" }}
            >
              Learn more
            </a>
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{
            marginBottom: "20px"
          }}
        >
          <div className="jumbotron">
            <h3 align="center" style={{ marginBottom: "50px" }}>
              Pflanzenart
            </h3>
            <p style={{ marginBottom: "50px" }} className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              laboriosam nostrum aliquam ab quia expedita? Exercitationem
              cupiditate aperiam officiis molestias eligendi quod. Laboriosam
              dolorem laudantium ipsa quibusdam, sunt inventore alias!
            </p>
            <img
              src="https://www.gartenjournal.net/wp-content/uploads/Basilikum-im-Topf.jpg"
              className="img-fluid"
              alt="Basilikum"
            />
            <a
              className="btn btn-outline-success btn-lg"
              href="https://de.wikipedia.org/wiki/Wikipedia:Hauptseite"
              role="button"
              style={{ marginTop: "20px" }}
            >
              Learn more
            </a>
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{
            marginBottom: "20px"
          }}
        >
          <div className="jumbotron">
            <h3 align="center" style={{ marginBottom: "50px" }}>
              Mehr zur Aquaponic
            </h3>

            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title="Aquaponic"
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/LAFE5lAq_io"
                allowFullScreen
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Info;
