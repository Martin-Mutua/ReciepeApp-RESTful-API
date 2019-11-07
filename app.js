//UAjpzbyiDIG9ruMs

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const Recipe = require('./models/recipe');

const app = express();

app.use(bodyparser.json());

mongoose.connect('mongodb+srv://recipesApi:UAjpzbyiDIG9ruMs@cluster0-wfjg2.gcp.mongodb.net/test?retryWrites=true&w=majority+srv://will:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

//to handle CORS errors.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/recipe', (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    });

    recipe.save().then(
        () => {
            res.status(201).json({
                message: 'Recipe posted successful'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
});

app.put('/api/recipe/:id', (req, res, next) => {
    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    });

    Recipe.updateOne({_id: req.params.id}, recipe).then(
        () => {
            res.status(200).json({
                message: 'Recipe updated successful'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
});

app.delete('/api/recipe/:id', (req, res, next) => {
    Recipe.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Recipe deleted successful'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    )
});

app.use('/api/recipe/:id', (req, res, next) => {
    Recipe.findOne({ _id: req.params.id}).then(
        (recipe) => {
            res.status(200).json(recipe);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.use('/api/recipes', (req, res, next) => {
    Recipe.find().then(
        (recipes) => {
            res.status(200).json(recipes);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});



module.exports = app;