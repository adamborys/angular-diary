import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Entry from './models/entry';
import User from './models/user';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/diary', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('Database connection estabilished'));

router.route('/entries').get((req, res) => {
    Entry.find((err,entries) => {
        if(err)
            console.log(err);
        else
            res.json(entries);
    });
});

router.route('/entries/:id').get((req, res) => {
    Entry.findById(req.params.id, (err,entry) => {
        if(err)
            console.log(err);
        else
            res.json(entry);
    });
});

router.route('/entries/add').post((req, res) => {
    let entry = new Entry(req.body);
    entry.save()
        .then(entry =>
            res.status(200).json({'entry': 'Added successfully'}))
        .catch(err =>
            res.status(400).send('Adding new entry failed'));
});

router.route('/entries/edit/:id').post((req, res) => {
    Entry.findById(req.params.id, (err, entry) => {
        if(!entry)
            return next(new Error('Unable to load document'));
        else {
            entry.date = req.body.date;
            entry.activity = req.body.activity;
            entry.mood = req.body.mood;
            entry.remark = req.body.remark;

            entry.save()
            .then(entry =>
                res.json('Changes have been saved'))
            .catch(err =>
                res.status(400).send('Saving changes failed'));
        }
    });
});

router.route('/entries/remove/:id').get((req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, entry) => {
        if(err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

router.route('/users/find/:email').get((req, res) => {
    User.findOne({email: req.params.email}).
    then((result => {
       if (result !== null) {
            res.status(202).send();
       } else {
            res.status(200).send();
       }
    })).
    catch(err => {
        console.log(err);
    });
});

router.route('/users/register').post((req, res) => {
    const user = new User();

    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save((err, user) => {
        if (err) {
            res.status(500);
            console.log(err);
        } else {
            res.status(201);
            res.json({
                "token": user.generateToken()
            });
        }
    });
});

router.route('/users/login').post((req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            res.status(500);
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send('E-mail not found');
            } else if (!user.validatePassword(userData.password)) {
                res.status(401).send('Invalid password');
            } else {
                res.status(200);
                res.json({
                    "token": user.generateToken()
                });                
            }
        }
    });
});

app.use('/', router);

app.listen(4000, () => console.log("Express server running on 4000"));
