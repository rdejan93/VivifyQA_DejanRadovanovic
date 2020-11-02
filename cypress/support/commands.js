// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('Login', (email, password) => {

    const locators = require('../fixtures/locators.json');

    cy.visit('/login');
    cy.get(locators.Login.Email).type(email);
    cy.get(locators.Login.Password).type(password);
    cy.get(locators.Login.Submit).click();
    cy.server();
    cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('logedin');
    cy.wait('@logedin');
    cy.contains('Logout').should('exist');
})

Cypress.Commands.add('LoginBackend', (email, password) => {

    cy.visit('/');
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/auth/login',
        form: true,
        followRedirect: true,
        body: {
            email: email,
            password: password
        }
    }).then((resp) => {
        expect(resp.body).to.have.property('access_token');
        localStorage.setItem('token', resp.body.access_token);
    })
    cy.visit('/');
})

Cypress.Commands.add('CreatingGallery', (title, description, image1, image2) => {

    const locators = require('../fixtures/locators.json');

    cy.visit('/create');
    cy.get(locators.Create.Title).type(title);
    cy.get(locators.Create.Description).type(description);
    cy.get(locators.Create.AddImageBtn).eq(2).click();
    cy.get(locators.Create.Images).eq(2).type(image1)
    cy.get(locators.Create.Images).eq(3).type(image2);
    cy.get(locators.Create.Submit).eq(0).click();
    cy.server();
    cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('creatingGallery');
    cy.wait('@creatingGallery');
})

Cypress.Commands.add('CreatingGalleryBackend', (title, description, image1, image2) => {

    cy.visit('/');
    cy.request({
        method: 'POST',
        url: 'https://gallery-api.vivifyideas.com/api/galleries',
        form: true,
        followRedirect: true,
        body: {
            title: title,
            description: description,
            images: [image1, image2]
        },
        headers: {
            authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    })

})

Cypress.Commands.add('AddingComment', (title, comment) => {

    const locators = require('../fixtures/locators.json');

    cy.get(locators.Comment.SearchBar).type(title);
    cy.get(locators.Comment.Submit).eq(0).click();
    cy.wait(500);
    cy.get(locators.Comment.GalleryTitle).eq(0).click();
    cy.wait(500);
    cy.get(locators.Comment.TextArea).type(comment);
    cy.get(locators.Comment.Submit).eq(0).click();
    cy.visit('/');
})
Cypress.Commands.add('DeleteGallery', () => {

    const locators = require('../fixtures/locators.json');

    cy.visit('/my-galleries');
    cy.get(locators.DeleteGallery.GalleryTitle).eq(0).click();
    cy.wait(500);
    cy.get(locators.DeleteGallery.DeleteBtn).eq(0).click();
    cy.wait(500);
})