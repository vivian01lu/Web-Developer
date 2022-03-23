class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating`
    }
}
class Cat extends Pet {
    constructor(name, age, liveLeft = 9) {
        // this.name = name;
        // this.age = age;
        super(name, age)
        this.liveLeft = liveLeft
    }
    meow() {
        return `Meowwwww!`
    }
}

class Dogs extends Pet {

    bark() {
        return `woof!!!`
    }
    eat() {

    }//if it doesn't fint it on dog on the dog prototype it will look up on the pet prototype

}
