import * as React from 'react';
import { Button, Balloon } from '@alifd/next';
import {Component} from "react";

class DeviceConnectBalloon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  render() {
    const { buttonLabel, token } = this.props;
    return (
      <Balloon
        shouldUpdatePosition={true}
        trigger={
          <Button
            type='primary'
            style={{ marginRight: 20 }}
            onClick={() => {
              this.setState({ visible: true })
            }}
          >
            {buttonLabel}
          </Button>
        }
        visible={this.state.visible}
        onVisibleChange={(visible, type) => {
          if (type === 'docClick' || type === 'closeClick') {
            this.setState({ visible: false })
          }
        }}
      >
        {/*<DeviceConnectionPanel*/}
        {/*  token={token}*/}
        {/*  onDeviceConnected={(deviceIP: string) => {*/}
        {/*    this.setState({ visible: false })*/}
        {/*    this.props.onDeviceConnected(deviceIP)*/}
        {/*  }}*/}
        {/*/>*/}
      </Balloon>
    )
  }
}

export default DeviceConnectBalloon;

