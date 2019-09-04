beforeEach(() => {
  cy.visit('/blur-up/')
})

describe('smart phone', () => {
  beforeEach(() => {
    cy.viewport('iphone-3')
  })

  // TODO: finish
  it('renders smallest image', () => {
    cy.getTestElement(`image-fixed`)
      .find('picture:eq(1) img')
      .and(el => {
        const img = el[0]
      })
  })
})
