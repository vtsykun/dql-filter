define(function(require) {
    'use strict';

    var DqlConditionView;
    var $ = require('jquery');
    var _ = require('underscore');
    var DqlFilter = require('oro/filter/dql-filter');
    var DqlView = require('okvpndqlfilter/js/views/dql-view');
    var AbstractConditionView = require('oroquerydesigner/js/app/views/abstract-condition-view');
    var conditionTemplate = require('tpl!okvpndqlfilter/templates/dql-condition.html');

    DqlConditionView = AbstractConditionView.extend({
        template: conditionTemplate,
        inner: null,
        isClear: false,

        initChoiceInputView: function() {
            this.inner = this.$el.find('textarea');
            this.inner.on('click', _.bind(function(e) {
                if (false === this.isClear) {
                    this.isClear = true;
                    this._clearJsValidation();
                }
                e.stopPropagation();
            }, this));

            this.inner.on('focusout', _.bind(function() {
                this._onUpdate();
            }, this));

            var textArea = new DqlView(_.extend({
                el: this.$choiceInput,
                entity: this.options.rootEntity
            }, this.options.segmentChoice));

            return $.when(textArea);
        },

        _renderFilter: function(fieldId) {
            var filterOptions = {};
            var filter = new (DqlFilter.extend(filterOptions))();

            this._appendFilter(filter);
        },

        _collectValue: function() {
            var val;
            val = {
                columnName: 'id',
                criteria: 'condition-dql',
                criterion: {
                    filter: 'dql',
                    data: {
                        value: this.inner.val(),
                        type: null
                    }
                }
            };

            return val;
        },

        _setChoiceInputValue: function() {
            var value;
            value = this.getValue();
            if (typeof value.criterion !== 'undefined') {
                this.inner.val(value.criterion.data.value);
            }
        },

        /**
         * @private
         */
        _clearJsValidation: function () {
            var el = this.$el.parent()[0];
            var input = el.getElementsByClassName('select2-focusser')[0];
            $(input).data('validation', []);
        }
    });

    return DqlConditionView;
});
