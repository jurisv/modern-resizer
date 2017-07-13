topSuite("Ext.field.Picker", ['Ext.Button', 'Ext.picker.Picker'], function() {
    var oldPlatformTags, field, picker;

    jasmine.usesViewport();

    function makeField(cfg) {
        field = new Ext.field.Picker(cfg);

        if (field.getFloated()) {
            field.show();
        }
        else {
            field.render(Ext.getBody());
        }
    }

    beforeEach(function () {
        oldPlatformTags = Ext.merge({}, Ext.platformTags);
    });

    afterEach(function() {
        Ext.platformTags = oldPlatformTags;

        field = picker = Ext.destroy(field);
    });

    describe("picker type", function() {
        beforeEach(function() {
            makeField({
                createEdgePicker: function() {
                    return new Ext.Component({
                        ownerField: this,
                        isViewportMenu: true,
                        where: 'edge'
                    });
                },

                createFloatedPicker: function() {
                    return new Ext.Component({
                        ownerField: this,
                        where: 'floated'
                    });
                }
            });
        });

        it("should choose edge picker on a phone", function() {
            Ext.platformTags.phone = true;

            picker = field.getPicker();

            expect(picker.where).toBe('edge');
            expect(field.pickerType).toBe('edge');
        });

        it("should choose floated picker when not on a phone", function() {
            Ext.platformTags.phone = false;

            picker = field.getPicker();

            expect(picker.where).toBe('floated');
            expect(field.pickerType).toBe('floated');
        });
    });

    describe('showPicker', function () {
        beforeEach(function() {
            makeField({
                createEdgePicker: function() {
                    return new Ext.picker.Picker({
                        ownerField: this,
                        slots: [{
                            name: 'name',
                            data: [{
                                text: 'Bar',
                                value: 'bar'
                            }, {
                                text: 'Baz',
                                value: 'baz'
                            }, {
                                text: 'Foo',
                                value: 'foo'
                            }]
                        }]
                    });
                }
            });
        });

        it('should set value to picker on show', function () {
            Ext.platformTags.phone = true;

            field.setValue('foo');

            field.expand();

            picker = field.getPicker();

            expect(field.pickerType).toBe('edge');
            expect(picker.getValue(true)).toEqual({
                name: 'foo'
            });
        });
    });
    
    describe("Picker fields readonly on first tap", function() {
        var inputEl, button, expandSpy, collapseSpy;
        
        beforeEach(function() {
            button = new Ext.Button({
                text: 'foo',
                renderTo: document.body
            });

            expandSpy = jasmine.createSpy('expand');
            collapseSpy = jasmine.createSpy('collapse');

            makeField({
                createEdgePicker: function() {
                    return new Ext.Component({
                        ownerField: this,
                        where: 'edge'
                    });
                },

                createFloatedPicker: function() {
                    return new Ext.Component({
                        ownerField: this,
                        where: 'floated'
                    });
                },

                listeners: {
                    expand: expandSpy,
                    collapse: collapseSpy
                }
            });

            inputEl = field.inputElement;
        });

        afterEach(function() {
            inputEl = button = expandSpy = collapseSpy = Ext.destroy(button);
        });
        
        (jasmine.supportsTouch ? describe : xdescribe)("Readonly on first tap", function() {
            describe("tap on unfocused field", function() {
                beforeEach(function() {

                    Ext.testHelper.tap(inputEl, { pointerType: 'touch'});
                });
                
                it("should set the inputEl to readOnly", function() {
                    expect(inputEl.dom.getAttribute('readonly')).toBe('true');
                });

                it("should expand the picker", function() {
                    expect(expandSpy).toHaveBeenCalled();
                });
            });
            
            describe("focus leave", function() {
                it("should restore the inputEl to editability on focus leave", function() {
                    focusAndExpect(button);

                    runs(function() {
                        Ext.testHelper.tap(inputEl, { pointerType: 'touch'});
                        inputEl.focus();

                        // We set it to readOnly="true" on tap.
                        // But a timer restores it to the configured state very soon
                        expect(inputEl.dom.getAttribute('readonly')).toBe('true');
                    });

                    waitsForSpy(expandSpy);

                    // That backstop timer should restore to te configured state quickly after focus
                    waitsFor(function() {
                        return inputEl.dom.getAttribute('readonly') == null;
                    });

                    runs(function() {
                        inputEl.dom.blur();
                    });

                    waitsForSpy(collapseSpy);

                    runs(function() {
                        expect(inputEl.dom.getAttribute('readonly')).toBe(null);
                    });
                });
            });
        });
        
        (jasmine.supportsTouch ? xdescribe : describe)("No touch focusing", function() {
            it("should not set to readonly on mouse-induced focus", function() {
                jasmine.fireMouseEvent(inputEl, 'mousedown');

                // None of that game playing when using a mouse
                expect(inputEl.dom.getAttribute('readonly')).toBe(null);

                jasmine.fireMouseEvent(inputEl, 'mouseup');
                });
            });
        });
    });
