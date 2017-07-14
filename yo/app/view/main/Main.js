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

    bind: {
        store: '{users}'
    },
    inline: {wrap: false},
    cls: 'cs-absolute-pos',
    scrollable: false,


    itemTpl: '<div>{name} is {age} years old</div>' +
    '<img style="width:{width}px" src="{url}">',

    privates: {
        createDataItem: function (index, record) {
            var me = this,
                store = me.store,
                data = me.gatherData(record, index),
                markDirty = me.getMarkDirty(),
                dom, itemEl;

            itemEl = Ext.Element.create(me.getItemElementConfig(index, data, store));
            dom = itemEl.dom;

            if (markDirty) {
                itemEl.addCls(me.markDirtyCls);
            }

            dom.setAttribute('data-viewid', me.id);
            dom.setAttribute('data-recordid', record.internalId);
            dom.setAttribute('data-recordindex', index);

            //add absolute positioning to items
            dom.style.top = record.data.y + 'px';
            dom.style.left = record.data.x + 'px';
            return itemEl;
        }
    }

});
