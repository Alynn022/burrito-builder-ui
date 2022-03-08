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
  })
})