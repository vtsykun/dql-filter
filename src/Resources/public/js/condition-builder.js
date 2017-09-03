define(['oroquerydesigner/js/condition-builder-inner', 'jquery'],
    function (BaseConditionBuilder, $) {
        $.widget('oroquerydesigner.conditionBuilder', $.oroquerydesigner.conditionBuilder, {
            options: {
                conditionsGroup: {
                    cancel: 'a, input, .btn, select, textarea'
                }
            }
        });

        return BaseConditionBuilder;
    }
);
