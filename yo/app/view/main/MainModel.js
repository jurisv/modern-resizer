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
            fields: ['name', 'age'],
            data: [
                {name: 'Bob', age: 34, url: 'images/bob.jpg', x: 0, y: 0},
                {name: 'Larry', age:45, url: 'images/ray.jpg', x: 300, y: 0},
                {name: 'Ketty', age: 18, url: 'images/ketty.jpg', x: 0, y: 300},
                {name: 'Baiba', age: 32, url: 'images/baiba.jpg', x: 300, y: 300}
            ]
        }
    }
});
