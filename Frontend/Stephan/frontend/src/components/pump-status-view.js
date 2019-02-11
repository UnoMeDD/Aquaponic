import React, { Component } from "react";

class PumpStatusView extends Component {
  green = "#27ae60";
  red = "#e74c3c";

  constructor(props) {
    super(props);

    this.endpoint = props.endpoint; //class variable

    this.state = {
      backgroundPS: props.backgroundPS, // state for colors -> darkmode
      isLoading: false, // on load false
      pumpRunning: false, // if no connection -> false
      labelColor: this.red
    };
  }
  // DOM finished -> refresh to load states
  componentDidMount() {
    this.triggerRefresh();
    // function for pagerefresh every 15s
    this.interval = setInterval(() => this.triggerRefresh(), 15000);
  }

  triggerRefresh = () => {
    this.updateData();
  };
  // load data from server
  updateData = async () => {
    this.setState({ isLoading: true });

    let endpointData = await this.endpoint();
    console.log(endpointData);

    this.setState({
      isLoading: false,
      pumpRunning: endpointData.pumpRunning,
      labelColor: endpointData.pumpRunning ? this.green : this.red
    });
  };

  render() {
    return (
      <div className="PumpStatusView" style={{ fontSize: "150%" }}>
        <nav aria-label="breadcrumb">
          <ol
            className="breadcrumb"
            style={{ backgroundColor: this.state.backgroundPS }}
          >
            <li className="breadcrumb-item active" aria-current="page">
              {" "}
              Pump:{" "}
              <span style={{ color: this.state.labelColor }}>
                {this.state.pumpRunning ? "◉ Running" : "◉ Stopped"}
              </span>
            </li>
          </ol>
        </nav>
      </div>
    );
  }
}

export default PumpStatusView;
