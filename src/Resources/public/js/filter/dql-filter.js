define([
    'jquery',
    'underscore',
    'orotranslation/js/translator',
    'oro/filter/abstract-filter'
], function($, _, __, AbstractFilter) {
    'use strict';

    var DQLFilter;

    /**
     * DQL filter
     *
     * @extends oro.filter.AbstractFilter
     */
    DQLFilter = AbstractFilter.extend({
        /**
         * Filter selector template
         *
         * @property
         */
        templateSelector: '#dql-filter-template',

        /**
         * Selector for filter area
         *
         * @property
         */
        containerSelector: '.filter-dql',

        /**
         * Selector for close button
         *
         * @property
         */
        disableSelector: '.disable-filter',

        /**
         * Selector for select input element
         *
         * @property
         */
        inputSelector: 'textarea',

        /**
         * Filter events
         *
         * @property
         */
        events: {
        },

        /**
         * Filter choices
         */
        choices: {
        },

        /**
         * Initialize.
         *
         * @param {Object} options
         */
        initialize: function(options) {
            _.extend(this, options);

            // init empty value object if it was not initialized so far
            if (_.isUndefined(this.emptyValue)) {
                this.emptyValue = {
                    value: ''
                };
            }

            AbstractFilter.prototype.initialize.apply(this, arguments);
        },

        /**
         * Render filter template
         *
         * @return {*}
         */
        render: function($segmentChoice) {
            $segmentChoice.val(this.value.value);
            return this;
        },


        /**
         * @inheritDoc
         */
        _writeDOMValue: function(value) {
            this._setInputValue(this.inputSelector, value.value);
            return this;
        }
    });

    return DQLFilter;
});
