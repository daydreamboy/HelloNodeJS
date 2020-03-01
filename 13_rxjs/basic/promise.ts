import { from } from "rxjs";
import fetch from "node-fetch";
import { map } from "rxjs/operators";

const uri = "https://jsonplaceholder.typicode.com/todos/1";
const observable = from(fetch(uri)).pipe(map(x => x.json()));

const subscription = observable.subscribe(
    (value) => console.log(value.toString())
);

subscription.unsubscribe();