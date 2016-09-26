// change to test travisci
// chai documentation: http://chaijs.com/api/bdd/
const chai = require('chai');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('../server/server');

const should = chai.should();
const expect = chai.expect;

const User = require('../db/models/user');
const Note = require('../db/models/note');

describe('Plato', () => {
  before((done) => {
    done();
  });

  beforeEach((done) => {
    const testUser = new User({
      name: 'testUser'
    });
    testUser.save();

    const testNote = new Note({
      user_id: '000000',
      text: 'hello',
      title: 'testNote'
    });
    testNote.save();

    done();
  });

  afterEach((done) => {
    // clear collections when we're done with the test
    mongoose.connection.collections.users.remove();
    mongoose.connection.collections.texts.remove();
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
    describe('GET /api/:user', () => {
      it('should find an existing note for a user', (done) => {
        request(app)
          .get('/api/000000')
          .end((err, res) => {
            const text = JSON.parse(res.text)[0];
            expect(text.user_id).to.equal('000000');
            done();
          });
      });
      it('should return 404 for a non-existing user', (done) => {
        request(app)
          .get('/api/aFigmentOfYourImagination')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
    });
    describe('POST /api/save-note', () => {
      it('should save a note', (done) => {
        request(app)
          .post('/api/save-note')
          .send({
            user_id: '123123123',
            text: 'lolololol',
            title: 'testttt'
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
      it('should update an existing note', (done) => {
        request(app)
          .post('/api/save-note')
          .send({
            user_id: '123123123',
            text: 'lolololol',
            title: 'GODZILLA'
          })
          .end(() => {
            request(app)
              .post('/api/save-note')
              .send({
                user_id: '123123123',
                text: 'roflcopter',
                title: 'GODZILLA'
              })
              .end(() => {
                request(app)
                .get('/api/123123123')
                .end((err, res) => {
                  const text = JSON.parse(res.text)[0];
                  expect(text.text).to.equal('roflcopter');
                  done();
                });
              });
          });
      });
    });
    describe('DELETE /api/delete-note/:id', () => {
      it('should delete an existing note', () => {
        // first get the mongo id by querying the database
        request(app)
          .get('/api/000000')
          .end((err, res) => {
            const id = JSON.parse(res.text)[0]._id;
            request(app)
              .delete('/api/delete-note/'.concat(id))
              .end((err2, res2) => {
                expect(res2.status).to.equal(200);
              });
          });
      });
      it('should return 404 if the note doesnt exist', () => {
        request(app)
          .delete('/api/delete-note/totallyfakeid')
          .end((err, res) => {
            expect(res.status).to.equal(500);
          });
      });
    });
  });

  // ----------- END 2 END TEST ------------- //
  // test if app works in real life situations

  // ------------ Visual test? ------------- //
  // test if UI hasn't changed unexpectedly
});
