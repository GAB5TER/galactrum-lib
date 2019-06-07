/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

'use strict';

module.exports = {
  TXHEX: [
    [ // From Mainnet Block 100001
      // TXID: 060290f3f282fad9a328f8aa3936330a7ca91eb88ff18569df443903ea3e2f41
      "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff1803a18601045ee7f05a0881000029010000007969696d70000000000002e84fb929000000001976a914df6f4eef6ac95e55af4b1547983a8d67a615242388ac88b4e111000000001976a914a32eb43282b5750cb7bb0f7f56fd1a486fc3596d88ac00000000",
      // From Mainnet Block 200001
      // TXID: 36a60cd6b4c103d8ce4ff02e47360e1a5fcb75a01f7dce4d9d2e1bc0425fddca
      "0100000001c920c296915a39daa1706877b5649caeea7d78330161edd99cfacdeba5a77b6c000000006b4830450221009289663795b2dd75bde51c07b0021a1f3dc883cfc5b7ebfd96961dbe702c90480220021ed5e5185a4534d8dddd8159776c595718438d1b64a608fd6e6c5d6c0d05d201210283793f21eba79db2052e30f4da31315f835c2ae36bf04444ed678183ed29a820feffffff0230c4bd02000000001976a9144814357bdc24d3700e17fbcfdffb5dabb7b1a18d88acc0a3d00c000000001976a914c84d3323ced8c86d27b141ee31a658a69feaeb0f88ac3f0d0300"
    ]
  ],
  HEX: [
    // Mainnet Block 100001
    "00000020" + // Version
      "ec71ac35db59a2ad4de35b013d26b9b4bac2747ca841b18afbc70a0000000000" + // prevHash
      "e3d897160801fdfbc9dd9e5750088956cd895be83c079c07532a3e3eb76b98cf" + // MerkleRoot
      "5ee7f05a" + // Time
      "9d8a141b" + // Bits
      "0117596b" + // Nonce
      "03000000" + // Transaction Count
      "03" + // Hash Count
      "412f3eea033944df6985f18fb81ea97c0a333639aaf828a3d9fa82f2f3900206" + // Hash1
      "aca3eedb59cb4e286558211ed567cafc4708dca883bbfb58442db782533e0deb" + // Hash2
      "fc786916c55135b34e59507a47b84e96df26c6df4338d119367a3dd40d0d351e" + // Hash3
      "01" + // Num Flag Bytes
      "07", // Flags
      
    // Mainnet Block 200001
    "00000020" + // Version
    "22d8545411677618f45dd613e3bb5a37387242202d16b4adb9f73e0000000000" + // prevHash
    "c532d983165312c532983cb165bbac2d4b9285b78b9fd3837b874b51c195b010" + // MerkleRoot
    "f87eb15b" + // Time
    "856a4c1b" + // Bits
    "43e2c4fe" + // Nonce
    "03000000" + // Transaction Count
    "02" + // Hash Count
    "41003a1c314827575745cd72a325a889b93a5d29f0d8373461ee318245a309c1" + // Hash1
    "cadd5f42c01b2e9d4dce7d1fa075cb5f1a0e36472ef04fced803c1b4d60ca636" + // Hash2
    "01" + // Num Flag Bytes
    "d" // Flags
  ],
  JSON: [
    { // Mainnet Block 100001
      header: {
        hash: "0000000000110b6f6401a330fab303d1b3faf88f4d85c4877dd886812efc82d7",
        version: 536870912,
        prevHash: "00000000000ac7fb8ab141a87c74c2bab4b9263d015be34dada259db35ac71ec",
        merkleRoot: "e3d897160801fdfbc9dd9e5750088956cd895be83c079c07532a3e3eb76b98cf",
        time: 1525737310,
        bits: 454331037,
        nonce: 1801000705
      },
      numTransactions: 3,
      hashes: [
        "412f3eea033944df6985f18fb81ea97c0a333639aaf828a3d9fa82f2f3900206",
        "aca3eedb59cb4e286558211ed567cafc4708dca883bbfb58442db782533e0deb",
        "fc786916c55135b34e59507a47b84e96df26c6df4338d119367a3dd40d0d351e"
      ],
      flags: [ 0, 7 ]
    },
    { // Mainnet Block 200001
      header : {
        hash: "0000000000159dd67977361a103bb748d07f6adaf706aaa907752f81409ebb84",
        version : 536870912,
        prevHash : "00000000003ef7b9adb4162d20427238375abbe313d65df4187667115454d822",
        merkleRoot : "c532d983165312c532983cb165bbac2d4b9285b78b9fd3837b874b51c195b010",
        time : 1538359032,
        bits : 457992837,
        nonce : 4274315843
      },
      numTransactions : 3,
      hashes : [
        "41003a1c314827575745cd72a325a889b93a5d29f0d8373461ee318245a309c1",
        "cadd5f42c01b2e9d4dce7d1fa075cb5f1a0e36472ef04fced803c1b4d60ca636"
      ],
      flags : [ 13 ]
    }
  ]
};
