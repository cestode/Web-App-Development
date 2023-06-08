describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
    cy.get('input[id="messageText"]').type('PING')
    cy.get('button[id="chatButton"]').click()
    cy.get('textArea[id="chatArea"]').should('have.value','anonymus : PING\n')
  })
})