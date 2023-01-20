// things to revise:
// Inheritance, singletons, instansiate

// --------------------------------- Type basics and data Structures------------------------------

// Strings
const string2: string = "test"; // this is useless in most scenarios
const string3 = "test"; // regular js is more accurate
let string: string;
string = "string"; // this can be useful if value will be checked later, but still want it to be type checked as string

// Booleans
let result = 0;
const bool = true; // same as vanilla js
const testBool = (a: number, b: number, ifExists: Boolean) => {
  if (ifExists) {
    result = a + b;
  }
};
testBool(7, 6, true);
//console.log(result, "res");

//number
const test = (a: number, b: number) => a + b;
//test(7, 5); //parameters should be assigned a type for type checking

// Object types
const person: {
  name: string;
  age: number;
} = {
  name: "jeff",
  age: 27,
}; // this is bad practices, you should use vanilla js:
const person2 = {
  name: "jeff",
  age: 27,
};
//console.log(person2.name);

// arrays
let arrayExample: string[]; // can only accept assignments of strings to the array
let arrayExample2: number[]; // can only accept assignments of numbers to the array
let arrayExample3: boolean[]; // can only accept assigments of booleans to the array
let arrayExample4: any[]; // can accept assignments of any data types to the array

// arrayExample = "test" // this would fail because the type checker is expecting an array of string not a single string

// tuples - fixed length and data type array
let tupleExample: [string, number];
tupleExample = ["test", 6]; // works because it meets parameters of fixed length and same type

// enums - assign a number to a human readable label
enum Role {
  Admin, // 0
  readOnly, // 1
  Author, // 2
} // each recieve an assigned number
enum Role2 {
  Admin = 5, // 5
  readOnly, // 6
  Author, // 7
} // becase a value was assigned, the other enums increment from the value
enum Role3 {
  Admin = "test", // "test"
  readOnly = 5, // 5
  Author, // 6
} // strings can also be assigned, but the following enum needs to have a value assigned for the other enums
//console.log(Role3.Admin);

// Union types
const egFunc = (a: string | number, b: string | number) => {
  let result;
  if (typeof a === "number" && typeof b === "number") {
    result = a + b;
  } else {
    if (typeof a === "string" && typeof b === "string") {
      result = a.toString() + b.toString();
    }
    return result;
  }
};

//egFunc(1, 3);
//egFunc("max", "harry");

// literal types - restricting values of a type from string,boolean or number. in this example: resultConversion: "as-Number" | "as-Text"
// main takeaway from this is it improves type safety
const egFunc2 = (
  a: string | number,
  b: string | number,
  resultConversion: "as-Number" | "as-Text"
) => {
  let result;
  if (
    (typeof a === "number" && typeof b === "number") ||
    resultConversion === "as-Number"
  ) {
    result = +a + +b;
  } else {
    result = a.toString() + b.toString();
  }

  return result;
};

//console.log(egFunc2(1, 3, "as-Number"));
//console.log(egFunc2("1", "4", "as-Number"));
//console.log(egFunc2("max", "harry", "as-Text"));

// alias custom types - create your own specific custom type check to narrow your requirements. For example below a union type is used to make the code more readable
type ExampleAlias = number | string;

const egFunc3 = (
  a: ExampleAlias,
  b: ExampleAlias,
  resultConversion: "as-Number" | "as-Text"
) => {
  let result;
  if (
    (typeof a === "number" && typeof b === "number") ||
    resultConversion === "as-Number"
  ) {
    result = +a + +b;
  } else {
    result = a.toString() + b.toString();
  }

  return result;
};

// void -if a function deliberately shouldn´t return anything use void
const egFunc4 = (n1: number, n2: number): void => {
  //console.log(n1 + n2);
};
// functions as types - create a function where the parameters have to match the functions type requirements exactly
const egFunc5 = (n1: number, n2: number) => {
  return n1 + n2;
};
//let funcExample: Function; // also works
let funcExample: (a: number, b: number) => number;
funcExample = egFunc5;

//console.log(funcExample(8, 7));

// callback functions as types - use a callback as a parameter, to instruct a strict result on the logic of the function
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => {
  // cb is a parameter to set restrictions on what the cb function value can be
  const result = n1 + n2;
  cb(result);
};

