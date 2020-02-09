
/*
const tom = {
  name: "Tom",
  city: "Munich",
  age: 33,
  printDetails: function () {
    console.log(`${this.name} - ${this.city}`);
  }
};

tom.printDetails();
 */

interface IPerson {
    name: string;
    city: string;
    age: number;
    printDetails(): string;
    // Note: mark optional
    anotherFunc?(a: number, b: number): number;
}

const tom: IPerson = {
    name: "Tom",
    city: "Munich",
    age: 33,
    printDetails(): string {
        return `${this.name} - ${this.city}`;
    }
}

console.log(tom.printDetails())
