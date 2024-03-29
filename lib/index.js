/**
 * Wrapper for requestAnimationFrame
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var Timer = require( './timer' ),

    _ = require( 'lodash-node' ),
    AnimationFrame = require( 'animation-frame' );


module.exports = (function() {

    var timers = [],
        numTimers = 0,
        idPrepend = 'timer_',

        // See [animation frame options](https://github.com/kof/animation-frame)
        defaultOpts = {
            useNative: true,
            frameRate: AnimationFrame.FRAME_RATE
        }

    /**
     * Allows different function arities for calling register
     */
    function makeArgs( args ) {

        if ( args === null ) {
            throw new Error( 'Registering a new timer expects a callback' );
            return false;
        }

        if ( _.isArguments( args ) ) {
            return makeArgs( Array.prototype.slice.call( args ) );
        };

        if ( _.isFunction( args[ 0 ] ) ) {
            args.unshift( defaultOpts );
            return makeArgs( args );
        }

        if ( _.isObject( args[ 0 ] ) ) {
            args.unshift( idPrepend + numTimers )
            return makeArgs( args );
        }

        if ( _.isString( args[ 0 ] ) && _.isFunction( args[ 1 ] ) ) {
            args.splice( 1, 0, defaultOpts );
        }

        if ( args.length !== 3 ) {
            throw new Error( 'Incorrect arguments used to register new timer' );
            return;
        }

        numTimers = numTimers + 1;

        return {
            id: args[ 0 ],
            opts: args[ 1 ],
            cb: args[ 2 ]
        }
    }


    // API
    return {

        /**
         * Registers a new timer with the system.
         * Does not start the timer automatically.
         * @param timer {String} _optional_ id of timer - will automatically assign one if omitted
         * @param opts {Object} _optional_ hash of options for timer
         * @param cb {Function} the function to run each animationFrame
         * @returns {Timer} a timer object
         */
        register: function( id, opts, cb ) {
            var timer = Timer.create( makeArgs( arguments ) );
            timers.push( timer );
            return timer;
        },


        /**
         * Removes a given timer, will stop it if necessary
         * @param id {String || Object} id of timer or a timer instance
         * @returns {Boolean} operation success
         */
        remove: function( id ) {
            var timer = _.find( timers, { id: id } );

            if ( !timer ) {
                console.log( 'Attempting to remove a timer that does not exist.  id:', id );
                return false;
            }

            if ( timer.isRunning() ) {
                timer.stop();
            }
            _.remove( timers, timer );

            return true;
        },


        /**
         * Starts a given timer
         * @param id {String || Object} id of timer or a timer instance
         * @returns {Boolean} operation success
         */
        start: function( id ) {
            this.get( id ).start();
        },


        /**
         * Stops a given timer from running
         * @param id {String || Object} id of timer or a timer instance
         * @returns {Boolean} operation success
         */
        stop: function( id ) {
            this.get( id ).stop();
        },


        /**
         * Returns a timer if it exists, false if not
         * @param id {String} id of timer to get
         * @returns {Timer||false}
         */
        get: function( id ) {
            return _.find( timers, { id: id } );
        },


        /**
         * Lists all timers in the console
         */
        list: function() {
            _.each( timers, function( timer ) {
                console.log( timer.id );
                console.log( '  Running:', timer.isRunning() );
            });
        }
    }

})();
