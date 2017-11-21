import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './alltasks.html';

Template.alltasks.helpers({
    tasks() {
        return Tasks.find({});
    },
});

Template.alltasks.events
(
    {
        'submit .new-task'(event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            const target = event.target;
            const name = target.text.value;

            // Insert a task into the collection
            Tasks.insert({
                name,
                createdAt: new Date(), // current time
            });

            // Clear form
            target.text.value = '';
        },
        'click button'(event) {
            Tasks.remove(this._id);
        },

        'change .maj'(event) {

            Tasks.update(this._id, { $set: { name: event.target.value } });
        }
    });
