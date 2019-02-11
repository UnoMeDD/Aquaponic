import React, { Component } from "react";
import { Row, Col, Radio, Button, Switch } from "antd"; // libary for grid and control elements
import { Line } from "react-chartjs-2"; // libary for linegraph

class GraphView extends Component {
  constructor(props) {
    super(props);
    this.endpoint1 = props.endpoint1;
    // default values and individual props for every graph
    this.state = {
      timeframe: "24h", // default timespan
      title: props.title, // adds individual title from component
      pointRadius: 0, // size for tooltips
      animationTime: 50,
      tension: 0, // Interpolation on/off -> 0.5/0
      backgroundColor: props.backgroundColor, // linegraph
      borderColor: props.borderColor, // linegraph
      backgroundGV: props.backgroundGV, // state for colors -> darkmode
      fontColor: props.fontColor,
      lastUpdated: Date.now(), // function timestamp
      options: {},
      data: {}, // values and labels from datasets

      isLoading: false
    };
  }

  // refreshes information after render-method when DOM is finished
  componentDidMount() {
    this.triggerRefresh();
  }
  // function Tooltips/switch
  toggleTooltip = checked => {
    console.log(this.state.pointRadius); // output to check function
    this.setState({
      switchChecked: checked,
      pointRadius: checked ? 3 : 0 // if
    });
    this.triggerRefresh();
  };

  // function Interpolation/switch
  toggleTension = checked => {
    console.log(this.state.tension); // output to check function
    this.setState({
      switchChecked: checked,
      tension: checked ? 0.5 : 0 // if
    });
    this.triggerRefresh();
  };

  // refresh Data -> reload button
  handleTimeChange = e => {
    this.updateData(e.target.value);
  };
  // update data 12h, 24h, 72h
  triggerRefresh = e => {
    const timeframe = this.state.timeframe;
    this.updateData(timeframe);
  };

  // waiting for respons from endpoint
  updateData = async timeframe => {
    this.setState({ isLoading: true });
    // timeframe sets timespan 12h, 24h, 72h
    let endpointData1 = await this.endpoint1(timeframe);
    console.log(endpointData1);

    // map => converts element in array to timestamp
    let labels = endpointData1.map(element => {
      return new Date(element.timestamp * 1000);
    });
    // values have 2 decimals => 0.00
    let data1 = endpointData1.map(element => {
      return Math.round(1000 * element.value) / 1000; // without Math.round -> float
    });

    /*
    // solws down performance
    let maxValue = await this.endpoint1();
    console.log("Maximum: " + maxValue[maxValue.length - 1].value); */

    const graphOptions = {
      elements: {
        line: {
          tension: this.state.tension // Interpolation on/off => 0.5/0
        }
      },
      animation: {
        duration: this.state.animationTime // general animation time in ms
      },
      hover: {
        animationDuration: 0 // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
      legend: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: true, // locks ratio
      scales: {
        // sets format for x-axsis
        xAxes: [
          {
            type: "time",
            time: {
              unit: "hour"
            },
            /*  'linear': data are spread according to their time (distances can vary)
            'series': data are spread at the same distance from each other */
            distribution: "linear",
            bounds: "data",

            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            //stacked: true,
            display: true
            /* ticks: {
          //suggestedMin: 17, // minimum will be 0, unless there is a lower value
          //suggestedMax: 23
        } */
          }
        ]
      }
    };

    const datasets = {
      labels: labels,

      datasets: [
        {
          pointRadius: this.state.pointRadius, // 0 disabeles hitpoints
          backgroundColor: this.state.backgroundColor,
          borderColor: this.state.borderColor,
          pointBackgroundColor: this.state.borderColor,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(103, 58, 183, .8)",
          data: data1 // connected to endpoint
        }
        // { data: data2 } // additional graphdata
      ]
    };

    /* sets default values on refresh */

    this.setState({
      options: graphOptions,
      data: datasets,
      isLoading: false,
      lastUpdated: Date.now(),
      timeframe: timeframe
    });
  };
  render() {
    return (
      <div
        className="GraphView"
        style={{
          padding: "20px",
          backgroundColor: this.state.backgroundGV,
          borderRadius: "6px",
          borderColor: "#e8e8e8",
          borderStyle: "solid",
          borderWidth: "1px"
        }}
      >
        <Row>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <span>
              <p style={{ fontSize: "200%", color: this.state.borderColor }}>
                {this.state.title}
              </p>
            </span>
          </Col>
          <Col span={12}>
            {/* choose between timespan */}
            <Radio.Group
              value={this.state.timeframe}
              onChange={this.handleTimeChange}
              style={{
                marginBottom: "10px",
                display: "block",
                textAlign: "right"
              }}
            >
              <Radio.Button
                value="12h"
                style={{
                  backgroundColor: this.state.backgroundGV,
                  color: this.state.fontColor
                }}
              >
                12 h
              </Radio.Button>
              <Radio.Button
                value="24h"
                style={{
                  backgroundColor: this.state.backgroundGV,
                  color: this.state.fontColor
                }}
              >
                24 h
              </Radio.Button>
              <Radio.Button
                value="3d"
                style={{
                  backgroundColor: this.state.backgroundGV,
                  color: this.state.fontColor
                }}
              >
                72 h
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={24}>
            {/* import graph component */}
            <div className="chart">
              <Line data={this.state.data} options={this.state.options} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            {/* switch tooltips on/off */}
            <div
              style={{
                textAlign: "left",
                color: this.state.fontColor
                //size: "small"
              }}
            >
              <Switch onChange={this.toggleTooltip} />
              <span> Tooltips</span>
            </div>
            <div
              style={{
                marginTop: "10px",
                textAlign: "left",
                color: this.state.fontColor
                //size: "small"
              }}
            >
              <Switch onChange={this.toggleTension} />
              <span> Interpolation</span>
            </div>
          </Col>

          <Col span={12}>
            <div
              style={{
                textAlign: "right",
                color: this.state.fontColor
                //size: "small"
              }}
            >
              {/* timestamp */}
              <span>
                Last updated: {new Date(this.state.lastUpdated).toUTCString()}
              </span>
              {/* update data */}
              <Button
                size="default" // small, large
                icon="reload"
                style={{ marginLeft: "10px", marginTop: "10px" }}
                loading={this.state.isLoading}
                onClick={this.triggerRefresh}
              >
                Reload
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

// const statusStyle = { textAlign: "left", color: "#95a5a6", size: "small" };

export default GraphView;
