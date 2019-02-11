import React, { Component } from "react"; // react import
import { Row, Col, Switch } from "antd"; // adds grid design
import GraphView from "./graph-view"; //imports line-graph template
import PumpStatusView from "./pump-status-view"; // imports pumpstatus
import ArmPositionView from "./arm-position-view"; // imports position from ph-sensor
import BackendConnector from "../data/backend-connector"; // imports endpoints

class MeasurementView extends Component {
  // hex color values
  /*   white = "#ffffff";
  black = "#000000";
  ligrey = "#f2f2f2";
  midgrey = "#666666";
  dagrey = "#2e2e30"; */
  constructor(props) {
    super(props);

    this.state = {
      backgroundMV: "#f2f2f2",
      backgroundColor: "#ffffff",
      fontColor: "#2e2e30"
    };
  }

  // function for Darkmode => sets color (hex)
  backGround = checked => {
    this.setState({
      // condition: is checked true?
      switchChecked: checked,
      // conditional operator in js es6 = if-statement

      fontColor: checked ? "#ffffff" : "#2e2e30",
      backgroundColor: checked ? "#000000" : "#ffffff",
      backgroundMV: checked ? "#2e2e30" : "#f2f2f2"
    });
  };

  render() {
    // let imgUrl = ""; // if backgroundpicture comes from link

    return (
      <div
        className="Component-MV"
        style={{
          backgroundColor: this.state.backgroundColor,
          color: this.state.fontColor,
          padding: "20px",
          borderRadius: "6px",
          borderColor: "#e8e8e8",
          borderStyle: "solid",
          borderWidth: "1px"

          /*--------------------------------------------------
                  specific background from image
          ---------------------------------------------------*/
          /*  backgroundImage: "url(" + imgUrl + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat" */
        }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24 }} type="flex" justify="center">
          <Col span={24}>
            <h2 align="center" style={{ marginBottom: "20px" }}>
              Measurement
            </h2>
            {/* switch darkmode on/off */}
            <div style={{ marginTop: "10px", marginBottom: "20px" }}>
              <Switch onChange={this.backGround} />
              <span> Darkmode</span>
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <PumpStatusView
              endpoint={
                BackendConnector.pumpEndpoint /* Parameter to get data from endpoint */
              }
              backgroundPS={this.state.backgroundMV}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <ArmPositionView
              endpoint={
                /* Parameter to get data from endpoint */
                BackendConnector.pumpEndpoint
              }
              backgroundAP={this.state.backgroundMV}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={graphStyle}>
            <GraphView
              title="water-temp"
              backgroundColor={"rgba(19, 121, 216, 0.1)"}
              borderColor={"rgb(19, 121, 216)"}
              endpoint1={BackendConnector.temperatureEndpoint}
              backgroundGV={this.state.backgroundMV}
              fontColor={this.state.fontColor}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={graphStyle}>
            <GraphView
              title="ambient-temp"
              backgroundColor={"rgba(0,153,204,0.1)"}
              borderColor={"rgba(0,153,204,102)"}
              endpoint1={BackendConnector.ambientTemperature}
              backgroundGV={this.state.backgroundMV}
              fontColor={this.state.fontColor}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={graphStyle}>
            <GraphView
              title="water-level"
              backgroundColor={"rgba(102,102,255,0.1)"}
              borderColor={"rgba(102,102,255)"}
              endpoint1={BackendConnector.waterLevel}
              backgroundGV={this.state.backgroundMV}
              fontColor={this.state.fontColor}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} style={graphStyle}>
            <GraphView
              title="pH-value"
              backgroundColor={"rgba(237, 110, 133, .1)"}
              borderColor={"rgb(237, 110, 133)"}
              endpoint1={BackendConnector.phEndpoint}
              backgroundGV={this.state.backgroundMV}
              fontColor={this.state.fontColor}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const graphStyle = { marginBottom: "20px" };

export default MeasurementView;
