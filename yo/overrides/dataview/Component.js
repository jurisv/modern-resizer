// Override that allows absolute positioned items
Ext.define(null, {
    override: 'Ext.dataview.Component',

    privates: {
        createDataItem: function (cfg) {
            var me = this,
                markDirty = me.getMarkDirty(),
                cls = markDirty ? me.markDirtyCls : '',
                itemCls = me.getItemCls(),
                config;

            if (itemCls) {
                if (markDirty) {
                    cls += ' ';
                }

                cls += itemCls;
            }
            config = {
                xtype: me.getDefaultType(),
                cls: cls,
                x: 0, //added
                y: 0, //added
                tpl: me.getItemTpl(),
                $dataItem: 'record'
            };

            cls = me.getItemInnerCls();
            if (cls) {
                config.innerCls = cls;
            }

            cls = me.getItemContentCls();
            if (cls) {
                config.contentCls = cls;
            }

            return Ext.apply(config, cfg || me.getItemConfig());
        }
    }
});