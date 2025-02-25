/*function sumNumbers(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}
const result = sumNumbers(10, 3);
console.log(result);
console.log(sumNumbers(-3, 5));*/

/*const users = ["John", "Ann", "Alex", "Max"];

function checkForCopyItem(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      return `There is a copy of the ${item} in array`;
    }
  }
  return `There is no such item in the array`;
}
console.log(checkForCopyItem(users, "Alex"));*/
/*====================================================*/
/*Домашка*/
/*Задача №1*/
/*function nameHallo(name) {
  return name;
}
console.log(nameHallo("Hello"));*/
/*Задача №2*/
/*let arr = [5, 10, 13, 27, 2];
function moreThan(numbers) {
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] > 10) {
      console.log(numbers[i]);
    }
  }
  return "Все";
}
console.log(moreThan(arr));*/
/*Задача №3*/
/*function calculator(num1, num2, operator) {
  switch(operator) {
    case 'plus':
      return num1 + num2;
    case 'minus':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if(num2 === 0) return 'Ошибка: деление на ноль!';
      return num1 / num2;
    default:
      return 'Ошибка: неизвестная операция!';
  }
}
let result = calculator(5,7,'divide');
console.log(result);
let result2 = calculator(5,7,'plus');
console.log(result2);
let result3 = calculator(5,7,'minus');
console.log(result3);
let result4 = calculator(5,7,'multiply');
console.log(result4);*/

/*function calculateNambers(num1, num2, operator) {
  if (operator === "plus") {
    return num1 + num2;
  } else if (operator === "minus") {
    return num1 - num2;
  } else if (operator === "divide") {
    return num1 / num2;
  } else if (operator === "multiply") {
    return num1 * num2;
  }
}
let result = calculateNambers(5, 6, "multiply");
console.log(result);*/
/*========================================*/
/*const user = {
  name: 'Alex',
  age: 23,
  isAdmin: false
}
console.log(user.age);*/
/*=============================*/
/*const user = {
  alex: {
    age: 23,
    isAdmin: false,
  },
  john: {
    age: 35,
    isAdmin: true,
    sayHello(name) {
      console.log(`Hello ${name}`);
    },
  },
};
console.log(user.alex.age);
console.log(user.john.isAdmin);
user.john.sayHello("Tom");*/
/*================================*/

/*const users = [
  {
    name: "Alex",
    age: 23,
    isAdmin: false,
  },
  {
    name: "John",
    age: 35,
    isAdmin: true,
  },
];
for (let i = 0; i < users.length; i++) {
  console.log(users[i].age);//23  35
}*/

/*const users = [
  {
    name: "Alex",
    age: 23,
    isAdmin: false,
  },
  {
    name: "John",
    age: 35,
    isAdmin: true,
  },
];

users.push({
  name: "Max",
    age: 40,
    isAdmin: true,
})

for (let i = 0; i < users.length; i++) {
  console.log(users[i]);//Добавится 3 обьект к массиву
}*/
/*
===================================*/
/*Домашка*/

/*const user = {
  name: 'Семен',
  age: 40,
  city: 'Владивосток',
  sayHello(name) {
    console.log(`Hello ${name}`);
  },
}
user.sayHello('Петя');*/

const users = [
  {
    name: "Alex",
    age: 18,
    isAdmin: false,
  },
  {
    name: "John",
    age: 35,
    isAdmin: true,
  },
  {
    name: "Mike",
    age: 51,
    isAdmin: false,
  },
  {
    name: "Luchich",
    age: 99,
    isAdmin: true,
  },
  {
    name: "Konan",
    age: 140,
    isAdmin: false,
  },
];
let numNoAdmin = 0;
for (let i = 0; i < users.length; i++) {
  if(!users[i].isAdmin) {
    numNoAdmin++;
  }
}
console.log(`Количество простых пользователей ${numNoAdmin}`);