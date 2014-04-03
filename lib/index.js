/**
 * Wrapper for requestAnimationFrame
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var AnimationFrame = require( 'animation-frame' ),
    Proto = require( 'uberproto' );


/**
 * Timer
 * Represents a timer object
 */
var Timer = Proto.extend({

    /*------------------*
     *  Members
     *------------------*/

    /**
     * Is the timer currently active?
     * @type {Boolean}
     */
    running: false,


    /*------------------*
     *  Methods
     *------------------*/

    /**
     * Constructor
     * @constructs
     * @param id {String} id of timer
     * @param opts {Object} has of options for timer
     * @param cb {Function} function to call each animationFrame
     * @returns {this}
     */
    init: function( id, cb ) {

    },

    /**
     * Starts the timer running
     * @returns {Boolean} operation success
     */
    start: function() {

    },

    /**
     * Stops the timer running
     * @returns {Boolean} operation success
     */
    stop: function() {

    }
});




module.exports = (function() {

    var timers = [];



    return {

        /**
         * Registers a new timer with the system.
         * Does not start the timer automatically.
         * @param timer {String} _optional_ id of timer - will automatically assign one if omitted
         * @param cb {Function} the function to run each animationFrame
         * @returns {Timer} a timer object
         */
        register: function( id, cb ) {

        },

        /**
         * Removes a given timer, will stop it if necessary
         * @param id {String} id of timer
         * @returns {Boolean} operation success
         */
        remove: function( id ) {

        },

        /**
         * Starts a given timer
         * @param id {String} id of timer
         * @returns {Boolean} operation success
         */
        start: function( id ) {

        },

        /**
         * Stops a given timer from running
         * @param id {String} id of timer
         * @returns {Boolean} operation success
         */
        stop: function( id ) {

        },

        /**
         * Lists all timers in the console
         */
        list: function() {

        },

        /**
         * Returns a timer if it exists, false if not
         * @param id {String} id of timer to get
         * @returns {Timer||false}
         */
        get: function( id ) {

        }
    }

})();
