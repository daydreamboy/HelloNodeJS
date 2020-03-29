/**
 * This tool used as singleton which hold a global map
 *
 * @see https://stackoverflow.com/a/1479341
 */

const timestampKeeper = {};

function storeTimestamp(key, timestamp) {
    timestampKeeper[key] = timestamp;
}

function restoreTimestamp(key) {
    return timestampKeeper[key];
}

/**
 * Check the event should be handled on current timestamp. Return true to handle, return false to ignore.
 *
 * @param key the unique string
 * @param interval the milliseconds
 * @returns {boolean} return true if the time between current event and previous event is greater than the interval,
 * or return false.
 * @note The first time call this method by the different key will always return true.
 * @discussion Call this method and return true will store the new timestamp.
 */
function checkEventShouldBeHandledByInterval(key, interval) {
    let previousTimestamp = restoreTimestamp(key);
    let currentTimestamp = Date.now();

    if (previousTimestamp === undefined || currentTimestamp - previousTimestamp > interval) {
        storeTimestamp(key, currentTimestamp);
        return true;
    }
    else {
        return false;
    }
}

export default {
    checkEventShouldBeHandledByInterval,
}
