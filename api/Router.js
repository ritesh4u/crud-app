var router = require('express').Router();
var TodoSchema = require('./ToDoDetails');
var mongoose = require('mongoose');

router.get('/todo', (req, res) => {
    TodoSchema.find((err, result) => {
        if (err) {
            console.log(err);
            res.send({
                success: false,
                message: err.message,
                todos: []
            });
        } else {
            res.send({
                success: true,
                todos: result,
                mesage: "todo list"
            });
        }
    });
});
router.post('/todo', (req, res) => {
    if (!req.body.title || !req.body.details) {
        res.send({ sucess: false, message: 'title and details required' });
        return;
    }
    var todo = new TodoSchema();
    todo.title = req.body.title;
    todo.details = req.body.details;
    todo.save((err, data) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.delete('/todo', (req, res) => {
    let id = req.query.id;
    if (!id) {
        res.send({ success: false, message: 'todo id reuired' });
        return;
    }
    TodoSchema.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec().then(result => {
        if (result.deletedCount) {
            res.send({ success: true, message: 'Todo deleted Successfully' });
        } else {
            res.send({ success: false, message: 'Todo not present.' });
        }
    }).catch(e => {
        res.send({ success: false, message: e.message });
    });
});
router.put('/todo', (req, res) => {
    if (!req.body._id || !req.body.title || !req.body.details) {
        res.send({ sucess: false, message: '_id, title, details required' });
        return;
    }
    TodoSchema.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {
        $set: {
            title: req.body.title,
            details: req.body.details
        }
    }, { new: true, useFindAndModify: false }, (error, result) => {
        res.send(result);
    });
});

module.exports = router;