beforeEach(() => {
  cy.visit(`/`).waitForRouteChange()
})

it(`has some images`, () => {
  cy.get('img').should('have.length', 2)
})

// TODO: vary cypress viewport
// common device names; phone, tablet, and desktop