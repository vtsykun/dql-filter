var tmp;
define(['jquery', 'underscore', './filter/dql-filter', 'jquery-ui'],
function($, _, DQLFilter) {
    'use strict';

    /**
     * Apply dql widget
     */
    $.widget('okvpndqlfilter.dqlCondition', {
        options: {
            segmentChoice: {},
            segmentChoiceClass: 'select',
            filters: [],
            filterContainerClass: 'active-filter'
        },

        isClear: false,

        _create: function() {
            var data = this.element.data('value');
            var label = $('<label>', {text: 'DQL'});
            this.$segmentChoice = $('<textarea>').addClass('dql-filter');
            this.element.append(label, this.$segmentChoice);
            this._renderFilter(data);

            this.$segmentChoice.on('click', _.bind(function(e) {
                if (false === this.isClear) {
                    this.isClear = true;
                    this._clearJsValidation();
                }
                e.stopPropagation();
            }, this));

            this.$segmentChoice.on('focusout', _.bind(function(e) {
                this._onUpdate();
            }, this));
        },

        _getCreateOptions: function() {
            return $.extend(true, {}, this.options);
        },

        _renderFilter: function(data) {
            var options = [];
            this._createFilter(options);
        },

        /**
         * Creates filter instance
         *
         * @param options {Object}
         * @private
         */
        _createFilter: function(options) {
            var filter = new (DQLFilter.extend(options))();
            this._appendFilter(filter);
        },

        _appendFilter: function(filter) {
            var value = this.element.data('value');
            this.filter = filter;

            if (value && value.criterion) {
                this.filter.value = value.criterion.data;
            }

            this.filter.render(this.$segmentChoice);
            this.filter.on('update', _.bind(this._onUpdate, this));
            this._onUpdate();
        },

        _onUpdate: function() {
            var value;
            value = {
                columnName: 'id',
                criteria: 'condition-dql',
                criterion: {
                    filter: 'dql',
                    data: {
                        value: this.$segmentChoice.val(),
                        type: null
                    }
                }
            };

            this.filter.value = value.criterion.data;
            this.element.data('value', value);
            this.element.trigger('changed');
        },

        /**
         * @private
         */
        _clearJsValidation: function () {
            var el = this.element.parent()[0];
            var input = el.getElementsByClassName('select2-focusser')[0];
            $(input).data('validation', []);
        }
    });

    return $;
});
