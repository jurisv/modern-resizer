topSuite("Ext.field.Number", function() {
    var field;
    
    function createField(config) {
        if (field) {
            field.destroy();
        }
        
        config = Ext.apply({
        }, config);
        
        field = new Ext.field.Number(config);
    }

    function render(f) {
        f = f || field;

        if (f.getFloated()) {
            f.show();
        } else {
            f.render(Ext.getBody());
        }
    }

    afterEach(function() {
        if (field) {
            field.destroy();
        }
    });
    
    describe("configurations", function() {
        describe("minValue text", function() {
            var defaultConfig = {
                minValue: 10,
                inputType: 'text'
            };

            describe('setValue', function () {
                it('should use minValue if value below minValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(5);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });
            });
        });

        describe("minValue number", function() {
            var defaultConfig = {
                minValue: 10,
                inputType: 'number'
            };

            describe('setValue', function () {
                it('should use minValue if value below minValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(5);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });
            });

            it('should not enforce non-negative if minValue is not configured', function() {
                createField({
                    value: -123.45
                });
                expect(field.isValid()).toBe(true);
            });
        });

        describe("maxValue number", function() {
            var defaultConfig = {
                maxValue: 10,
                inputType: 'number'
            };

            describe('setValue', function () {
                it('should use maxValue if value above maxValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(20);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });
            });
        });

        describe("maxValue text", function() {
            var defaultConfig = {
                maxValue: 10,
                inputType: 'text'
            };

            describe('setValue', function () {
                it('should use maxValue if value above maxValue', function () {
                    createField(defaultConfig);
                    render();

                    field.setValue(20);

                    expect(field.getValue()).toBe(10);
                    expect(field.inputElement.dom.value).toBe('10');
                });
            });
        });
    });

    describe("getValue number", function() {
        describe("when value is null", function() {
            beforeEach(function() {
                createField({
                    inputType: 'number'
                });
            });

            it("should return null", function() {
                expect(field.getValue()).toBeNull();
            });
        });

        describe("when value is a number", function() {
            beforeEach(function() {
                createField({
                    value: 123,
                    inputType: 'number'
                });
            });

            it("should return 123", function() {
                expect(field.getValue()).toEqual(123);
            });
        });

        describe("when value is 0", function() {
            beforeEach(function() {
                createField({
                    value: 0,
                    inputType: 'number'
                });
            });

            it("should return 0", function() {
                expect(field.getValue()).toEqual(0);
            });
        });

        describe("when value is -123", function() {
            beforeEach(function() {
                createField({
                    value: -123,
                    inputType: 'number'
                });
            });

            it("should return -123", function() {
                expect(field.getValue()).toEqual(-123);
            });
        });

        describe("when value is a string", function() {
            beforeEach(function() {
                createField({
                    value: '123',
                    inputType: 'number'
                });
            });

            it("should return 123", function() {
                expect(field.getValue()).toEqual(123);
            });
        });
    });

    describe("getValue text", function() {
        describe("when value is null", function() {
            beforeEach(function() {
                createField({
                    inputType: 'text'
                });
            });

            it("should return null", function() {
                expect(field.getValue()).toBeNull();
            });
        });

        describe("when value is a number", function() {
            beforeEach(function() {
                createField({
                    value: 123,
                    inputType: 'text'
                });
            });

            it("should return 123", function() {
                expect(field.getValue()).toEqual(123);
            });
        });

        describe("when value is 0", function() {
            beforeEach(function() {
                createField({
                    value: 0,
                    inputType: 'text'
                });
            });

            it("should return 0", function() {
                expect(field.getValue()).toEqual(0);
            });
        });

        describe("when value is -123", function() {
            beforeEach(function() {
                createField({
                    value: -123,
                    inputType: 'text'
                });
            });

            it("should return -123", function() {
                expect(field.getValue()).toEqual(-123);
            });
        });

        describe("when value is a string", function() {
            beforeEach(function() {
                createField({
                    value: '123',
                    inputType: 'text'
                });
            });

            it("should return 123", function() {
                expect(field.getValue()).toEqual(123);
            });
        });
    });

    describe("setValue input type number", function() {
        describe("null value", function() {
            beforeEach(function() {
                createField({
                    inputType: 'number'
                });
            });

            describe("when value is a number", function() {
                it("should set the value to 123", function() {
                    field.setValue(123);
                    expect(field.getValue()).toEqual(123);
                });
            });

            describe("when value is a string", function() {
                it("should set the value to 123", function() {
                    field.setValue('123');
                    expect(field.getValue()).toEqual(123);
                });
            });

            describe("when value is a negative value", function() {
                it("should set the value to -123", function() {
                    field.setValue(-123);
                    expect(field.getValue()).toEqual(-123);
                });
            });

            describe("when value is a negative value as as tring", function() {
                it("should set the value to -123", function() {
                    field.setValue('-123');
                    expect(field.getValue()).toEqual(-123);
                });
            });

            describe("when value is 0", function() {
                it("should set the value to 0", function() {
                    field.setValue(0);
                    expect(field.getValue()).toEqual(0);
                });
            });

            describe("when value is 0 as string", function() {
                it("should set the value to 0", function() {
                    field.setValue('0');
                    expect(field.getValue()).toEqual(0);
                });
            });
        });
    });

    describe("setValue input type text", function() {
        describe("null value", function() {
            beforeEach(function() {
                createField({
                    inputType: 'text'
                });
            });

            describe("when value is a number", function() {
                it("should set the value to 123", function() {
                    field.setValue(123);
                    expect(field.getValue()).toEqual(123);
                });
            });

            describe("when value is a string", function() {
                it("should set the value to 123", function() {
                    field.setValue('123');
                    expect(field.getValue()).toEqual(123);
                });
            });

            describe("when value is a negative value", function() {
                it("should set the value to -123", function() {
                    field.setValue(-123);
                    expect(field.getValue()).toEqual(-123);
                });
            });

            describe("when value is a negative value as as tring", function() {
                it("should set the value to -123", function() {
                    field.setValue('-123');
                    expect(field.getValue()).toEqual(-123);
                });
            });

            describe("when value is 0", function() {
                it("should set the value to 0", function() {
                    field.setValue(0);
                    expect(field.getValue()).toEqual(0);
                });
            });

            describe("when value is 0 as string", function() {
                it("should set the value to 0", function() {
                    field.setValue('0');
                    expect(field.getValue()).toEqual(0);
                });
            });
        });
    });
    
    describe("decimals", function() {
        it("should round the value to configured decimal precision / number", function() {
            createField({
                inputType: 'number'
            });
            field.setValue(0.1 + 0.2);
            
            expect(field.inputElement.dom.value).toBe('0.3');
        });
        it("should round the value to configured decimal precision / text", function() {
            createField({
                inputType: 'text'
            });
            field.setValue(0.1 + 0.2);

            expect(field.inputElement.dom.value).toBe('0.3');
        });
    });
});
