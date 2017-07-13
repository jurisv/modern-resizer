/**
 * The Number field creates an HTML5 text input that allows the editing of number values, and is usually created inside
 * a form. Most browsers will show a specialized virtual keyboard for entering numbers. The Number field
 * only accepts numerical input.  If you want a Number field with up/down spinners, see {@link Ext.field.Spinner}.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'How old are you?',
 *                 items: [
 *                     {
 *                         xtype: 'numberfield',
 *                         label: 'Age',
 *                         minValue: 18,
 *                         maxValue: 150,
 *                         name: 'age'
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 *
 * Or on its own, outside of a form:
 *
 *     Ext.create('Ext.field.Number', {
 *         label: 'Age',
 *         value: '26'
 *     });
 *
 * ## minValue, maxValue
 *
 * The {@link #minValue} and {@link #maxValue} configurations are self-explanatory and simply constrain the value
 * For example, to create a salary field that limits entry to between 25,000 and 50,000 we can do this:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'Are you rich yet?',
 *                 items: [
 *                     {
 *                         xtype: 'numberfield',
 *                         label: 'Salary',
 *                         value: 30000,
 *                         minValue: 25000,
 *                         maxValue: 50000
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 *
 * This creates a field that starts with a value of $30,000 and will not go beneath $25,000 or above $50,000.
 *
 * Because number field inherits from {@link Ext.field.Text textfield} it gains all of the functionality that text
 * fields provide, including getting and setting the value at runtime, validations and various events that are fired as
 * the user interacts with the component. Check out the {@link Ext.field.Text} docs to see the additional functionality
 * available.
 */
