/// <reference types="Cypress" />

let locators = require('../../fixtures/locators.json');
let user = require('../../fixtures/user.json');

context('Testing Deleting Gallery on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';


    before('Logging in and creating Gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2)
    })

    it('Deleting Gallery as a user', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.DeleteGallery.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.DeleteGallery.GalleryTitle).eq(0).click();
        cy.get(locators.DeleteGallery.GalleryPageTitle).should('have.text', title);
        cy.get(locators.DeleteGallery.DeleteBtn).eq(0).click();
    })

    after('Clear cash', () => {
        cy.clearLocalStorage();
    })

})