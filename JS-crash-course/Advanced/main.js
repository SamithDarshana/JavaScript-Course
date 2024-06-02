// Advance JavaScript Crash Course

// Nested function's scope
// Closures
// Currying
// this keyword
// Prototype
// Prototypal inheritance
// Class
// Iterables and iterators
// Generators

// Nested function's scope
    // let a = 10
    // function outer(){
    //     let b = 20
    //     function inner(){
    //         let c = 30
    //         console.log(a, b, c)
    //     }
    //     inner() 
    // }
    // outer()

// Closure
    // the combination of a fuction bundled together with references
        // to its surrounding state. Closure are created every time a 
            // function is created, at function creation time.
    // function outer(){
    //     let count = 0
    //     function inner(){
    //         count++
    //         console.log(count)
    //     }
    //     return inner
    // }
    // const fn = outer()
    // fn()
    // fn()

// Currying
    // a functional programming technique where a function with multiple 
    // arguments is transformed into a sequence of functions each taking a single 
    // argument. This is often useful in frontend development for creating reusable 
    // functions with preset parameters

    // ex:
    // function add(a){
    //     return function(b){
    //         return a + b
    //     }
    // }
    // const addFive = add(5)
    // console.log(addFive(10))
    // console.log(addFive(20))

    // ex:
    // function sum(a, b, c){
    //     console.log("a = " + a)
    //     console.log("b = "+ b)
    //     console.log("c = "+ c)
    //     return a+b+c
    // }

    // function curry(fn){
    //     return function(a){
    //         return function(b){
    //             return function(c){
    //                 return fn(a, b, c)
    //             }
    //         }
    //     }
    // }
    // const curriedSum = curry(sum) 
    // console.log(curriedSum(2)(3)(5))
    // const add1 = curriedSum(2)
    // const add2 = add1(3)
    // const add3 = add2(5)
    // console.log(add3)

    // ex: logger function
    // function createLogger(namespace){
    //     return function(level){
    //         return function(message){
    //             console.log(`[${namespace}] [${level}] ${message}`)
    //         }
    //     }
    // }
    // const appLogger = createLogger('App')
    // const infoLogger = appLogger('INFO')
    // const errorLogger = appLogger('ERROR')

    // infoLogger('Application started')

    // ex: form handling
    // function validateField(validator){
    //     return function(errorMessage){
    //         return function(value){
    //             if(validator(value))
    //                 return errorMessage
    //             return "Validated"
    //         }
    //     }
    // }
    // const isEmpty = validateField(value => value.trim() === '')
    // const validate = isEmpty('This is empty')
    // console.log(validate('Hi'))

    // ex: configuration functions
    // function createUrl(base){
    //     return function(endpoint){
    //         return function(params = {}){
    //             const queryString = Object.keys(params)
    //                 .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    //                 .join('&')
    //             return `${base}${endpoint}?${queryString}`
    //         }
    //     }
    // }
    // const api = createUrl('https://api.example.com')
    // const userEndPoint = api('/users')
    // const url = userEndPoint({id: 123, token: 'abc'})
    // console.log(url)

    // ex: creating higher order functions
    // const map = fn => arr => arr.map(fn)
    // const double = x => x * 2
    // const doubleArray = map(double)
    // console.log(doubleArray([1,3,4,5]))

    // Advantages of currying
    //  * function reusability and modularity(separately)
    //  * simplified function composition
    //  * creating higher order functions


// this keyword
    // used in function, refers to the objects it belongs to it makes 
    // functions reusable by letting you decide the object value this value is
    // determined entirely by how a function is called

    // // implicit binding
    // const person1 = {
    //     name: 'John',
    //     sayMyName: function() {
    //         console.log(`My name is ${this.name}`)
    //     }
    // }
    // person1.sayMyName()

    // // explicit binding
    // const person2 = {
    //     name: 'Mary'
    // }
    // function sayMyName2() {
    //     console.log(`My name is ${this.name}`)
    // }
    // sayMyName2.call(person2)

    // // new binding
    // function Person(name){
    //     this.name = name
    // }
    // const p1 = new Person('Batman')
    // console.log(p1.name)

    // // default binding
    // globalThis.name = 'Superman'
    // sayMyName2()

    // order of precedence 
    //     * new
    //     * explicit
    //     * implicit
    //     * default


