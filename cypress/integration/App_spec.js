describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      body: 
      {
        orders: 
        [{ 
          "id":1,
          "name":"Pat",
          "ingredients":["beans","lettuce","carnitas","queso fresco","jalapeno"]
        }]
      }
    })
    .visit('http://localhost:3000/')
  })
  
  it('should show the home page with Burrito Builder', () => {
    cy.get('h1').should('have.text', 'Burrito Builder')
    .get('input').should('exist')
    .get('button').contains('beans').should('exist')
    .get('button').contains('steak').should('exist')
    .get('button').contains('carnitas').should('exist')
    .get('button').contains('sofritas').should('exist')
    .get('button').contains('lettuce').should('exist')
    .get('button').contains('queso fresco').should('exist')
    .get('button').contains('pico de gallo').should('exist')
    .get('button').contains('hot sauce').should('exist')
    .get('button').contains('guacamole').should('exist')
    .get('button').contains('jalapenos').should('exist')
    .get('button').contains('cilantro').should('exist')
    .get('button').contains('sour cream').should('exist')
    .get('p').should('have.text', 'Order: Nothing selected')
  })

  it('should display stubbed data order in correct format', () => {
    cy.get('h3').should('have.text', 'Pat')
    .get('.ingredient-list').should('exist')
    .get('li').should('have.text', 'beanslettucecarnitasqueso frescojalapeno')
  })
})