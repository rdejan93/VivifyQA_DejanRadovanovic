/// <reference types="Cypress" />

let locators = require('../../../fixtures/locators.json');
let user = require('../../../fixtures/user.json');

context('Testing deleting own comment on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';
    let comment = 'My favorite'

    before('Logging in and creating gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2);
        cy.visit('/my-galleries');
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.get(locators.Comment.TextArea).type(comment);
        cy.get(locators.Comment.Submit).eq(2).click();
        cy.wait(500);
    })

    it('Deleting own comment from users Gallery', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.Comment.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.Comment.DeleteBtn).eq(0).click();
        cy.get(locators.Comment.ValidComment).should('not.exist');
    })

    afterEach('Deleting gallery and cache', () => {
        cy.DeleteGallery();
        cy.clearLocalStorage();
    })
})