/// <reference types="cypress" />

describe('the password reset form', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/')
  })

  it('displays correct initial state', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert
    cy.get('form button').should('be.disabled')

    // cy.get('ul.form-instructions li').first().contains('🔘').should('exist')
    cy.get('ul.form-instructions li').each(el => {
        expect(el).to.contain('🔘')
        // contains('🔘').should('exist')
    })
  })
})
