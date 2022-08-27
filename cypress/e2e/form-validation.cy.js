
describe('Form validation test', () => {
  it('Submit empty form to display the error message', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('form').submit();

    cy.get('.alert-danger')
        .should('have.class', 'error')
        .invoke('text')
        .should('equal', 'All fields are required')
  });

  it('Submit form and create new appointment', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('#brand').type('BMW');
    cy.get('#owner').type('Jonh Doe');
    cy.get('#telephone').type('123456');
    cy.get('#date').type('2022-11-11');
    cy.get('#time').type('11:11');
    cy.get('#description').type('Hello world!');
    
    cy.get('form').submit();

    cy.get('.alert-success');
    cy.get('#appointment-list');
  });

  it('Edit an appointment', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('#appointment-list > div > .btn-info').click();

    cy.get('#brand').clear().type('Audi');

    cy.get(':nth-child(8) > .btn').click();

    cy.get('#appointment-list > div > h2')
      .invoke('text')
      .should('equal', 'Audi');
  });

  it('Delete an appoinment', () => {
    cy.get('.btn-danger').click();
    cy.get('#appoinment-list').should('have.length', 0);
  });


})