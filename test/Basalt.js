const Basalt = artifacts.require('./Basalt.sol');

contract('Basalt', (accounts)=> {
  it('initializes contract', async () => {
    const basalt = await Basalt.deployed()
    const title = await basalt.title;
    assert.equal(title, 'Basalt - connecting colleges & businesses around the world')
  })

  it('can create an Institute', async () => {
    
  })

  it('can create a Business', async () => {
    
  })

  it('Institute can create a Graduate', async () => {
    
  })

  it('Institute can review another Institute', async () => {
    
  })

  it('Business can view a Graduates information', async () => {

  })

  it('Can get a count of an Institutes Graduates', async () => {

  })

  it('Can get a count of all Institutes', async () => {

  })



})
