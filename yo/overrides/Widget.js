//Allow absolute positioning on non floated Widgets
Ext.define(null, {
    override: 'Ext.Widget',

    privates: {
        updateX: function () {
            if (!this.$updatingXY) {
                this.syncXYPosition();
            }
        },

        updateY: function () {
            if (!this.$updatingXY) {
                this.syncXYPosition();
            }
        }
    }
});