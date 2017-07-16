/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */

Ext.define('Yo.view.main.Main', {
    extend: 'Ext.dataview.Component',

    requires: 'Ext.panel.Resizer',

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    bind: {
        store: '{users}'
    },

    inline: {wrap: false},
    cls: 'cs-positioned-dataview',
    scrollable: false,

    itemConfig: {
        xtype: 'component',
        cls: 'cs-whiteboard-item',
        draggable: true,
        tpl: '<div>{name} is {age} years old</div>' +
        '<img style="width:{width}px" src="{url}">'
    },

    itemDataMap: {
        '#': {
            x: 'x',
            y: 'y'
        }
    },

    listeners: {
        select: 'onItemSelect',
        deselect: 'onItemDeselect'
    }
});
