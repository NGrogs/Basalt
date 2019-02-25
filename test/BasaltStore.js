const Basalt = artifacts.require('./BasaltStore.sol');

contract('Basalt', (accounts)=> {
it('initializes contract', async () => {
    const basalt = await Basalt.deployed()
    const title = await basalt.title;
    assert.equal(title, 'Basalt - connecting colleges & businesses around the world')
    })

    it('can store a document', async () => {
    
    })

    it('can retrieve a document', async () => {
    
    })



})