// Prototype

    // function Person(fname, lname) {
    //     this.firstName = fname
    //     this.lastName = lname
    // }
    // const p1 = new Person('Bruce', 'Wayne')
    // const p2 = new Person('Joker', 'Rocks')

    // p1.getFullName = function () {
    //     console.log(`${this.firstName} ${this.lastName}`)
    // }
    // p1.getFullName()    // this is only for p1

    // Person.prototype.getFullName2 = function () {
    //     console.log(`${this.firstName} ${this.lastName} from method 2`)
    // }

    // p1.getFullName2()
    // p2.getFullName2()

    // // Inheritance
    // function SuperHero(fname, lname) {
    //     this.isSuperHero = true
    //     Person.call(this, fname, lname)
    // }
    // SuperHero.prototype.fightCrime = function () {
    //     console.log("Fighting crime")
    // }
    // SuperHero.prototype = Object.create(Person.prototype)   // superhero inherited from person
    // const batman = new SuperHero('Bruce1', 'Wayne1')
    // SuperHero.prototype.constructor = SuperHero
    // batman.getFullName2()


// Class
    // class Person {
    //     constructor(fname, lname){
    //         this.firstName = fname
    //         this.lastName = lname
    //     }
    //     sayMyName(){
    //         return this.firstName + ' ' + this.lastName
    //     }
    // }
    // const classP1 = new Person('Bruce', 'Wayne')
    // //console.log(classP1.sayMyName()) 

    // class SuperHero extends Person {    // superhero class inherited from person
    //     constructor(fname, lname){
    //         super(fname, lname)         // super method call person class constructor
    //         this.isSuperHero = true
    //     }
    //     fightCrime(){
    //         console.log("Fighting crime")
    //     }
    // }
    // const superHero1 = new SuperHero('batman', 'prime')
    // superHero1.fightCrime()
    // console.log(superHero1.sayMyName()) 

    // class Animal {
    //     constructor(name, color){
    //         this.name = name
    //         this.color = color
    //     }
    //     eat(){
    //         console.log(`I am ${this.name} and my color is ${this.color}`)
    //         console.log(`${this.name} is eating`)
    //     }
    //     walk(){
    //         console.log(`I am ${this.name} and walking`)
    //     }
    // }
    // class Dog extends Animal {
    //     constructor(name, color){
    //         super(name, color)
    //     }
    //     bark(){
    //         console.log(`I am ${this.name} and barking`)
    //     }
    // }
    // const dog = new Dog('Dog', 'black')
    // dog.eat()
    // dog.walk()
    // dog.bark()

// Iterables and Iterators
    // an object which implements the iterable protocol is called an iterable
    // for an object to be an iterable it must implement a method at the key [Symbol.iterator]

    // // create custom iterator
    // const obj = {
    //     [Symbol.iterator]: function () {
    //         let step = 0
    //         const iterator = {
    //             next: function () {
    //                 step++
    //                 if(step === 1){
    //                     return {value: 'Hello', done: false}
    //                 } else if (step === 2) {
    //                     return {value: 'World', done: false}
    //                 }
    //                 return {value: undefined, done: true}
    //             }
    //         }
    //         return iterator
    //     }
    // }
    // for (const word  of obj) {
    //     console.log(word)
    // }

    // // String, array, map and set are default iterators
    // const str = 'Hello World'
    // for (const i of str) {
    //     console.log(i)
    // }

// Generator
    // to create iterators
    function* generatorFunction () {
        yield 'Hello'
        yield 'World'
    }
    const generatorObject = generatorFunction() // generatorObject is an iterator
    for (const word of generatorObject) {
        console.log(word)
    }