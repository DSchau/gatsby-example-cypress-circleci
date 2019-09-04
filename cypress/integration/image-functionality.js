const fixedImageId = `image-fixed`

describe(`Production gatsby-image`, () => {
  beforeEach(() => {
    cy.visit(`/blur-up/`).waitForRouteChange()
  })

  it(`renders an alt tag`, () => {
    cy.getTestElement(fixedImageId)
      .find(`picture:eq(1) img`)
      .should(`have.attr`, `alt`)
      .and(`contains`, `Pug with hoodie`)
  })

  describe(`wrapping elements`, () => {
    describe(`outer div`, () => {
      it(`exists`, () => {
        cy.getTestElement(fixedImageId)
          .find(`.gatsby-image-wrapper`)
          .its(`length`)
          .should(`eq`, 1)
      })

      it(`contains position relative`, () => {
        cy.getTestElement(fixedImageId)
          .find(`.gatsby-image-wrapper`)
          .should(`have.attr`, `style`)
          .and(`contains`, `position: relative`)
      })
    })
  })

  describe(`fallback image`, () => {
    it(`renders base-64 src`, () => {
      cy.getTestElement(fixedImageId)
        .find(`.gatsby-image-wrapper img`)
        .should(`have.attr`, `src`)
        .and(`contains`, `base64`)
    })

    it(`renders with style`, () => {
      cy.getTestElement(fixedImageId)
        .find(`.gatsby-image-wrapper img`)
        .should(`have.attr`, `style`)
    })

    it(`swaps opacity to 0`, () => {
      cy.getTestElement(fixedImageId)
        .find(`.gatsby-image-wrapper img`)
        .should(`have.attr`, `style`)
        .and(`contains`, `opacity: 0`)
    })
  })

  it(`renders picture tags`, () => {
    cy.getTestElement(fixedImageId)
      .find(`picture`)
      .its(`length`)
      .should(`eq`, 2)
  })

  it(`applies inline style to img`, () => {
    cy.getTestElement(fixedImageId)
      .find(`picture > img`)
      .should(`have.attr`, `style`)
      .and(style => {
        const split = style
          .split(`;`)
          .map(part => part.trim())
          .filter(Boolean)
        expect(split).to.include.members([
          `position: absolute`,
          `top: 0px`,
          `left: 0px`,
          `width: 100%`,
          `height: 100%`,
          `object-fit: cover`,
        ])
      })
  })

  describe(`noscript`, () => {
    it(`exists`, () => {
      cy.getTestElement(fixedImageId)
        .find(`noscript`)
        .its(`length`)
        .should(`eq`, 1)
    })

    it(`renders string content with picture tag`, () => {
      cy.getTestElement(fixedImageId)
        .find(`noscript`)
        .and(noscript => {
          const content = noscript[0].textContent
          expect(content).to.contain(`<picture>`)
        })
    })
  })
})
