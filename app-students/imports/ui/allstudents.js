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
        'submit .new-stuff'(event, template) {
            // Prevent default browser form submit
            event.preventDefault();



            // Get value from the elements
            const name =  template.find("#name").value;
            const firstname = template.find("#firstname").value;
            const promo = template.find("#promo").value;
            const abilities = template.find("#abilities").value;


            // Select all the inputs
            var inputs =  template.findAll(".text");

            // Insert a student into the collection
            if (Students.name === ""){
                console.log("Erreur")
            }else {
                Students.insert({
                    name,
                    firstname,
                    promo,
                    abilities
                });

            }

            //Get All inputs, to reset then on submit
            for (let i = 0 ; inputs.length > i ; i++){
                inputs[i].value= "";
            }
        },

        // Button used to remove the element
        'click .remove'(event) {
            Students.remove(this._id);
        },

        'change .maj'(event) {
            console.log(  this ,this._id,  event );

            var o = {}; // Création d'un objet vide
            o[ event.target.id ] = event.currentTarget.value ; // On insère un attribut dinamique
            Students.update(this._id, { $set: o });
        }

    });

