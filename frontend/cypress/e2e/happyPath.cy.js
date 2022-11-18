describe('user happy path', () => {
  it('should navigate to home screen successfully', () => {
    cy.visit('localhost:3000');
    cy.url().should('include', 'localhost:3000');
  })
  it('should navigate to the login screen successfully', () => {
    cy.get('button[role="loginButton"]')
      .click();
    cy.url().should('include', 'localhost:3000/Login');
  })
  it('should navigate to the register screenrsuccessfully', () => {
    cy.get('button[role="singUp"]')
      .click();
    cy.url().should('include', 'localhost:3000/Register');
  })
  it('should register successfully', () => {
    cy.get('input[id="name"]')
      .focus()
      .type('test');
    cy.get('input[id="email"]')
      .focus()
      .type('testCAYYACY@mail.com');
    cy.get('input[name="PW"]')
      .focus()
      .type('1234');
    cy.get('input[name="checkPW"]')
      .focus()
      .type('1234');
    cy.get('button[role="signUp"]')
      .click();
    cy.url().should('include', 'localhost:3000/Landing');
  })
  it('should navigate to the create listing screenrsuccessfully', () => {
    cy.get('[role="profile"]')
      .click();
    cy.get('[role="create"]')
      .click();
    cy.url().should('include', 'localhost:3000/Create-Listing');
  })
  it('should create listing screenrsuccessfully', () => {
    cy.get('[id="create-title"]')
      .focus()
      .type('Test Create');
    cy.get('[id="create-price"]')
      .focus()
      .type('100');
    cy.get('[id="create-address"]')
      .focus()
      .type('Test');
    cy.get('[id="thumbnailLabel"]')
      .click();
    cy.get('input[id="thumbnailUpload"]')
      .selectFile('src/Assets/listing1.jpeg', {force: true});
    cy.get('[id="creatListing"]')
      .click();
    cy.url().should('include', 'localhost:3000/User-Listings');
  })
  it('should publishing successfully', () => {

  })
  it('should unpublishing successfully', () => {
    
  })
})