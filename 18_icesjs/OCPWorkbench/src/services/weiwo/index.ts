import WeiwoRequest from './models/weiwoRequest';
import WeiwoResponse from './models/weiwoResponse';
import {axios} from "@ice/runtime";

const simulatorIP = '127.0.0.1';

// Web storage API: https://developer.mozilla.org/en-US/docs/Web/API/Storage
function loadDeviceIPsFromStorage(): Array<string> {
  if (typeof window == 'object') {
    const deviceIPsJSONString = window.localStorage.getItem('deviceIPs')
    if (deviceIPsJSONString) {
      const deviceIPs = JSON.parse(deviceIPsJSONString)
      if (Array.isArray(deviceIPs)) {
        return deviceIPs
      }
    }
  }

  return [simulatorIP]
}

function saveDeviceIPsToStorage(deviceIPs: Array<string>) {
  const jsonString = JSON.stringify(deviceIPs)
  window.localStorage.setItem('deviceIPs', jsonString)
}

function WeiwoSerializeArgument(arg: any): any {
  const type = typeof arg
  if (type == 'number' || type == 'string' || type == 'boolean' || arg == null) {
    return arg
  } else if (Array.isArray(arg)) {
    return arg.map(WeiwoSerializeArgument)
  } else if (type == 'object') {
    if (arg.target) {
      return arg.target
    } else {
      return { type: 'raw', value: arg }
    }
  } else {
    return null
  }
}

class Weiwo {
  static deviceIPs: Array<string> = loadDeviceIPsFromStorage();
  static GatewayHost = 'app.ocp';
  static MainQueue = 1;
  static ContainerAsValue = 1 << 1;

  target: object;
  url: string;

  constructor(target: object, deviceSpec?: number | string) {
    this.target = target

    const specType = typeof deviceSpec
    if (specType == 'string') {
      this.url = <string>deviceSpec
    } else if (specType == 'number') {
      const deviceIndex = <number>deviceSpec
      this.url = Weiwo.makeURLWithDeviceIP(Weiwo.deviceIPs[deviceIndex])
    } else {
      this.url = Weiwo.defaultURL()
    }
  }

  async callBlock(blockAST: object, args: Array<any>, flags?: number): Promise<any> {
    const block = new Weiwo(blockAST, this.url)
    return await block.invoke('call', args, flags)
  }

  static vm(deviceSpec?: number | string) {
    return new Weiwo({ type: 'weiwo' }, deviceSpec)
  }

  async invoke(methodName: string, args?: Array<any>, flags?: number): Promise<any> {
    const body: WeiwoRequest = new WeiwoRequest
    body.methodName = methodName
    if (this.target != null) {
      body.target = this.target
    }
    if (args != undefined) {
      body.args = args.map(WeiwoSerializeArgument)
    }

    if (flags != undefined) {
      if (flags & Weiwo.MainQueue) {
        body.mainQueue = true
      }

      if (flags & Weiwo.ContainerAsValue) {
        body.containerAsValue = true
      }
    }

    return this.sendRequest(body);
  }

  async sendRequest(body: object): Promise<any> {
    const url = this.url ? this.url : Weiwo.defaultURL()

    try {
      const dict = <WeiwoResponse>(await axios.post(url, body, { timeout: 10000 })).data

      if (dict.ok) {
        const result = dict.result
        const resultType = typeof result
        if (resultType == 'number' || resultType == 'string' || resultType == 'boolean' || result == null)
          return result
        else if (resultType == 'object') {
          if (result.type == 'raw') {
            return result.value
          } else {
            return new Weiwo(result, url)
          }
        }
      } else {
        return Promise.reject(new Error(dict.msg))
      }
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  // Utility
  static saveDeviceIPs(deviceIPs: Array<string>): void {
    Weiwo.deviceIPs = deviceIPs
    saveDeviceIPsToStorage(deviceIPs)
  }

  static makeHost(str: string): string {
    if (!str.includes('.')) {
      return `${this.GatewayHost}:9010/${str}`
    }

    return str.includes(':') ? str : `${str}:9000`
  }

  static defaultURL(): string {
    return Weiwo.makeURLWithDeviceIP(Weiwo.defaultDeviceIP())
  }

  static defaultDeviceIP(): string {
    return Weiwo.deviceIPs[0]
  }

  // REST style request
  static makeURLWithDeviceIP(deviceIP: string): string {
    return `http://${this.makeHost(deviceIP)}/call`
  }

  static makeDataURLWithDeviceIP(deviceIP: string, name: string): string {
    return `http://${this.makeHost(deviceIP)}/data/${name}`
  }
}

export default Weiwo;
