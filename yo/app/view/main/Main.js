/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('Yo.view.main.Main', {
    extend: 'Ext.dataview.DataView',
    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    bind: 'users',

    itemTpl: '<div>{name} is {age} years old' +
    '<img style="left:{x;top:{y}}" src="{url}">' +
    '</div>'
});