addAndHandle(10, 20, (result) => {
  //console.log(result, "cb");
});

// unknown - the usecase for unknown is if you dont know the data type, however you know what type controls you will need after
let userInput: unknown;
let userName: string;

let exampleUser = "max";
if (typeof userInput === "string") {
  userName = userInput;
}

// never - specifies clearly that this function never returns a value
//const generateError = (message: string, code: number): never => {
//throw { message: message, errorCode: code };
//};

//const res = generateError("an error occuured", 500);
//console.log(res);

// any - can except any value, types are not checked, use as last resort

// ----------------------- Classes and Interfaces  OOP-------------------------------

// Objects - all data is stored in the objects
// Classes - blueprints for  objects

// basic class
// class Department {
//   name: string; // field/property of a class

//   constructor(n: string) {
//     // The constructor is executed when the object is being created, which ties the values to the object
//     this.name = n; // this sets the "name" property ^^to the value passed into the constructor. "updates the property value"
//   }

//   describe(this: Department) {
//     // adds extra type safety to the "this" keyword to protect from unwanted behaviours
//     console.log("this department is " + this.name); // refering to the global var
//   }
// }

// const accounting = new Department("Accounting");

// accounting.describe();

// // public and private Acess Modifiers
// // private - when a property is marked privated, it can only be altered from within the class
// class Department2 {
//   //public name: string; // public is the default, re-assignment is available outside of the class
//   private employees: string[] = [];

//   constructor(
//     private readonly id: number, // readonly added to id, cannot be changed after initialization
//     private name: string
//   ) {}

//   describe(this: Department2) {
//     console.log(`this department is ${this.name} with code ${this.id}`);
//   }

//   addEmployee(employee: string) {
//     this.employees.push(employee);
//   }

//   printEmployeeInfo() {
//     console.log(this.employees.length);
//     console.log(this.employees);
//     console.log(this.id);
//   }
// }
// const accounting2 = new Department2(21, "Accounting");

// // accounting2.employees[1] = "anna"; Doesnt work with private set, because you cannot edit outside of the class

// accounting2.addEmployee("max");
// accounting2.addEmployee("ted");

// accounting2.describe();
// accounting2.printEmployeeInfo();

// // ^^shorthand initialization - shorten the this.x syntax by passing everything together as params^^
// // ^^read only modifier - readonly labelled properties can only be initialized once

// // inheritance - "extends" keyword inherits from specified class (Department). Only one class can be inherited
// class ITDepartment extends Department {
//   admins: string[] // example of admins being only scoped to this class, however having it in the constructor is best practices
//   // - if a constructor is not used within this class, then the original class constructor is used here
//   constructor(id: string, admins: string[]) {
//     // the "admins" array is only scoped to ths "ITDepartment"
//     // whenever you add your own constructor, in a class that inherits from another class
//     // super calls the constructor of the base class (Department)
//     super(id); // the param is passed through the super
//     this.admins = admins; // this.blah needs to always be after the super
//   }
// }

// const accounting3 = new ITDepartment("21", ["max", "terry"]);
// re-do classes

// One clas for all course info
// Benefits of OOP:
// - work with "real life" entities
// - each object represents a "real life" Object

// classes - "blueprints for objects"
// objects -  "things you work with within the code"

// instances - "an object created is an instance of the class" (Like the output result of a template)
abstract class DepartmentBluePrint {
  //   private employees: string[] = [];
  protected employees: string[] = []; // protected extends access to all extended classes of DepartmentBluePrint

  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    // statically created object
    return { name: name };
  }

  abstract describe(this: DepartmentBluePrint): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    //console.log(this.employees.length, "employees array length");
    //console.log(this.employees, "employees array");
  }
}

class ITDepartment extends DepartmentBluePrint {
  // IT Department inherits the values from DepartmentBluePrint
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  describe() {
    //console.log(`IT Department - ID: ` + this.id);
  }
}

class AccountingDepartment extends DepartmentBluePrint {
  private lastReport: string;
  private static instance: AccountingDepartment;

