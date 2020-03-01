import { interval } from "rxjs";

const observable = interval(10);

const subscription = observable.subscribe(
    (value) => console.log(value),
    (error: any) => console.log(error),
    () => console.log("Done!")
);

setTimeout(() => {
    subscription.unsubscribe();
}, 3000);
