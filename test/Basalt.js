const Basalt = artifacts.require('./Basalt.sol');

contract('Basalt', (accounts)=> {
  it('initializes contract', async () => {
    const basalt = await Basalt.deployed()
    const title = await basalt.title;
    assert.equal(title, 'Basalt - connecting colleges & businesses around the world')
  })

  it('can create an Institute', async () => {
    
  })

  



})
