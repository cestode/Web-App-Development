describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
    cy.contains('Login').click()
    cy.get('input[name="username"]').type('Yarik')
    cy.get('input[type="password"]').type('Yarikpassword')
    cy.get('button[type="submit"]').click()

    cy.contains('History').click()
    cy.contains('Add').click({force: true})
    cy.get('div.col>input').type('https://www.twitch.tv/',{force: true})
    cy.contains('Your URls').click({force: true}) // change focus
    cy.get('input[id="url"]').should('have.value','https://www.twitch.tv/')

    cy.get('input[id="url"]').clear({force: true})
    cy.get('input[id="url"]').type('https://www.twitch.tv/321',{force: true})
    cy.contains('Your URls').click({force: true}) // change focus

    cy.get('input[id="url"]').should('have.value','https://www.twitch.tv/321')

    cy.contains('X').click({force: true})
    cy.get('input[id="url"]').should('not.exist')
  })
})