const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');

/**
 * then how to use these routes:
 */

app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes)
app.use('/admin', adminRoutes)

app.listen(3000, () => {
    console.log("serving app on localhost")
})