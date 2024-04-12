const express = require("express");
const router = express.Router();

router.get('/', async function (req, res) {
    res.redirect('http://127.0.0.1:5500/index.html');
    // try {
    //     const db = req.app.locals.db;
    //     let petsData;

    //     // Check if user is logged in
    //     if (req.session.loggedIn) {
    //         const user = await db.collection('userInfo').findOne({ username: req.session.username });
    //         if (user) {
    //             petsData = await db.collection('petsinfo').find({ $and:[{_id: { $nin: user.petAdded }},{adopted:false}]}).toArray();
    //             petsData = await db.collection('petsinfo').find({ adopted: false }).toArray();
    //         } else {
    //             petsData = await db.collection('petsinfo').find({ adopted: false }).toArray();
    //         }
    //     } else {
    //         // If user is not logged in, show all available pets
    //         petsData = await db.collection('petsinfo').find({ adopted: false }).toArray();
    //     }

    //     res.render('home.hbs', {
    //         title: 'Home',
    //         pets: petsData,
    //         style: '/home.css',
    //         loggedin: req.session.loggedIn,
    //         user: req.session.username
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal Server Error');
    // }
});

module.exports = router;
