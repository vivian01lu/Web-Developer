const login = async (username, password) => {
    if (!username || !password) throw 'Missing Credentials'
    if (password === 'corgifeetarecuter') return 'Welcome!'
    throw 'Invalid Password'
}

//在下面只传入了一个参数，但是上面的logging方法是有两个参数的:
login('ajkjlg')
    .then(msg => {
        console.log("logged in!")
        console.log(msg);
    })
    .catch(err => {
        console.log("error");
        console.log(err);
    })