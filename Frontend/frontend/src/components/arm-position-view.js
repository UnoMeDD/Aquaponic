import React, { Component } from "react";

class ArmPositionView extends Component {
  green = "#27ae60";
  red = "#e74c3c";

  constructor(props) {
    super(props);

    this.endpoint = props.endpoint;
    // default states
    this.state = {
      isLoading: false,
      armMoving: false,
      labelColor: this.red, // color for status
      backgroundAP: props.backgroundAP // state for colors -> darkmode
    };
  }

  componentDidMount() {
    this.triggerRefresh();

    this.interval = setInterval(() => this.triggerRefresh(), 15000);
  }

  triggerRefresh = () => {
    this.updateData();
  };

  updateData = async () => {
    this.setState({ isLoading: true });

    let endpointData = await this.endpoint();
    console.log(endpointData);

    this.setState({
      isLoading: false,
      armMoving: endpointData.pumpRunning,
      labelColor: endpointData.pumpRunning ? this.green : this.red
    });
  };

  render() {
    return (
      <div className="armPosition" style={{ fontSize: "150%" }}>
        <nav aria-label="breadcrumb">
          <ol
            className="breadcrumb"
            style={{ backgroundColor: this.state.backgroundAP }}
          >
            <li className="breadcrumb-item active" aria-current="page">
              {" "}
              Position:{" "}
              <span style={{ color: this.state.labelColor }}>
                {this.state.armMoving ? "◉ Measuring" : "◉ Resting"}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default ArmPositionView;
