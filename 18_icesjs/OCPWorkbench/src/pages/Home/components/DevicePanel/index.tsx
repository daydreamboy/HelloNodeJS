import {Component} from "react";
import {axios} from "@ice/runtime";
import {setupHomePageDataFunctions} from "@/services/weiwo/builtin-patches";
import Weiwo from "@/services/weiwo";

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
}

export default DevicePanel;
