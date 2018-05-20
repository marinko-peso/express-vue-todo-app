'use strict';

const express = require('express');
const Todo = require('./Todo');

const todoRoutes = express.Router();


// Fetch all.
// next - call the next middleware function in the stack.
todoRoutes.route('/all').get(function (request, response, next) {
	Todo.find(function (error, items) {
		if (error)
			return next(new Error(error));
		response.status(200).json(items);
	});
});

// Create item.
todoRoutes.route('/add').post(function (request, response) {
  Todo.create(
    {
      name: request.body.name,
      done: false
    },
    function (error, item) {
      if (error)
        response.status(400).send('Unable to create todo item');
      response.status(200).json(item);
    }
  );
});

// Delete item.
todoRoutes.route('/delete/:id').delete(function (request, response, next) {
  const id = request.params.id;
  Todo.findByIdAndRemove(id, function (error) {
    if (error)
      return next(new Error('Item was not found'));
    response.status(200).json('Successfully removed');
  });
});

// Update item.
todoRoutes.route('/update/:id').put(function (request, response, next) {
  const id = request.params.id;
  Todo.findById(id, function (error, item) {
    if (error)
      return next(new Error('Item was not found'));

    item.name = request.body.name;
    item.done = request.body.done;
    item.save()
      .then(function (item) {
        response.status(200).json(item);
      })
      .catch(function (error) {
        response.status(400).send('Error occurred: ' + error);
      });
  });
});

module.exports = todoRoutes;
