/// <reference types="Cypress" />

let locators = require('../../fixtures/locators.json');
let user = require('../../fixtures/user.json');

context('Testing Search on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';

    beforeEach('Logging in and creating gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2);
    })


    it('Searching for existing gallery', () => {
        cy.get(locators.Search.SearchBar).type(title);
        cy.get(locators.Search.Filter).eq(0).click();
        cy.wait(1000);
        cy.get(locators.Search.GalleryTitle).eq(0).should('include.text', title);
    })

    it('Searching for non-existing gallery', () => {
        cy.get(locators.Search.SearchBar).type('Dejan Radovanovic');
        cy.get(locators.Search.Filter).eq(0).click();
        cy.wait(1000);
        cy.get(locators.Search.Message).should('include.text', 'No galleries found')
    })

    after('Deleting Gallerie', () => {
        cy.DeleteGallery(title);
        cy.clearLocalStorage();
    })

})