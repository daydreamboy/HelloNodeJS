import { Observable } from "rxjs";

const observable = new Observable(function subscribe(subscriber) {
    const intervalId = setInterval(() => {
       subscriber.next('hi');
    }, 1000);

    return function unsubscribe() {
        clearInterval(intervalId);
    }
});

const subscription = observable.subscribe((value) => { console.log(value); });

setTimeout(() => {
    subscription.unsubscribe();
},5000);