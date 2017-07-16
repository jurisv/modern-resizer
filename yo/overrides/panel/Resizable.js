// Reuse Panel resizable implementation on Component
Ext.define(null, {
    override: 'Ext.Component',

    config: {
        /**
         * @cfg {Object} [resizable]
         * A configuration for a {@link Ext.panel.Resizer Resizer}.
         *
         * @since 6.5.0
         */
        resizable: null
    },

    hasResizable: true,

    defaultResizerCls: 'Ext.panel.Resizer',

    applyResizable: function (resizable) {
        if (resizable) {
            if (resizable === true) {
                resizable = {};
            }
            resizable = Ext.create(Ext.apply({
                xclass: this.defaultResizerCls,
                target: this,
                ui: this.getUi()
            }, resizable));
        }
        return resizable;
    },

    updateResizable: function (resizable, oldResizable) {
        if (oldResizable) {
            oldResizable.destroy();
        }
    },

    doDestroy: function () {
        this.setResizable(null);
        this.callParent();
    },

    privates: {
        onResizableUiChange: function (ui, oldUi) {
            var resizable = this.getResizable();
            if (resizable) {
                resizable.setUi(ui);
            }
        }
    }
});
