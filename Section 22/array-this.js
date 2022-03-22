const person = {
    firstName: 'Viggo',
    lastName: 'Mortensen',
    //这里fullname只能用regular function,不要用array function to define a method
    fullName: function () {
        return `${this.firstName} ${this.lastName}`
    },
    //short
    shoutName: function () {
        // 但是这里是window对象所以要用array function
        setTimeout(() => {
            console.log(this.fullName())
        }, 3000)

    }
}