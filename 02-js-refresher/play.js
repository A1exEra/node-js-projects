const userName = "Alex";
const age = 38;
const hobbies = ["Sports", "Cooking", "Reading"];
const hasHobbies = true;

const person = {
  name: "Alex",
  age: 38,
  hobbies: ["Sports", "Cooking"],
  greet() {
    console.log(`Hi, my name is ${this.name}`);
  },
};

const summarizeUser = (name, age, userHasHobby) => {
  return `Users name is: ${name}, users age is: ${age}, and user has hobbies: ${userHasHobby}`;
};

const user = summarizeUser(userName, age, hasHobbies);

const forLoop = (hobeis) => {
  for (const hobbie of hobbies) {
    console.log(hobbie);
  }
};

const newHobbies = [...hobbies, "Coding"];
// const mapHobbies = hobbies.map((hobby) => console.log(hobby));
// const mapHobbies = newHobbies.map((hobby) => console.log(hobby));

const toArray = (...args) => {
  return console.log(...args);
};

// const printName = (person) => {
//   const { name } = person;
//   console.log(name);
// };
const printName = (obj) => {
  obj.greet();
};
// console.log(user);
// console.log(user);
// person.greet();
// forLoop(hobbies);
// toArray("one", "two", "three");
// mapHobbies;
// printName(person);

// Asynchronous code
const fetchData = () => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      res("Done after 1500 ms");
    }, 1500);
  });
  return promise;
};
setTimeout(() => {
  console.log("Timer is Done");
  fetchData()
    .then((text) => {
      console.log(text);
      return fetchData();
    })
    .then(() => console.log("Promise resolved"));
}, 2000);
