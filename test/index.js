/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

'use strict';

var should = require('chai').should();
var sinon = require('sinon');
var orecore = require('../');

describe('#versionGuard', function() {
  it('global._orecore should be defined', function() {
    should.equal(global._orecore, orecore.version);
  });

  it('throw a warning if version is already defined', function() {
      sinon.stub(console, 'warn');
      orecore.versionGuard('version');
      should.equal(console.warn.calledOnce,true);
      should.equal(console.warn.calledWith('More than one instance of orecore-lib found. Please make sure that you are not mixing instances of classes of the different versions of galactrum.'),true)
  });
});
