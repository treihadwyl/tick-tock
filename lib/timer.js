/**
 * Wrapper for requestAnimationFrame
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var bindAll = require( 'lodash-node/modern/functions/bindAll' ),
    bind = require( 'lodash-node/modern/functions/bind' ),
    AnimationFrame = require( 'animation-frame' ),
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

    /**
     * The currently running animation frame
     * @type {Object}
     */
    frame: null,

    /**
     * Timestamp for last frame call
     * @type {DOMHighResTimeStamp}
     */
    last: 0,


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
        bindAll( this );

        this.id = args.id;
        this.af = new AnimationFrame( args.opts );
        this.fn = args.cb;

        return this;
    },


    /**
     * Update function that wraps the passed-in fn and calls it with an elapsed time timestamp.
     * @param now {DOMHighResTimeStamp}
     */
    update: function( now ) {
        this.fn( now - this.last );
        this.last = now;

        this.frame = this.af.request( this.update );
    },


    /**
     * Starts the timer running
     * @returns {Boolean} operation success
     */
    start: function() {
        if ( this.frame ) {
            console.log( 'Attempting to start a timer that is already running' );
            return false;
        }

        this.update( 0 );

        return this;
    },


    /**
     * Stops the timer running
     * @returns {Boolean} operation success
     */
    stop: function() {
        if ( !this.frame ) {
            console.log( 'Attempting to stop a timer that is already stopped' );
            return false;
        }

        this.af.cancel( this.frame );
        this.frame = null;
        return this;
    }
});
