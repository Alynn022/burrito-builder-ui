describe('User Flow', () => {
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
    it('user should be able to build a burrito', () => {
      cy.get('h1').should('have.text', 'Burrito Builder')
      .get('input').type('Lynn')
      .get('button').contains('beans').click()
      .get('button').contains('carnitas').click()
      .get('p').should('have.text', 'Order: beans, carnitas')
      .intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: 
        {
          orders: 
          [{ 
            "id":1,
            "name":"Lynn",
            "ingredients":["beans","carnitas"]
          }]
        }
      })
      .get('button').contains('Submit Order').click()
      .get('h3').contains('Lynn').should('exist')
      .get('.ingredient-list').contains('beanslettuce').should('exist')
    })
})