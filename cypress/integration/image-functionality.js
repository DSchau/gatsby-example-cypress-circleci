const imageId = `gatsby-image`

describe(`Production gatsby-image`, () => {
  beforeEach(() => {
    cy.visit(`/blur-up/`).waitForRouteChange()
  })

  it(`renders an alt tag`, () => {
    cy.getTestElement(imageId)
      .find(`picture img`)
      .should(`have.attr`, `alt`)
      .and(`contains`, `Plant with leaves`)
  })

  describe(`wrapping elements`, () => {
    describe(`outer div`, () => {
      it(`exists`, () => {
        cy.getTestElement(imageId)
          .find(`.gatsby-image-wrapper`)
          .its(`length`)
          .should(`eq`, 1)
      })

      it(`contains position fixed`, () => {
        cy.getTestElement(imageId)
          .find(`.gatsby-image-wrapper`)
          .should(`have.attr`, `style`)
          .and(`contains`, `position: fixed`)
      })
    })
  })

  describe(`fallback image`, () => {
    it(`renders base-64 src`, () => {
      cy.getTestElement(imageId)
        .find(`.gatsby-image-wrapper img`)
        .should(`have.attr`, `src`)
        .and(`contains`, `base64`)
    })

    it(`renders with style`, () => {
      cy.getTestElement(imageId)
        .find(`.gatsby-image-wrapper img`)
        .should(`have.attr`, `style`)
    })

    it(`swaps opacity to 0`, () => {
      cy.getTestElement(imageId)
        .find(`.gatsby-image-wrapper img`)
        .should(`have.attr`, `style`)
        .and(`contains`, `opacity: 0`)
    })
  })

  it(`renders picture tags`, () => {
    cy.getTestElement(imageId)
      .find(`picture`)
      .its(`length`)
      .should(`eq`, 1)
  })

  it(`applies inline style to img`, () => {
    cy.getTestElement(imageId)
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
      cy.getTestElement(imageId)
        .find(`noscript`)
        .its(`length`)
        .should(`eq`, 1)
    })

    it(`renders string content with picture tag`, () => {
      cy.getTestElement(imageId)
        .find(`noscript`)
        .and(noscript => {
          const content = noscript[0].textContent
          expect(content).to.contain(`<picture>`)
        })
    })
  })
})
