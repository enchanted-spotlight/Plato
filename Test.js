//chai documentation: http://chaijs.com/api/bdd/
var chai = require('chai');
var request = require('supertest');
var express = require('express');
var should = chai.should();
var expect = chai.expect;

//--------------- UNIT TEST ---------------// 
// focuses on single method or class
// tests one thing at a time
// doesn't talk across network or to database
describe('The test should pass', function() {
  it('should pass the tests', function() {
    expect(typeof 'string').to.equal('string');
  });
});

/*
//do this for other unit tests:
describe('What is this test generally for?', function() {
  it('write a mini test', function() {
  //optional operations
	expect(your code's result).to.equal(the desired result);
  });
});
*/

// ----------- INTEGRATION TEST ------------//
// ensures diff parts of a system work correctly together
// involves more than one part of a system
// does code auth? talk to network? database? correctly?

// ----------- END 2 END TEST -------------//
// test if app works in real life situations

//------------ Visual test? ------------- //
// test if UI hasn't changed unexpectedly
