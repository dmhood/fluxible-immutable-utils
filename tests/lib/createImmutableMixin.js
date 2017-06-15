/*globals describe,it,beforeEach,afterEach*/

'use strict';

var React = require('react');
var createImmutableMixin = require('../../lib/createImmutableMixin');
var expect = require('chai').expect;
var jsx = require('jsx-test');
var sinon = require('sinon');

describe('createImmutableMixin', function () {
    var config = {
        ignoreImmutableCheck: {
            props: {
                data: 'SKIP_SHOULD_UPDATE'
            },
            state: {
                foo: true
            }
        }
    };
    var CustomImmutableMixin = createImmutableMixin(config);

    beforeEach(function () {
        sinon.spy(console, 'warn');
    });

    afterEach(function () {
        console.warn.restore();
    });

    it('should apply configs if we use createComponentMixn', function () {
        var state = {
            foo: {},
            baz: {}
        };
        var Component = React.createClass({
            displayName: 'MyComponent',
            mixins: [CustomImmutableMixin],
            render: function () {
                return null;
            },
            getStateOnChange: function () {
                return state;
            }
        });
        var props = {
            data: {}
        };
        var component = jsx.renderComponent(Component, {data: false});
        expect(component.shouldComponentUpdate(props, state)).to.equal(false);
        expect(console.warn.callCount).to.equal(1);
    });
});
