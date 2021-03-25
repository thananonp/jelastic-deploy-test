const catRoute = require('express').Router();
const cat = require('../models/catModel');

// catRoute.get('/male', async (req, res) => {
//     // res.send(await cat.find());
//     res.send(await cat.find().where('gender').equals('male'))
// })
//
// catRoute.get('/female', async (req, res) => {
//     // res.send(await cat.find());
//     res.send(await cat.find().where('gender').equals('female'))
// })

catRoute.route('/')
    .post(async (req, res) => {
        const post = await cat.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            color: req.body.color,
            weight: req.body.weight
        });
        res.send(`cat post ${post.naame} created with id: ${post._id}`);
    }).get(async (req, res) => {
    console.log('gender', req.query.gender)
    console.log('age', req.query.age)
    console.log('weight', req.query.weight)
    const age = req.query.age ? req.query.age : 0
    const gender = req.query.gender ? req.query.gender : null
    const weight = req.query.weight ? req.query.weight : 0
    let filter = {}
    if (req.query.gender === undefined) {
        filter = {age: {$gte: age}, weight: {$gte: weight}}
    } else {
        filter = {age: {$gte: age}, gender: gender, weight: {$gte: weight}}
    }
    res.send(await cat.find(filter).exec())
    // res.send("ok")
})
// .get(async (req, res) => {
//     // res.send(await cat.find());
//     res.send(await cat.find());
// })


catRoute.route('/:id')
    .get(async (req, res) => {
        res.send(await cat.findById(req.params.id));
    })
    .patch(async (req, res) => {
        const mod = await cat.updateOne({_id: req.params.id}, {title: req.body.title});
        res.status(200).send(`updated sucessfully ${mod.nModified} blog post`);
    })
    .delete(async (req, res) => {
        const del = await cat.deleteOne({_id: req.params.id});
        res.send(`deleted ${del.deletedCount} blog post`);
    });


module.exports = catRoute;
