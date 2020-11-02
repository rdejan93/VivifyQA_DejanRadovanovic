/// <reference types="Cypress" />

let locators = require('../../../fixtures/locators.json');
let user = require('../../../fixtures/user.json');

context('Testing adding invalid Comments on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';
    let comment = 'My favorite'

    beforeEach('Logging in and creating gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2);
    })

    it('Adding comment with no caracters entered', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.Comment.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.Comment.Submit).eq(2).click();
        cy.get(locators.Comment.TextArea).children().then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Adding comment with blank text added', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.Comment.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.Comment.TextArea).type(' ');
        cy.get(locators.Comment.Submit).eq(2).click();
        cy.get(locators.Comment.Alert).should('exist').and('have.text', 'The body field is required.')
    })

    it('Adding too long comment', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.Comment.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.Comment.TextArea).type(comment.repeat(100));
        cy.get(locators.Comment.Submit).eq(2).click();
        cy.get(locators.Comment.Alert).should('exist').and('have.text', 'The body may not be greater than 1000 characters.')
    })

    it('Adding valid comment on users own Gallery', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.Comment.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.Comment.TextArea).type(comment);
        cy.get(locators.Comment.Submit).eq(2).click();
        cy.get(locators.Comment.ValidComment).should('exist').and('include.text', comment);
    })

    afterEach('Deleting gallery and cache', () => {
        cy.DeleteGallery();
        cy.clearLocalStorage();
    })
})
