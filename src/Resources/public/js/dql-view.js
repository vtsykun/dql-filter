define(function(require) {
    'use strict';

    var DqlView;
    var BaseView = require('oroui/js/app/views/base/view');

    DqlView = BaseView.extend({
        events: {
            'change': 'onChange',
        },

        onChange: function(e) {
        }
    });

    return DqlView;
});
