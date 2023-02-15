describe('mijn eerste test', () => {
  beforeEach(() => {
    cy.login();
  });
  it('mijn eerste test', () => {

  
    cy.visit('localhost:3000')
    
  })
})