// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const Verifier = artifacts.require('Verifier');
const proof = require("../../zokrates/code/square/proof.json");
const incorrectProof = require("../../zokrates/code/square/proof-incorrect.json");

contract('Verifier', accounts => {
    let account_one = accounts[0];
    let contract;

    before('setup contract', async () => {
        contract = await Verifier.new({ from: account_one });
    });

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it('verifies a correct proof', async function() {
        let result = await contract.verifyTx(proof.proof, proof.inputs);
        assert.equal(result, true);
    });
    
    // Test verification with incorrect proof
    it('fails with an incorrect proof', async function() {
        let result = await contract.verifyTx(incorrectProof.proof, incorrectProof.inputs);
        assert.equal(result, false);
    });
});

