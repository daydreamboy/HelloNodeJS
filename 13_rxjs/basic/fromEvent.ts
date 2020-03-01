import { fromEvent} from "rxjs";

const observable = fromEvent(document, 'click');

const subscription = observable.subscribe(
    (value) => console.log(value),
    (error: any) => console.log(error),
    () => console.log('Done!')
);

subscription.unsubscribe();
