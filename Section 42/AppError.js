//a tool that allows us to throw an app error
class ApppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

//exports
module.exports = ApppError;