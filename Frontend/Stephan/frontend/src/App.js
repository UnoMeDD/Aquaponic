import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Layout, Divider } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import MeasurementView from "./components/measurement-view";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Info from "./components/info-view";
import Header from "./components/header";
import Background from "./data/images/aq1.jpg"; // get image

const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout
        className="layout"
        /* type="flex" */ style={{
          height: "100%",
          overflow: "scroll",
          background: ""

          /*--------------------------------------------------
                  specific background from image
          ---------------------------------------------------*/

          /*           backgroundImage: "url(" + Background + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat" */
        }}
      >
        <Row justify="center" style={{ textAlign: "center" }}>
          <Header />
        </Row>
        <Row>
          <NavBar />
        </Row>
        <Row>
          <Content style={{ padding: "20px" }}>
            <div className="path">
              <Switch>
                <Route path="/measurment" component={MeasurementView} />
                <Route path="/home" exact component={Home} />
                <Route path="/info-view" exact component={Info} />
                <Redirect to="/notFound" />
              </Switch>
            </div>
          </Content>
        </Row>
        <Row>
          <Footer style={footerStyle}>
            created by Chris, Dominic, Stephan
          </Footer>
        </Row>
      </Layout>
    );
  }
}

const footerStyle = {
  color: "#ffffff",
  textAlign: "center",
  backgroundImage: "url(" + Background + ")",
  backgroundSize: "cover",
  backgroundPosition: "bottom center",
  backgroundRepeat: "no-repeat",
  marginBottom: "20px"
};

export default App;
