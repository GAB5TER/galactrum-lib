/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

'use strict';

var orecore = module.exports;

// module information
orecore.version = 'v' + require('./package.json').version;
orecore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of orecore-lib found. ' +
      'Please make sure that you are not mixing instances of classes of the different versions of galactrum.';
    console.warn(message);
  }
};
orecore.versionGuard(global._orecore);
global._orecore = orecore.version;

// crypto
orecore.crypto = {};
orecore.crypto.BN = require('./lib/crypto/bn');
orecore.crypto.ECDSA = require('./lib/crypto/ecdsa');
orecore.crypto.Hash = require('./lib/crypto/hash');
orecore.crypto.Random = require('./lib/crypto/random');
orecore.crypto.Point = require('./lib/crypto/point');
orecore.crypto.Signature = require('./lib/crypto/signature');

// encoding
orecore.encoding = {};
orecore.encoding.Base58 = require('./lib/encoding/base58');
orecore.encoding.Base58Check = require('./lib/encoding/base58check');
orecore.encoding.BufferReader = require('./lib/encoding/bufferreader');
orecore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
orecore.encoding.Varint = require('./lib/encoding/varint');

// utilities
orecore.util = {};
orecore.util.buffer = require('./lib/util/buffer');
orecore.util.js = require('./lib/util/js');
orecore.util.preconditions = require('./lib/util/preconditions');
orecore.util.hashUtil = require('./lib/util/hashutil');
orecore.util.merkleTree = require('./lib/util/merkletree');

// errors thrown by the library
orecore.errors = require('./lib/errors');

// main galactrum library
orecore.Address = require('./lib/address');
orecore.Block = require('./lib/block');
orecore.MerkleBlock = require('./lib/block/merkleblock');
orecore.SimplifiedMNList = require('./lib/deterministicmnlist/SimplifiedMNList');
orecore.SimplifiedMNListDiff = require('./lib/deterministicmnlist/SimplifiedMNListDiff');
orecore.SimplifiedMNListEntry = require('./lib/deterministicmnlist/SimplifiedMNListEntry');
orecore.BlockHeader = require('./lib/block/blockheader');
orecore.HDPrivateKey = require('./lib/hdprivatekey.js');
orecore.HDPublicKey = require('./lib/hdpublickey.js');
orecore.Networks = require('./lib/networks');
orecore.Opcode = require('./lib/opcode');
orecore.PrivateKey = require('./lib/privatekey');
orecore.PublicKey = require('./lib/publickey');
orecore.Script = require('./lib/script');
orecore.Transaction = require('./lib/transaction');
orecore.GovObject = require('./lib/govobject');
orecore.URI = require('./lib/uri');
orecore.Unit = require('./lib/unit');
orecore.Message = require('./lib/message');
orecore.Mnemonic = require('./lib/mnemonic');

// dependencies, subject to change
orecore.deps = {};
orecore.deps.bnjs = require('bn.js');
orecore.deps.bs58 = require('bs58');
orecore.deps.Buffer = Buffer;
orecore.deps.elliptic = require('elliptic');
orecore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
orecore.Transaction.sighash = require('./lib/transaction/sighash');
