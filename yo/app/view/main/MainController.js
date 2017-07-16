/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Yo.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onItemSelect: function (view, record) {
        if (!record) {
            return;
        }

        var item = view.mapToItem(record);
        item.setResizable({
            edges: 'ne se sw nw',
            dynamic: true
        });
    },

    onItemDeselect: function (view, record) {
        if (!record) {
            return;
        }

        var item = view.mapToItem(record[0]);

        item.setResizable(false);
    }
});
