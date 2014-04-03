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
module.exports = Proto.extend({

    /*------------------*
     *  Members
     *------------------*/

    /**
     * Is the timer currently active?
     * @type {Boolean}
     */
    running: false,

    /**
     * The id of the timer
     * @type {String}
     */
    id: '',

    /**
     * The animationFrame object associated with this timer
     * @type {AnimationFrame}
     */
    af: null,

    /**
     * The function to run each tick for this timer
     * @type {Function}
     */
    fn: null,


    /*------------------*
     *  Methods
     *------------------*/

    /**
     * Constructor
     * @constructs
     * @param id {String} id of timer
     * @param opts {Object} hash of options for timer
     * @param cb {Function} function to call each animationFrame
     * @returns {this}
     */
    init: function( args ) {
        this.id = args.id;
        this.af = new AnimationFrame( args.opts );
        this.fn = args.cb;

        return this;
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
