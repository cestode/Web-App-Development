describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
    cy.contains('Login').click()
    cy.get('input[name="username"]').type('Yarik')
    cy.get('input[type="password"]').type('Yarikpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('Profile').click()
    cy.contains('h4', 'Yarik').should('be.visible')
  })
})