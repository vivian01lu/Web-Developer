//we return a function that accepts a function and then it executes that function
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}