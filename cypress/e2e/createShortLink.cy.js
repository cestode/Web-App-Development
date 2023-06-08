describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000')
    let inp = cy.get('input[id="originalLink"]')
    inp.type('https://www.twitch.tv/',{force: true})
    cy.get('button[id = "shortenButton"]').click({force: true})
    cy.get('h2[id="resultLink]"').should("not.eq","")
  })
})