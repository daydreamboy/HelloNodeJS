import {Component} from "react";
import {Button, Input} from "@alifd/next";
import React from 'react';
import DeviceConnectBalloon from './components/DeviceConnectBalloon';
import {
  Add,
  History,
  Refresh,
} from '@icon-park/react';
import Weiwo from '../../services/weiwo';
import { setStateAsync } from "@/services/weiwo/utils";

type HomeState = {
  deviceIPs: string[]
  newDeviceIP: string
}

export default class Home extends Component<{}, HomeState> {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      deviceIPs: Weiwo.DeviceIPs,
      newDeviceIP: '',
    };
    console.log("on constructor");
  }

  async saveDeviceIPs(deviceIPs: string[]) {
    Weiwo.saveDeviceIPs(deviceIPs)
    await this.refreshDeviceList()
  }

  async refreshDeviceList() {
    await setStateAsync(this, { deviceIPs: [] })
    await setStateAsync(this, { deviceIPs: Weiwo.DeviceIPs })
  }

  render() {
    const addDeviceWithDeviceIP = async (arg: string) => {
      const { deviceIPs } = this.state
      if (Array.isArray(arg)) {
        console.log('1');
        for (const newDeviceIP of arg) {
          if (!deviceIPs.includes(newDeviceIP)) {
            deviceIPs.unshift(newDeviceIP)
          }
        }
      } else {
        console.log('2');
        const newDeviceIP = arg

        console.log('3: ' + deviceIPs);
        deviceIPs.unshift(newDeviceIP)
      }
      console.log('4');
      await this.saveDeviceIPs(deviceIPs)
    }

    const addDevice = async () => {
      const { newDeviceIP } = this.state
      if (newDeviceIP.length == 0) {
        console.error('deviceIP is empty');
        return
      }

      await addDeviceWithDeviceIP(newDeviceIP)
    }

    return (
      <div className='home-page'>
        {/* 第一行 */}
        <div style={{ marginBottom: 10 }}>
          <Input
            placeholder='设备IP'
            style={{ width: 250, marginRight: 10 }}
            hasClear
            onChange={(value: string) => this.setState({ newDeviceIP: value })}
            onPressEnter={addDevice}
            value={this.state.newDeviceIP}
          />
          <DeviceConnectBalloon
            buttonLabel={
              <span>摇一摇连接</span>
            }
            token='*'
            onDeviceConnected={'todo'}
          />
          <DeviceConnectBalloon
            buttonLabel={
              <span>扫码连接</span>
            }
            onDeviceConnected={'todo'}
          />
          <DeviceConnectBalloon
            buttonLabel={
              <span>从网关中选择调试设备</span>
            }
            onDeviceConnected={'todo'}
          />
        </div>

        {/* 第二行 */}
        <div>
          <Button.Group style={{ marginTop: 10 }}>
            <Button onClick={() => {
              alert('TODO');
            }}>
              <Add /> 新增设备
            </Button>
            <Button
              onClick={() => {
                Weiwo.resetDeviceIPsToDefault()
                window.location.reload()
              }}
            >
              <History /> 恢复默认设置
            </Button>
            <Button
              onClick={async () => {
                // await this.refreshDeviceList()
                // TODO
              }}
            >
              <Refresh /> 重新刷新设备列表
            </Button>
          </Button.Group>
        </div>

        {/* 第三行 */}
        <div>

        </div>
      </div>
    )
  }
}
