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
      console.log(`${phrase} ${this.name}`);
    }
    console.log("hi");
  }
}

let user1: Greetable;
user1 = new Person("max");
user1.greet("Hi there - I am");
