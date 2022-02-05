var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import WeiwoRequest from './models/weiwoRequest';
import axios from 'axios';
import StorageTool from './storage-tool';
// MARK: default configuration
var simulatorIP = '127.0.0.1:2222';
var storageKeyDeviceIPs = 'deviceIPs';
function WeiwoSerializeArgument(arg) {
    var type = typeof arg;
    if (type == 'number' || type == 'string' || type == 'boolean' || arg == null) {
        return arg;
    }
    else if (Array.isArray(arg)) {
        return arg.map(WeiwoSerializeArgument);
    }
    else if (type == 'object') {
        if (arg.target) {
            return arg.target;
        }
        else {
            return { type: 'raw', value: arg };
        }
    }
    else {
        return null;
    }
}
var Weiwo = /** @class */ (function () {
    function Weiwo(target, deviceSpec) {
        this.target = target;
        var specType = typeof deviceSpec;
        if (specType == 'string') {
            this.url = deviceSpec;
        }
        else if (specType == 'number') {
            var deviceIndex = deviceSpec;
            this.url = Weiwo.makeURLWithDeviceIP(Weiwo.DeviceIPs[deviceIndex]);
        }
        else {
            this.url = Weiwo.defaultURL();
        }
    }
    Weiwo.prototype.callBlock = function (blockAST, args, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        block = new Weiwo(blockAST, this.url);
                        return [4 /*yield*/, block.invoke('call', args, flags)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Weiwo.vm = function (deviceSpec) {
        return new Weiwo({ type: 'weiwo' }, deviceSpec);
    };
    Weiwo.prototype.invoke = function (methodName, args, flags) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                body = new WeiwoRequest;
                body.methodName = methodName;
                if (this.target != null) {
                    body.target = this.target;
                }
                if (args != undefined) {
                    body.args = args.map(WeiwoSerializeArgument);
                }
                if (flags != undefined) {
                    if (flags & Weiwo.MainQueue) {
                        body.mainQueue = true;
                    }
                    if (flags & Weiwo.ContainerAsValue) {
                        body.containerAsValue = true;
                    }
                }
                return [2 /*return*/, this.sendRequest(body)];
            });
        });
    };
    Weiwo.prototype.executeCode = function (ast) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.sendRequest({ ast: ast })];
            });
        });
    };
    Weiwo.prototype.sendRequest = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var url, dict, result, resultType, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.url ? this.url : Weiwo.defaultURL();
                        console.log('requesting');
                        console.log('ast: ' + JSON.stringify(body));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios.post(url, body, { timeout: 10000 })];
                    case 2:
                        dict = (_a.sent()).data;
                        if (dict.ok) {
                            result = dict.result;
                            resultType = typeof result;
                            if (resultType == 'number' || resultType == 'string' || resultType == 'boolean' || result == null)
                                return [2 /*return*/, result];
                            else if (resultType == 'object') {
                                if (result.type == 'raw') {
                                    return [2 /*return*/, result.value];
                                }
                                else {
                                    return [2 /*return*/, new Weiwo(result, url)];
                                }
                            }
                        }
                        else {
                            return [2 /*return*/, Promise.reject(new Error(dict.msg))];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error('weiwo: ' + err_1);
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Manage device IPs
    Weiwo.saveDeviceIPs = function (deviceIPs) {
        Weiwo.DeviceIPs = __spreadArray([], new Set(deviceIPs), true);
        StorageTool.saveStringArrayToStorage(storageKeyDeviceIPs, Weiwo.DeviceIPs);
    };
    Weiwo.resetDeviceIPsToDefault = function () {
        StorageTool.removeItem(storageKeyDeviceIPs);
        Weiwo.DeviceIPs = StorageTool.loadUniqueStringArray(storageKeyDeviceIPs, []);
    };
    Weiwo.makeHost = function (str) {
        if (!str.includes('.')) {
            return "".concat(this.GatewayHost, ":9010/").concat(str);
        }
        return str.includes(':') ? str : "".concat(str, ":9000");
    };
    Weiwo.defaultURL = function () {
        return Weiwo.makeURLWithDeviceIP(Weiwo.defaultDeviceIP());
    };
    Weiwo.defaultDeviceIP = function () {
        return Weiwo.DeviceIPs[0];
    };
    // REST style request
    Weiwo.makeURLWithDeviceIP = function (deviceIP) {
        return "http://".concat(this.makeHost(deviceIP), "/call");
    };
    Weiwo.makeDataURLWithDeviceIP = function (deviceIP, name) {
        return "http://".concat(this.makeHost(deviceIP), "/data/").concat(name);
    };
    Weiwo.DeviceIPs = StorageTool.loadUniqueStringArray(storageKeyDeviceIPs, [simulatorIP]);
    Weiwo.$ = Weiwo.vm();
    Weiwo.GatewayHost = 'app.ocp';
    Weiwo.MainQueue = 1;
    Weiwo.ContainerAsValue = 1 << 1;
    return Weiwo;
}());
export default Weiwo;
