/**
 * Base class for date type validators.
 *
 * @abstract
 */
Ext.define('Ext.data.validator.AbstractDate', {
    extend: 'Ext.data.validator.Validator',

    config: {
        /**
         * @cfg {String} message
         * The error message to return when not valid.
         * @locale
         */
        message: null,

        /**
         * @cfg {String/String[]} format
         * The format(s) to allow. See {@link Ext.Date}.
         * @locale
         */
        format: ''
    },

    applyFormat: function(format) {
        if (!format) {
            format = this.getDefaultFormat();
        }
        
        if (!Ext.isArray(format)) {
            format = [format];
        }

        return format;
    },

    parse: function(value) {
        var me = this,
            format = me.getFormat(),
            len = format.length,
            i, dateValue;

        for (i = 0; i < len; ++i) {
            dateValue = Ext.Date.parse(value, format[i], true);
            if (dateValue) {
                return dateValue;
            }
        }
    },

    validate: function(value) {
        return this.parse(value) ? true : this.getMessage();
    },

    privates: {
        getDefaultFormat: Ext.privateFn
    }
});
