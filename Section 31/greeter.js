const args = process.argv.slice(2);

//we don't want index of 0 or 1
for (let arg of args) {
    console.log(`hi there,${arg}`)
}