  // A getter is a property where you execute a function or a method, when you retrieve a value to add extra logic
  get mostRecentReport() {
    // a getter always has to return something
    if (this.lastReport) {
      return this.lastReport;
    }

    throw new Error("No report foundd");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass a valid value");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("A2", []);
    return this.instance;
  }

  describe() {
    //console.log(`Accounting department - ID: ` + this.id);
  }

  addEmployee(name: string) {
    if (name === "max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    //console.log(this.reports);
  }
}

const employee1 = DepartmentBluePrint.createEmployee("Ani");
//console.log(employee1);

const it = new ITDepartment("IT1", ["tim", "thomas"]);
it.addEmployee("Jim");
it.addEmployee("James");
it.describe();
it.printEmployeeInformation();

// const accounting = new AccountingDepartment("A1", []);
const accounting = AccountingDepartment.getInstance();
accounting.addReport("Something went wrong...");
accounting.mostRecentReport = "Year end report";
//console.log(accounting.mostRecentReport, "most recent report");
accounting.addEmployee("max");
accounting.addEmployee("meredith");

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();

//console.log(it, "ITTTT");
//console.log(accounting, "ACC");

// -------------- Interfaces ---------
// if you want to work with an object, use an interface"

//type addFn = (a: number, b: number) => number;
interface addFn {
  (a: number, b: number): number;
}

let add: addFn;

add = (n1: number, n2: number) => n1 + n2;

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      //console.log(`${phrase} ${this.name}`);
    }
    //console.log("hi");
  }
}

let user1: Greetable;
user1 = new Person("max");
user1.greet("Hi there - I am");

// ------------ advanced typying concepts -------------------

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // combines the types
// interfaces can also be used, however types in this case are cleaner and shorter

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// intersection types - review this
// type Combinable = string | number;
// type Numeric = number | boolean;

// type universal = Combinable | Numeric;

type UnknownEmployee = Employee | Admin;
// type Guards - the checker does not know if privildges exists or not, as Employee and Admin have different values
function printEmployeeInformation(emp: UnknownEmployee) {
  //console.log(`Name: ` + emp.name);
  if ("privileges" in emp) {
    // "in" detects if the specified string is a property of "Employee"
    //console.log(`Priviledges ` + emp.privileges);
  }

  if ("startDate" in emp) {
    //console.log(`Priviledges ` + emp.startDate);
  }
}
printEmployeeInformation(e1);
printEmployeeInformation({ name: "Jim", startDate: new Date() }); // also works without errors, just excludes priviledges

class Car {
  drive() {
    //console.log("driving... c");
  }
}

class Truck {
  drive() {
    //console.log("driving....T");
  }

  loadCargo(amount: number) {
    //console.log("loading cargo: " + amount);
  }
}

type vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // type guards check if this instance of vehicle, was based on the truck contructor function
    vehicle.loadCargo(10000);
  }
}

useVehicle(v1);
useVehicle(v2);

// type guards: descriminated union

interface Bird {
  type: "bird"; // this is a literal type, not a typescript type
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log(`current animal speed: ${speed}`);
}

moveAnimal({ type: "bird", flyingSpeed: 20 });

// typescript requires the element to be specified, as typescript doesn´t know if it exists or not
const i = <HTMLInputElement>document.getElementById("user-input");

// below is the alternative syntax
const i2 = document.getElementById("user-input"); // as HTMLInputElement;
i.value = "hi";

if (i2) {
  // if a null check is needed, create an if statement with the element check in brackets, before the value
  (i2 as HTMLInputElement).value = "hello";
}

interface ErrorContainer {
  // email: "not a valid email", username: "Must start with a capital letter"
  // boolean here is not allowed
  id: string; // now all parameters passed through the error container need an id, but importantly the type can only be string, because the array below is an index type, so the other propertys have to conform
  [prop: string]: string; // this is saying, I dont know the property name or the property count, but the property and value must be a string
}

const errorBag: ErrorContainer = {
  id: "1",
  email: "not a valid email",
  //   1: "not a valid email", // this could also work as well, as this number can also be interpreted as a string
  username: "Must start with a capital letter",
};

type Combinable = string | number;
type Numeric = number | boolean;

type universal = Combinable | Numeric;

