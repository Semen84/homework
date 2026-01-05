// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.
const person = {
  name: "Семен",
  age: 40,
  city: "Владивосток",
  country: "Россия",
};

console.log(person.name);
console.log(person.age);
console.log(person.city);
console.log(person.country);

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
console.log(isEmpty({})); // true

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.
const task = {
  title: "Задача 1",
  description: "Описание задачи",
  isCompleted: false,
};

function cloneAndModify(object, modifications) {
  const clonedObject = { ...object, ...modifications };
  for (let key in clonedObject) {
    console.log(`${key}: ${clonedObject[key]}`);
  }
}

cloneAndModify(task, { isCompleted: true });

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

// Пример использования:
// const myObject = {
//     method1() {
//         console.log('Метод 1 вызван');
//     },
//     method2() {
//         console.log('Метод 2 вызван');
//     },
//     property: 'Это не метод'
// };
// callAllMethods(myObject);
function callAllMethods(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "function") {
      obj[key]();
    }
  }
}
