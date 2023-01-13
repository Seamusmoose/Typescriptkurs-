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
console.log(result, "res");

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
console.log(person2.name);

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
console.log(Role3.Admin);

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

console.log(egFunc2(1, 3, "as-Number"));
console.log(egFunc2("1", "4", "as-Number"));
console.log(egFunc2("max", "harry", "as-Text"));

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
  console.log(n1 + n2);
};
// functions as types - create a function where the parameters have to match the functions type requirements exactly
const egFunc5 = (n1: number, n2: number) => {
  return n1 + n2;
};
//let funcExample: Function; // also works
let funcExample: (a: number, b: number) => number;
funcExample = egFunc5;

console.log(funcExample(8, 7));

// callback functions as types - use a callback as a parameter, to instruct a strict result on the logic of the function
const addAndHandle = (n1: number, n2: number, cb: (num: number) => void) => { // cb is a parameter to set restrictions on what the cb function value can be
  const result = n1 + n2;
  cb(result);
};

addAndHandle(10, 20, (result) => {
  console.log(result, "cb");
});

// unknown - the usecase for unknown is if you dont know the data type, however you know what type controls you will need after
let userInput: unknown;
let userName: string;

let exampleUser = "max";
if (typeof userInput === "string") {
  userName = userInput;
}

// never - specifies clearly that this function never returns a value
const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
};

const res = generateError("an error occuured", 500);
console.log(res);

// any - can except any value, types are not checked, use as last resort
