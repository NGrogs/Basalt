const Basalt = artifacts.require('./BasaltStore.sol');

contract('Basalt', (accounts)=> {

    it('initializes contract', async () => {
        const basalt = await Basalt.deployed()
        const documentCount = await basalt.documentCount;
        assert.equal(documentCount, 0)
    })

    it('can store a document', async () => {
        const basalt = await Basalt.deployed()
        const basaltCreate = await basalt.sendDocument("a8dj39skjJJ98", 12345678, 7423742, "A7djAkkB72jL");
        const documentCount = await basalt.documentCount;
        assert.equal(documentCount, 1);
    })

    it('can retrieve a document', async () => {
        const basalt = await Basalt.deployed()
        const basaltCreate = await basalt.sendDocument("a8dj39skjJJ98", 12345678, 7423742, "A7djAkkB72jL");
        const myArray = basalt.getDocument(7423742);
        assert.equal("a8dj39skjJJ98", myArray[0]);
    })

})
