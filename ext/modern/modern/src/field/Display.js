/**
 * A display-only text field which is not validated and not submitted. This is useful for when you want to display a
 * value from a form's loaded data but do not want to allow the user to edit or submit that * value. The value can
 * be optionally {@link #htmlEncode HTML encoded} if it contains HTML markup that you do not want * to be rendered.
 *
 * If you have more complex content, or need to include components within the displayed content, also consider using a
 * {@link Ext.field.Container} instead.
 *
 * Example:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 175,
 *         height: 150,
 *         bodyPadding: 10,
 *         title: 'Final Score',
 *         items: [{
 *             xtype: 'displayfield',
 *             fieldLabel: 'Home',
 *             name: 'home_score',
 *             value: '10'
 *         }, {
 *             xtype: 'displayfield',
 *             fieldLabel: 'Visitor',
 *             name: 'visitor_score',
 *             value: '11'
 *         }],
 *         buttons: [{
 *             text: 'Update'
 *         }]
 *     });
 */
Ext.define('Ext.field.Display', {
    extend: 'Ext.field.Field',
    xtype: 'displayfield',
    alternateClassName: 'Ext.form.Display',

    submitValue: false,
    validateOnChange: false,

    /**
     * @cfg {Boolean} focusable
     * @private
     */
    focusable: false,

    /**
     * @cfg {Boolean} readOnly
     * @private
     */
    readOnly: true,

    config: {
        /**
         * @cfg {Boolean} htmlEncode
         * True to escape HTML in text when rendering it.
         */
        htmlEncode: false,

        /**
         * @cfg {Function/String} renderer
         * A function to transform the raw value for display in the field.
         *
         *     Ext.create('Ext.form.Panel', {
         *         renderTo: document.body,
         *         width: 175,
         *         bodyPadding: 10,
         *         title: 'Final Score',
         *         items: [{
         *             xtype: 'displayfield',
         *             fieldLabel: 'Grade',
         *             name: 'final_grade',
         *             value: 68,
         *             renderer: function (value, field) {
         *                 var color = (value < 70) ? 'red' : 'black';
         *                 return '<span style="color:' + color + ';">' + value + '</span>';
         *             }
         *         }]
         *     });
         *
         * @param {Object} value The raw field {@link #value}
         * @param {Ext.form.field.Display} field The display field
         * @return {String} displayValue The HTML string to be rendered
         * @controllable
         */
        renderer: function(value, field)  {
            return value;
        }
    },

    classCls: Ext.baseCSSPrefix + 'displayfield',

    /**
     * @cfg {Object} scope
     * The scope to execute the {@link #renderer} function. Defaults to this.
     */

    initialize: function() {
        this.callParent();
        this.doUpdateDom();
    },

    /**
     * @private
     */
    getBodyTemplate: function() {
        return [{
            reference: 'inputElement',
            cls: Ext.baseCSSPrefix + 'input-el'
        }];
    },

    /**
     * @private
     */
    getDisplayValue: function(value) {
        var me = this,
            renderer = me.getRenderer();

        if (renderer) {
            value = Ext.callback(renderer, me.scope, [value, me], 0, me);
        }
        return me.getHtmlEncode() ? Ext.util.Format.htmlEncode(value) : value;
    },

    doUpdateDom: function() {
        var me = this,
            value = me.getValue();

        value = Ext.valueFrom(value, '');
        if (me.inputElement) {
            me.inputElement.dom.innerHTML = me.getDisplayValue(value);
        }
    },

    updateValue: function(newValue, oldValue) {
        this.doUpdateDom();
        return this.callParent([ newValue, oldValue ]);
    },

    updateHtmlEncode: function(newValue, oldValue) {
        if (!this.isConfiguring) {
            this.doUpdateDom();
        }
    },

    updateRenderer: function(newRenderer, oldRenderer) {
        if (!this.isConfiguring) {
            this.doUpdateDom();
        }
    },

    validate: Ext.returnTrue,

    isValid: Ext.returnTrue

});
