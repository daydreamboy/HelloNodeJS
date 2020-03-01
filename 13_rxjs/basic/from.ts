import { from } from "rxjs";

const observable = from([10, 20, 30]);

const subscription = observable.subscribe(
    (value) => console.log(value),
    (error: any) => console.log(error),
    () => console.log('Done!')
);

subscription.unsubscribe();
