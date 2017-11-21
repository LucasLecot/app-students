import { Template } from 'meteor/templating';

import { Students } from '../api/students.js';

import './allstudents.html';

Template.allstudents.helpers({
    students() {
        return Students.find({});
    },
});

Template.allstudents.events
(
    {
        'submit .new-student'(event) {
            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            const target = event.target;
            const name = target.text.value;

            // Insert a student into the collection
            Students.insert({
                name,
                createdAt: new Date(), // current time
            });

            // Clear form
            target.text.value = '';
        },
        'click button'(event) {
            Students.remove(this._id);
        },

        'change .maj'(event) {

            Students.update(this._id, { $set: { name: event.target.value } });
        }
    });
