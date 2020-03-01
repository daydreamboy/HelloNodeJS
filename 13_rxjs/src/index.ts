import { Observable } from "rxjs";

let observable = Observable.create((observable:any) => {
    observable.next('Hello world!');
    observable.next('Hello again!');
    observable.complete();
    observable.next('Bye');
});

observable.subscribe(
    (x: any) => logItem(x),
    (error: any) => logItem('Error: ' + error),
    () => logItem('Completed')
);

function logItem(val: any) {
    let node = document.createElement('li');
    let textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById('list').appendChild(node);
}

import { fromEvent} from "rxjs";

const observable2 = fromEvent(document, 'click');

const  subscription = observable2.subscribe(
    (value) => console.log(value),
    (error: any) => console.log(error),
    () => console.log('Done!')
);

subscription.unsubscribe();
