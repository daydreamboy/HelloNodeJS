
class StorageTool {
  /**
   * Get value from object by key path
   *
   * @param {key} string the key
   * @param {defaultValue}  Array<string> the default value
   *
   * @returns Return default value if not found.
   *
   * @see Web storage API: https://developer.mozilla.org/en-US/docs/Web/API/Storage
   */
  static loadUniqueStringArray(key: string, defaultValue: Array<string>): Array<string> {
    if (typeof window == 'object') {
      const JSONString = window.localStorage.getItem(key)
      if (JSONString) {
        const strings = JSON.parse(JSONString)
        if (Array.isArray(strings) && strings.length != 0) {
          // @see https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array
          return [... new Set(strings)];
        }
      }
    }

    return defaultValue;
  }

  static saveStringArrayToStorage(key: string, value: Array<string>) {
    if (typeof key !== 'string') {
      return false;
    }

    const jsonString = JSON.stringify(value);
    window.localStorage.setItem(key, jsonString);

    return true;
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default StorageTool;
