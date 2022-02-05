export var setStateAsync = function (obj, state) {
    return new Promise(function (resolve, _reject) {
        obj.setState(state, function () {
            resolve();
        });
    });
};
