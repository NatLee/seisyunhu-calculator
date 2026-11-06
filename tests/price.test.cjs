const { test } = require('node:test');
const assert = require('node:assert/strict');
const { calculatePrice } = require('../js/price.js');
const price = (overrides = {}) => calculatePrice({people:3,enter:12,exit:14,holiday:false,premium:false,discount:0,...overrides});
test('weekday rates depend on entry time and machine', () => {
    assert.equal(price().total,460); // 2 hours at 230
    assert.equal(price({premium:true}).total,560);
    assert.equal(price({enter:16,exit:18}).total,600);
    assert.equal(price({enter:16,exit:18,premium:true}).total,680);
});
test('additional people are charged once', () => assert.equal(price({people:4}).total,680));
test('three-person holiday morning uses the three-person package', () => {
    assert.equal(price({enter:9,exit:11,holiday:true}).total,720);
    assert.equal(price({people:1,enter:9,exit:11,holiday:true}).total,720);
    assert.equal(price({enter:9,exit:11,holiday:true,premium:true}).total,870);
});
test('morning-only trips have no negative regular hours or extra charge', () => {
    const p=price({people:4,enter:9,exit:10,holiday:true});
    assert.equal(p.total,920); assert.equal(p.hours,0); assert.equal(p.commonTotal,0);
});
test('holiday morning followed by regular hours', () => assert.equal(price({enter:9,exit:14,holiday:true}).total,1400));
test('discount cannot create a negative bill or discount the morning package', () => {
    assert.equal(price({discount:10000}).total,0);
    assert.equal(price({enter:9,exit:14,holiday:true,discount:10000}).total,720);
});
test('invalid counts and unsupported time ranges fail clearly', () => {
    for(const input of [{people:0},{people:1.5},{discount:-1},{enter:NaN},{exit:12},{enter:22,exit:9},{enter:9},{exit:24}])
        assert.throws(()=>price(input),RangeError);
});
