import Weiwo from "@/services/weiwo";

export async function setupHomePageDataFunctions(_spec = 0) {

  return await Weiwo.vm(_spec).callBlock(
    {
      "type": "block",
      "signature": "v@",
      "paramNames": [],
      "name": "setupHomePageDataFunctions",
      "body": [{
        "name": "once",
        "args": [
          [{"name": "_cmd"}],
          [{"name": "Weiwo"},
            {"name": "declareCFunctions:",  "args": [[{"literal": {"UIImageJPEGRepresentation": "@@d"}}]]},
            {"name": ";"},
            {"name": "$"},
            {"name": "dataFunctions"},
            {"name": "weiwo_setSubscript:value:", "args": [[{"literal": "screenshot"}], [{"name": "Weiwo"}, {
              "name": "createBlock:",
              "args": [[{
                "literal": {
                  "type": "block",
                  "signature": "@@",
                  "paramNames": [],
                  "body": [{
                    "name": "setSlot",
                    "args": [[{"literal": "image"}], [{"name": "$"}, {"name": "class"}, {
                      "name": "shotView:",
                      "args": [[{"name": "UIApplication"}, {"name": "sharedApplication"}, {"name": "keyWindow"}]]
                    }]]
                  }, {"name": ";"}, {
                    "name": "setSlot",
                    "args": [[{"literal": "data"}], [{
                      "name": "UIImageJPEGRepresentation",
                      "args": [[{"name": "image"}], [{"literal": 0.2}]]
                    }]]
                  }, {"name": ";"}, {
                    "name": "return",
                    "args": [[{
                      "name": "curlyBrackets",
                      "args": [[{"literal": "Data"}, {
                        "name": ":",
                        "args": [[{"name": "data"}]]
                      }], [{"literal": "Content-Type"}, {"name": ":", "args": [[{"literal": "image/jpeg"}]]}]]
                    }]]
                  }]
                }
              }]]
            }]]
          }, {"name": ";"}, {"name": "$"}, {"name": "dataFunctions"}, {
            "name": "weiwo_setSubscript:value:", "args": [[{"literal": "device_info"}], [{"name": "Weiwo"}, {
              "name": "createBlock:", "args": [[{
                "literal": {
                  "type": "block",
                  "signature": "@@",
                  "paramNames": [],
                  "body": [{
                    "name": "setSlot",
                    "args": [[{"literal": "bundle"}], [{"name": "NSBundle"}, {"name": "mainBundle"}]]
                  }, {"name": ";"}, {
                    "name": "setSlot",
                    "args": [[{"literal": "data"}], [{
                      "name": "curlyBrackets",
                      "args": [[{"literal": "bundleIdentifier"}, {
                        "name": ":",
                        "args": [[{"name": "bundle"}, {"name": "bundleIdentifier"}]]
                      }], [{"literal": "bundleDisplayName"}, {
                        "name": ":",
                        "args": [[{"name": "bundle"}, {"name": "infoDictionary"}, {
                          "name": "weiwo_getSubscript:",
                          "args": [[{"literal": "CFBundleDisplayName"}]]
                        }, {
                          "name": "?:",
                          "args": [[{"name": "bundle"}, {"name": "infoDictionary"}, {
                            "name": "weiwo_getSubscript:",
                            "args": [[{"literal": "CFBundleName"}]]
                          }]]
                        }]]
                      }], [{"literal": "weiwoVersion"}, {
                        "name": ":",
                        "args": [[{"name": "$"}, {"name": "version"}]]
                      }], [{"literal": "platform"}, {"name": ":", "args": [[{"name": "$"}, {"name": "platform"}]]}]]
                    }]]
                  }, {"name": ";"}, {
                    "name": "if",
                    "args": [[{
                      "name": "NSClassFromString",
                      "args": [[{"literal": "BDTrackerSDK"}]]
                    }], [{"name": "data"}, {
                      "name": "weiwo_setSubscript:value:",
                      "args": [[{"literal": "did"}], [{"name": "BDTrackerSDK"}, {"name": "deviceID"}]]
                    }]]
                  }, {"name": ";"}, {
                    "name": "return",
                    "args": [[{
                      "name": "curlyBrackets",
                      "args": [[{"literal": "Data"}, {"name": ":", "args": [[{"name": "data"}]]}]]
                    }]]
                  }]
                }
              }]]
            }]]
          }]]
      }],
    },
    [],
    Weiwo.ContainerAsValue
  )
}