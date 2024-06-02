// ** JavaScript Objects ** //

    // objects are variables too. But objects can contain many values
    const car = {
        type: 'Honda',
        model: 'Civic',
        year: 2005,
        color: 'White'
    }

    const person = {
        firstName: 'John',
        lastName: 'Doe',
        id: 3305,
        fullName: function () {
            return this.firstName + ' ' + this.lastName
        }
    } 

    // Objects are containers for Properties and Methods
    // Properties are named values
    // Methods are functions stored as Properties
    // Properties can be primitive values, functions or even other objects

    // In JS almost everything is an object
    // All JS values, except primitives, are objects

    // Primitive value is a value that has no properties or methods
    // 3.14 is primitive value
    // Primitive data type is data that has a primitive value
    // JS define 7 primitive data types
        // string, number, boolean, null, undefined, symbol, bigint
    // Primitive values are immutable(cannot be changed)
    // If x = 3.14, you can change the value of x, but you can't change value of 3.14

    // JS objects are mutable
    // They are addressed by reference, not by value