// here you can specify what to output, with specific cases of the function parameters
// this is called fuctional overloads
function addUnion(a: number, b: number): number;
function addUnion(a: string, b: string): string;
function addUnion(a: number, b: string): string;
function addUnion(a: string, b: number): string;

function addUnion(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const resultUnion = addUnion("max", "blah");
//resultUnion.split("") // typescript doesnt know if resultUnion holds a number or string so this wont work

// optional chaining

const fetchedUserData = {
  id: 1,
  name: "seb",
  job: { title: "CEO", description: "my Company" },
};

console.log(fetchedUserData?.job?.title); // using if checks by chaining question marks, will stop a run time error while checking if the value exists

// null coalescing
const userInput2 = null;

// if the first value is "falsy" the OR operator assigns the second default value
const storedData = userInput2 || "Default"; // however if the inputvalue is "" for example, that is also falsy so this approach is incorrect

// using the nullish coalescing operator is a better solution, as its only falsy values are undefined or null, 0 and "" will be truthy
const storedData2 = userInput2 ?? "Default";

// ------------------ generics --------------------

const names: Array<string> = ["max", "jeff"]; // a generic type, is a type connected to another type i.e Array-string, so typescript can be more precise

// promise type
const promise: Promise<Number> = new Promise((resolve, reject) => {
  // specifiying what this promise will return with a generic type, will catch issues immediately like below
  setTimeout(() => {
    resolve(10);
    //resolve("promise returned");
  }, 2000);
});

//promise.then((data) => data.split("")); // if any type had been used above, this would not be controlled, if the wrong type is provided then an error is thrown
promise.then((data) => data.toString()); // Works
// basically generic types help you to get addition type information with more complicated functions, classes etc. "does something with the data that is coming in"

// create your own generic type
// generic function

function merge<T, U>(obA: T, obB: U) {
  // basically saying both are of any type, but they will be different
  // with generic types, we are telling typescript, that the provided T;U parameters will be of different types, that we will have two different kinds of data that could return an intersection
  return { ...obA, ...obB };
}

const mergedObj = merge({ name: "jim" }, { age: 30 }); // typescript infers the type of values we are passing as arguments, however the data types can also be specified in the fuction call if needed
// mergedObj.name // typescript doesnt expect this value returned, it is expected an object
console.log(mergedObj.age);

// working with constraints
function merge2<T extends object, U extends object>(obA: T, obB: U) {
  // now a strict object constraint is added
  return { ...obA, ...obB };
}

const mergedObj2 = merge(
  { name: "jim", hobbies: ["sport", "cooking"] },
  { age: 30 }
);

interface Lengthy {
  length: number;
}

// another generic type
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length > 0) {
    // without the lengthy interface check, typescript throws errors because it cannot confirm a length
    description = `has ${element.length} elements`;
  }

  return [element, description]; //tuple
}

console.log(countAndDescribe("hi there"));

// the keyof contraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  // T specifies it must be an object, and using keyof, U specifies it must be a Key value of T
  return obj[key];
}
// this specific kind of keyof check, helps to avoid easy mistakes, like trying to access a property that doesnt exist
extractAndConvert({ name: "max" }, "name");

// generic classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("test");
textStorage.addItem("jeff");
textStorage.removeItem("test");

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(2);
numberStorage.addItem(7);
numberStorage.removeItem(2);

console.log(numberStorage.getItems());

// const objStorage = new DataStorage<object>(); // this will not work as objects were not specified, this is why tighter controls are nessesary
// objStorage.addItem({ name: "manu" });
// objStorage.addItem({ name: "max" });
// objStorage.removeItem({ name: "manu" });

// console.log(objStorage.getItems());

// utility generic types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // the partial Utility wraps our own type, and creates an object type where the properties are optional?
  // to summarise: this allows us to have the object empty initially, then add the properties after
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; // the return needs to be type casted, because typescript still registers the object as "Partial" instead of as CourseGoal
}

// Readonly
const names2: Readonly<string[]> = ["mark", "jeff"];
//names2.push("jack") // wont work because it has been marked Readonly

// Union types vs Generic types
// (flexible with types) Union types are perfect if you want different types to be passed into your function i.e string | boolean | number
// (strict with types) Generic types are perfect if you want to use the same type throught your class or function that u create
