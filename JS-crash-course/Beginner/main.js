 
// variables
// let - can reassign
// const - can not reassign
 
// Data types
// primitives(7) and non primitives(objects)
// String - sequence of characters           
// Number - integer and floats
// boolean - true or false
// undefined - value is not assigned
//      let result; // result is undefined
// null - represent empty 
// BigInt - 
// symbol - 

// objects - contains properties defined as key value pairs
// store collection of data
// const person = {
//     "name": "John",
//     "age": 23,
//     "isMarried": false
// }
// console.log(person.name) -> John

// array
// const numbers = [1,3,4,5,6]
// console.log(numbers[3])

// Operators

// assignment
//      let x = 5

// arithmatic -> + - * / % ++ --

// comparison 
//      < > <= >= 
//      x == y  // return true or false
//      x === y // check data type also

// logical -> && || != 

// string 
//      console.log("Hello" + "World")

// ternery
        // const isEven = 10 % 2 === 0 ? 'number is even' : false
        // console.log(isEven)

// Type conversions
// implicit
    // console.log(2+'4')
    // console.log(5 - '3')
    // console.log(true + '4')
    // console.log('3' + '4')
    // console.log('2' * '3')
    // console.log('6' / '2')
// explicit
    // console.log(Number('5')) -> 5
    // console.log(Number(true)) -> 1
    // console.log(parseInt('4')) -> 4
    // console.log(parseFloat('4.2')) -> 4.2

    // console.log(String(500)) -> 500 as string
    // console.log(String(true)) -> true
    // console.log((500).toString())
    // console.log(Boolean(10)) -> true
    // console.log(Boolean("Hi")) -> true
    // console.log(Boolean(null)) -> false
    // console.log(Boolean(undefined)) -> false
    // console.log(Boolean(0))

// Equality

    // == -> allow coercion
    // === -> not allow coercion

    // const var1 = 'test'
    // const var2 = 'test'
    // console.log(var1 == var2) -> true
    // console.log(var1 === var2) -> true

    // const var1 = 5
    // const var2 = '5'
    // console.log(var1 == var2) -> true
    // console.log(var1 === var2) -> false

    // const var1 = null
    // const var2 = undefined
    // console.log(var1 == var2) -> true
    // console.log(var1 === var2) -> false

// Conditional statements

    // if-else
    // const num = -5
    // if(num > 0)
    //     console.log("positive number")
    // else if(num < 0)
    //     console.log("not positive")
    // else
    //     console.log("zero")

    // const isPositive = (num > 0)? "positive" : "negative"
    // console.log(isPositive)

    // switch
    // const color = 'red'
    // switch(color){
    //     case 'red' : 
    //         console.log("red")
    //         break
    //     case 'blue': 
    //         console.log('Blue')
    //         break
    //     default :
    //         console.log("not valid")
    // }

// Loops
 // for loop
    // const count = 10
    // for (let i = 0; i < count ; i++) {
    //      console.log(i)
    // }

// while loop
    // let count = 0
    // while(count < 5){
    //     console.log(count)
    //     count++
    // }

// do while loop
    // let count = 1
    // do {
    //     console.log(count)
    //     count++
    // } while (count<0);

// for of loop
    // const numbers = [1,3,5,7,9]
    // for(const num of numbers){
    //     console.log(num)
    // }

// Functions
    // block of code to perform a certain task
    // function greet(name){
    //     console.log("Hello " + name)
    // }
    // greet("Samith")
    // greet("John")

    // function add(num1, num2){
    //     return num1 + num2
    // }
    // const sum = add(5,10)
    // console.log(sum)

    // const arrowSum = (num1, num2) => {
    //     return num1 + num2
    // }
    // const sum = arrowSum(3,5)
    // console.log(sum)

    // const addFive = num => num + 5

// Scope 
    // scope basically determines the accessibility or visibility of variables
    
    // block scope - can access only in the block where it declared
    // if(true){
    //     const name = "Sam"
    // }
    // console.log(name) -> cannot access here

    // function scope - can access only in the function where it declared
    // function test(){
    //     const count = 0
    // }
    // console.log(count) -> cannot access here

    // global scope - declare outside block or function and can access from anywhere
    // const num = 90
    // function test(){
    //     num = 80
    // } 