Ext.define('Ext.field.Number', {
    extend: 'Ext.field.Text',
    xtype: 'numberfield',
    alternateClassName: 'Ext.form.Number',

    config: {
        /**
         * @cfg {Number} [minValue=undefined] The minimum value that this Number field can accept (defaults to `undefined`, e.g. no minimum).
         * @accessor
         */
        minValue: null,

        /**
         * @cfg {Number} [maxValue=undefined] The maximum value that this Number field can accept (defaults to `undefined`, e.g. no maximum).
         * @accessor
         */
        maxValue: null,

        /**
         * @cfg {Number} [decimals=2]
         * The maximum precision to display after the decimal separator.
         * @locale
         */
        decimals: 2
    },

    /**
     * @cfg {String}
     * For desktop environments, an input type=text field is used and a rich user experience is provided
     * for numeric entry.  For mobile environments, an input type=number field is used and basic validation
     * is performed on keystroke and minValue/maxValue clamping is only done on blur or setValue() if the
     * field is not focused.
     *
     * If you specify inputType: 'text', the text input will be used on mobile devices at the expense of
     * numeric input keyboard on non-iOS devices.  Alternatively, you may specify a type of 'tel' which
     * will bring up the phone number input keyboard, which isn't as ideal as the numeric keyboard.
     */
    inputType: Ext.os.is.Desktop ? 'text' : 'number',

    /**
     * @cfg {String} The error message that will be displayed if the field's value is less than minValue
     * @Locale
     * @since 6.5.1
     */
    minValueText: 'The minimum value for this field is {0}',

    /**
     * @cfg {String} The error message that will be displayed if the field's value is greater than maxValue.
     * @Locale
     * @since 6.5.1
     */
    maxValueText: 'The maximum value for this field is {0}',

    /**
     * @cfg {String} The error message that will be displayed if the field's value has incorrect number of
     * decimal places.
     * @Locale
     * @since 6.5.1
     */
    decimalsText: 'The maximum decimal places is {0}',

    /**
     * @cfg {String} The error message that will be displayed if the field's value is incorrect format.
     * An example of invalid format would be "123.4545.51235" (two decimal points).
     * @Locale
     * @since 6.5.1
     */
    badInputText: 'Value is not a valid number',

    classCls: Ext.baseCSSPrefix + 'numberfield',

    privates: {
        // Things get a bit weird when the input is a very large number.  For example,
        // 111111111111111111111111111 is internally represented as 1.111111111111111e+26
        // Even though there is no actual decimal point in the input, there is one when we String(value).
        // Also, 111111111111111111111111111.11 is represented as 1.111111111111111e+26, so there is no
        // discernable difference - the decimal/fractioal precision is lost.
        //
        // This re can be used to test for the exponent representation.
        exponentRe: /e\+\d+$/
    },

    constructor: function() {
        this.callParent(arguments);
        // This should bring up the numeric keyboard on most browsers.
        // Note in forms we have novalidate attribute set on the FORM tag.
        this.inputElement.dom.setAttribute('pattern', '\\d*');
        // This isn't supported in browsers yet, but is part of the spec.
        this.inputElement.dom.setAttribute('inputmode', 'numeric');
    },

    doValidate: function(value, errors) {
        this.callParent(arguments);
        var me = this,
            dom = me.inputElement.dom,
            minValue = me.getMinValue(),
            maxValue = me.getMaxValue(),
            decimals = me.getDecimals();

        value = parseFloat(dom.value || '0');
        if (minValue != null && value < minValue) {
            errors.push(Ext.String.formatEncode(me.minValueText, minValue));
        }
        else if (maxValue != null && value > maxValue) {
            errors.push(Ext.String.formatEncode(me.maxValueText, maxValue));
        }
        if (!me.exponentRe.test(String(value)) && !me.re.test(String(value))) {
            errors.push(Ext.String.formatEncode(me.decimalsText, decimals));
        }
        if (dom.validity.badInput) {
            errors.push(Ext.String.formatEncode(me.badInputText));
        }
    },

    onKeyDown: function(e) {
        if (this.getInputType() !== 'number') {
            if (!e.ctrlKey && !e.altKey) {
                var raw = Ext.String.insert(String(this.getInputValue() || ''), e.key(), this.getCaretPos());

                if (Ext.field.Number.specialKeys.indexOf(e.getCharCode()) < 0 && !this.re.test(raw)) {
                    e.preventDefault();
                    return false;
                }
            }
        }
        this.callParent([e]);
    },

    onPaste: function(e) {
        var me = this,
            text,
            caretPos,
            clipboardData = e.browserEvent.clipboardData;

        if (!me.inputMask && me.getInputType() !== 'number') {
            caretPos = me.getCaretPos();
            if (clipboardData && clipboardData.getData) {
                text = clipboardData.getData('text/plain');
            }
            else if (Ext.global.clipboardData && Ext.global.clipboardData.getData) {
                text = Ext.global.clipboardData.getData('Text'); // IE
            }

            if (text) {
                text = text.replace(new RegExp(Ext.util.Format.thousandSeparator, 'g'), '');
                text = Ext.String.insert(String(me.getInputValue() || ''), text, caretPos);

                if (me.re.test(text)) {
                    me.inputElement.dom.value = text;
                }
                me.validate();
                e.preventDefault();
                return false;
            }
        }
        me.callParent([e]);
        me.validate();
    },

    applyValue: function(value, oldValue) {
        var me = this,
            maxValue = me.getMaxValue(),
            minValue = me.getMinValue(),
            newValue,
            caretPos;

        if (!me.focused && Ext.isNumber(value)) {
            if (maxValue != null && value > maxValue) {
                value = maxValue;
            }
            else if (minValue != null && value < minValue) {
                value = minValue;
            }
        }
        if (value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
            value = oldValue;
            if (me.getInputType() !== 'number') {
                caretPos = me.getCaretPos();
                me.inputElement.dom.value = value;
                me.setCaretPos(caretPos-1);
            }
            else {
                // Not much we can do about forcing the caret to the end of the input field
                // but the alternative is to allow the number field to display some value that
                // is much much much larger than the cmp's getValue() would return.
                me.inputElement.dom.value = value;
            }
        }
        if (value !== '' && value !== null) {
            value = Ext.Number.roundToPrecision(parseFloat(value) || null, me.getDecimals());
        }
        else {
            me.inputElement.dom.value = '';
        }
        value = me.callParent([value, oldValue]);
        return value;
    },

    updateDecimals: function(newDecimals) {
        var me = this,
            minValue = me.getMinValue(),
            re = '^';

        // Negative is allowed if minValue less that zero, or there is no minimum
        if (minValue == null || minValue < 0) {
            re += '[-]?';
        }
        re += '\\d*';
        if (newDecimals) {
            re += '(\\' + Ext.util.Format.decimalSeparator + '{0,1})(\\d{0,' + newDecimals + '})';
        }
        re += '$';
        this.re = new RegExp(re);
    },

    getValue: function() {
        var value = parseFloat(this.callParent());
        return (isNaN(value)) ? null : value;
    }
}, function(Number) {
    var E = Ext.event.Event;

    Number.specialKeys = [
        E.BACKSPACE,
        E.TAB,
        E.RETURN,
        E.CTRL,
        E.DELETE,
        E.LEFT,
        E.RIGHT,
        E.UP,
        E.DOWN,
        E.HOME,
        E.END,
        E.META
    ];
});
