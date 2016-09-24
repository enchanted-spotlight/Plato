// chai documentation: http://chaijs.com/api/bdd/
const chai = require('chai');
const request = require('supertest');
const express = require('express');

const should = chai.should();
const expect = chai.expect;

// fill this out with the database uri
const dbURI = 'FILL_ME_OUT';

describe('Plato', () => {
  before((done) => {
    // before we start running the tests, do something here
    done();
  });

  beforeEach((done) => {
    // before each test, do something here
    done();
  });

  afterEach((done) => {
    // after each test, do something here
    done();
  });
  // --------------- UNIT TEST ---------------//
  // focuses on single method or class
  // tests one thing at a time
  // doesn't talk across network or to database
  describe('The test should pass', () => {
    it('should pass the tests', () => {
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

  // ----------- INTEGRATION TEST ------------ //
  // ensures diff parts of a system work correctly together
  // involves more than one part of a system
  // does code auth? talk to network? database? correctly?

  describe('API endpoints', () => {
    describe('POST api/save-note', () => {
      it('should save a note', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
      it('should update an existing note', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
    });
    describe('GET api/:user', () => {
      it('should find an existing notes for a user', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
      it('should return 404 for a non-existing user', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
      it('should return an empty object for a new user with no notes', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
    });
    describe('DELETE api/del-note/:id', () => {
      it('should delete an existing note', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
      it('should return 404 if the note doesnt exist', () => {
        // dummy test, replace later
        expect(true).to.be(true);
      });
    });
  });

  // ----------- END 2 END TEST ------------- //
  // test if app works in real life situations

  // ------------ Visual test? ------------- //
  // test if UI hasn't changed unexpectedly
});
