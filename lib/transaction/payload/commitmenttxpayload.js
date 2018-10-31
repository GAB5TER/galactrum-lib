var utils = require('../../util/js');
var constants = require('./constants');
var Preconditions = require('../../util/preconditions');
var BufferWriter = require('../../encoding/bufferwriter');
var BufferReader = require('../../encoding/bufferreader');
var AbstractPayload = require('./abstractpayload');
var Script = require('../../script');

var CURRENT_PAYLOAD_VERSION = 1;

/**
* @typedef {Object} CommitmentTxPayloadJSON
* @property {number} version	uint16_t	2	Version of the final commitment message
* @property {string} quorumHash	uint256	32	The quorum identifier
* @property {number} signersSize	compactSize uint	1-9	Bit size of the signers bitvector
* @property {string} signers	byte[]	(bitSize + 7) / 8	Bitset representing the aggregated signers of this final commitment
* @property {number} validMembersSize	compactSize uint	1-9	Bit size of the validMembers bitvector
* @property {string} validMembers	byte[]	(bitSize + 7) / 8	Bitset of valid members in this commitment
* @property {string} quorumPublicKey	BLSPubKey	48	The quorum public key
* @property {string} quorumVvecHash	uint256	32	The hash of the quorum verification vector
* @property {string} quorumSig	BLSSig	96	Recovered threshold signature
* @property {string} sig	BLSSig	96	Aggregated BLS signatures from all included commitments
*/

/**
* @class CommitmentTxPayload
* @property {number} version	
* @property {number} quorumHash	
* @property {number} signersSize	
* @property {number} signers	
* @property {number} validMembersSize	
* @property {number} validMembers	
* @property {number} quorumPublicKey	
* @property {number} quorumVvecHash	
* @property {number} quorumSig	
* @property {number} sig
*/

function CommitmentTxPayload(options) {
  AbstractPayload.call(this);
  this.version = CURRENT_PAYLOAD_VERSION;

  if (options) {
    this.quorumHash = options.quorumHash;
    this.signers = options.signers;
    this.validMembers = options.validMembers;
    this.quorumPublicKey = options.quorumPublicKey;
    this.quorumVvecHash = options.quorumVvecHash;
    this.quorumSig = options.quorumSig;
    this.sig = options.sig;
  }
}

CommitmentTxPayload.prototype = Object.create(AbstractPayload.prototype);
CommitmentTxPayload.prototype.constructor = AbstractPayload;

/* Static methods */

/**
 * Parse raw payload
 * @param {Buffer} rawPayload
 * @return {CommitmentTxPayload}
 */
CommitmentTxPayload.fromBuffer = function fromBuffer(rawPayload) {
  var payloadBufferReader = new BufferReader(rawPayload);
  var payload = new CommitmentTxPayload();
  payload.version = payloadBufferReader.readUInt16LE();
  payload.quorumHash = payloadBufferReader.read(constants.SHA256_HASH_SIZE).toString('hex');

  payload.signersSize = payloadBufferReader.readVarintNum();
  payload.signers = payloadBufferReader.read((payload.signersSize + 7) / 8).toString('hex');

  payload.validMembersSize = payloadBufferReader.readVarintNum();
  payload.validMembers = payloadBufferReader.read((payload.validMembersSize + 7) / 8).toString('hex');

  payload.quorumPublicKey = payloadBufferReader.read(constants.BLS_PUBLIC_KEY_SIZE).toString('hex');
  payload.quorumVvecHash = payloadBufferReader.read(constants.SHA256_HASH_SIZE).toString('hex');
  payload.quorumSig = payloadBufferReader.read(constants.BLS_SIGNATURE_SIZE).toString('hex');
  payload.sig = payloadBufferReader.read(constants.BLS_SIGNATURE_SIZE).toString('hex');

  if (!payloadBufferReader.finished()) {
    throw new Error('Failed to parse payload: raw payload is bigger than expected.');
  }

  return payload;
};

/**
 * Create new instance of payload from JSON
 * @param {string|CommitmentTxPayloadJSON} payloadJson
 * @return {CommitmentTxPayload}
 */
CommitmentTxPayload.fromJSON = function fromJSON(payloadJson) {
  var payload = new CommitmentTxPayload(payloadJson);
  payload.validate();
  return payload;
};

/* Instance methods */

/**
 * Validate payload
 * @return {boolean}
 */
CommitmentTxPayload.prototype.validate = function () {
  Preconditions.checkArgument(utils.isUnsignedInteger(this.version), 'Expect version to be an unsigned integer');
  Preconditions.checkArgument(utils.isHexaString(this.quorumHash), 'Expect quorumHash to be a hex string');
  Preconditions.checkArgument(utils.isHexaString(this.signers), 'Expect signers to be a hex string');
  Preconditions.checkArgument(utils.isHexaString(this.validMembers), 'Expect validMembers to be a hex string');
  Preconditions.checkArgument(utils.isHexaString(this.quorumPublicKey), 'Expect quorumPublicKey to be a hex string');
  Preconditions.checkArgument(utils.isHexaString(this.quorumVvecHash), 'Expect quorumVvecHash to be a hex string');
  Preconditions.checkArgument(utils.isHexaString(this.quorumSig), 'Expect quorumSig to be a hex string');
  Preconditions.checkArgument(utils.isHexaString(this.sig), 'Expect sig to be a hex string');
};

/**
 * Serializes payload to JSON
 * @param [options]
 * @return {CommitmentTxPayload}
 */
CommitmentTxPayload.prototype.toJSON = function toJSON(options) {
  this.validate();
  var payloadJSON = {
    version: this.version,
    quorumHash: this.quorumHash,
    signerSize: this.signerSize,
    signers: this.signers,
    validMembersSize: this.validMembersSize,
    validMembers: this.validMembers,
    quorumPublicKey: this.quorumPublicKey,
    quorumVvecHash: this.quorumVvecHash,
    quorumSig: this.quorumSig,
    sig: this.sig,
  };

  return payloadJSON;
};

/**
 * Serialize payload to buffer
 * @param [options]
 * @return {Buffer}
 */
CommitmentTxPayload.prototype.toBuffer = function toBuffer(options) {
  this.validate();

  // var signerSizeLength = Buffer.from(this.signersSize).length;
  // var validMemberSizeLength = Buffer.from(this.validMembersSize).length;

  var payloadBufferWriter = new BufferWriter();
  payloadBufferWriter
    .writeUInt16LE(this.version)
    .write(Buffer.from(this.quorumHash, 'hex'))
    .writeVarintNum(Buffer.from(this.signers, 'hex').length * 8 - 7)
    .write(Buffer.from(this.signers, 'hex'))
    .writeVarintNum(Buffer.from(this.validMembers, 'hex').length * 8 - 7)
    .write(Buffer.from(this.validMembers, 'hex'))
    .write(Buffer.from(this.quorumPublicKey, 'hex'))
    .write(Buffer.from(this.quorumVvecHash, 'hex'))
    .write(Buffer.from(this.quorumSig, 'hex'))
    .write(Buffer.from(this.sig, 'hex'))

  return payloadBufferWriter.toBuffer();
};

CommitmentTxPayload.prototype.copy = function copy() {
  return CommitmentTxPayload.fromBuffer(this.toBuffer());
};

module.exports = CommitmentTxPayload;