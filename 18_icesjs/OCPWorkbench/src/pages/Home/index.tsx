import {Component} from "react";
import {Input} from "@alifd/next";
import React from 'react';
import DeviceConnectBalloon from './components/DeviceConnectBalloon';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
    };
    console.log("on constructor");
  }

  render() {
    return (
      <div className='home-page'>
        <div style={{ marginBottom: 10 }}>
          <Input
            placeholder='设备IP'
            style={{ width: 250, marginRight: 10 }}
            hasClear
            onChange={(value: string) => this.setState({ newDeviceIP: value })}
            // onPressEnter={addDevice}
            // value={this.state.newDeviceIP}
          />
          <DeviceConnectBalloon
            buttonLabel={
              <span>
                 摇一摇连接
              </span>
            }
            token='*'
            onDeviceConnected={'null'}
          />
        </div>
      </div>
    )
  }
}
