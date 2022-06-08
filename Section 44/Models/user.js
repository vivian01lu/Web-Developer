

//2.define my schema for a user
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            country: String
        }]
})

//need two tables:user and address,each address belong to one user
const User = mongoose.model('User', userSchema);
const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}
makeUser();