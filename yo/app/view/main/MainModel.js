/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Yo.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Yo'
    },

    stores: {
        users: {
            autoLoad: true,

            fields: ['name', 'age', 'url', 'x', 'y', 'width'],
            data: [
                {name: 'Bob', age: 34, url: 'resources/images/bob.jpg', x: 0, y: 0, width: 280},
                {name: 'Larry', age: 45, url: 'resources/images/larry.jpg', x: 300, y: 0, width: 280},
                {name: 'Ketty', age: 18, url: 'resources/images/ketty.jpg', x: 0, y: 300, width: 280},
                {name: 'Baiba', age: 32, url: 'resources/images/baiba.jpg', x: 300, y: 300, width: 280}
            ]
        }
    }
});
