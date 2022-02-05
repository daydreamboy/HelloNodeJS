import {Component, FunctionComponent} from "react";
import {axios} from "@ice/runtime";
import {setupHomePageDataFunctions} from "@/services/ocs-workbench";
import Weiwo from "@/weiwo";
import {Loading, Close, Apple, Android} from "@icon-park/react";
import {Button, Tag} from "@alifd/next";
import React from 'react';

type PlatformIconProps = {
  platform: 'iOS' | 'Android'
}

type AppStatus = PlatformIconProps & {
  bundleIdentifier: string
  bundleDisplayName: string
  did: string
}

type DevicePanelProps = {
  deviceIP: string
  index: number
  setDefaultCallback: () => void
  removeDeviceCallback: () => void
  showRemoveButton: boolean
}

type DevicePanelState = {
  status: 'offline' | 'fetching' | 'online'
  info: AppStatus | null
}

const PlatformIcon: FunctionComponent<PlatformIconProps> = ({ platform }) => {
  switch (platform) {
    case 'iOS':
      return <Apple theme='filled' style={{ color: 'black' }} />
    case 'android':
      return <Android theme='filled' style={{ color: 'green' }} />
    default:
      return null
  }
}

class DevicePanel extends Component<DevicePanelProps, DevicePanelState> {
  constructor(props: DevicePanelProps) {
    super(props)
    this.state = {
      status: 'fetching',
      info: null
    }
  }

  async componentDidMount() {
    const { deviceIP, index } = this.props
    const setupResult = await setupHomePageDataFunctions(index)
    console.log('setupResult: ' + setupResult);
    if (setupResult === null) {
      const resp = await axios.get(Weiwo.makeDataURLWithDeviceIP(deviceIP, 'device_info'))
      this.setState({ info: resp.data, status: 'online' })
    } else {
      this.setState({ status: 'offline' })
    }
  }

  render() {
    const { deviceIP, index, setDefaultCallback, removeDeviceCallback, showRemoveButton } = this.props;
    const { status, info } = this.state;

    const renderDeviceContent = () => {
      switch (status) {
        case 'offline':
          return '离线'
        case 'fetching':
          return <Loading />
        case 'online':
          return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <small> {info ? info.bundleIdentifier : ''} </small>
              <strong> {info ? info.bundleDisplayName : ''} </strong>
              {info && 'did' in info && info.did.length > 0 ? (
                <div>
                  <span>DID: </span> {info.did}
                </div>
              ) : null}
            </div>
          )
      }
    }

    const renderActions = () => {
      return (
        <Button.Group size='small'>
          {index != 0 ? <Button onClick={setDefaultCallback}> 设为默认 </Button> : null}
        </Button.Group>
      )
    }

    return (
      <div
        style={{ width: 250, minHeight: 550, marginRight: 10, marginBottom: 10, backgroundColor: "#FFFFFF" }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {status == 'online' && info ? <PlatformIcon platform={info.platform} /> : null}
            <strong> {deviceIP} </strong> {index == 0 ? <Tag type='primary'> 默认 </Tag> : null}
          </div>

          <div>
            {showRemoveButton ? (
              <a onClick={removeDeviceCallback}>
                <Close />
              </a>
            ) : null}
          </div>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          {renderDeviceContent()}
          <br />
          {status == 'online' ? (
            <img src={Weiwo.makeDataURLWithDeviceIP(deviceIP, 'screenshot')} style={{ maxWidth: 200 }} />
          ) : null}
          <br />
          {renderActions()}
        </div>
      </div>
    )
  }
}

export default DevicePanel;
