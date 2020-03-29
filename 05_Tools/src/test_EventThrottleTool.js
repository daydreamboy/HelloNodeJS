import EventThrottleTool from "../library/EventThrottleTool";

let previousTimestampForAppear = 0;
let currentTimestampForAppear = 0;
let eventAppear = 'appear';

let previousTimestampForClick = 0;
let currentTimestampForClick = 0;
let eventClick = 'click';

function run_forever() {
    setInterval(function () {
        // Throttle appear event
        if (EventThrottleTool.checkEventShouldBeHandledByInterval(eventAppear, 1000)) {
            currentTimestampForAppear = Date.now();
            console.log((currentTimestampForAppear - previousTimestampForAppear) + ': handle appear event');
            previousTimestampForAppear = currentTimestampForAppear;
        }

        // Throttle click event
        if (EventThrottleTool.checkEventShouldBeHandledByInterval(eventClick, 5000)) {
            currentTimestampForClick = Date.now();
            console.log((currentTimestampForClick - previousTimestampForClick) + ': handle click event');
            previousTimestampForClick = currentTimestampForClick;
        }
        
    }, 100);
}

export { run_forever };
