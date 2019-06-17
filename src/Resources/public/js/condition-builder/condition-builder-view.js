define(function(require) {
    'use strict';

    var ConditionBuilderView;
    var BaseView = require('oroquerydesigner/js/app/views/condition-builder/condition-builder-view-inner');
    require('jquery-ui');

    ConditionBuilderView = BaseView.extend({
        defaults: {
            sortable: {
                // see jquery-ui sortable's options
                placeholder: 'sortable-placeholder',
                items: '>[data-criteria]'
            },
            conditionsGroup: {
                items: '>.condition[data-criteria]',
                cursorAt: '10 10',
                cancel: 'a, input, .btn, select, textarea'
            },
            criteriaList: {
                helper: 'clone',
                cancel: '.disabled'
            },
            operations: ['AND', 'OR'],
            criteriaListSelector: '.criteria-list',
            conditionContainerSelector: '.condition-container',
            helperClass: 'ui-grabbing',
            validation: {
                'condition-item': {
                    NotBlank: {message: 'oro.query_designer.condition_builder.condition_item.not_blank'}
                },
                'conditions-group': {
                    NotBlank: {message: 'oro.query_designer.condition_builder.conditions_group.not_blank'}
                }
            }
        },
    });

    return ConditionBuilderView;
});
