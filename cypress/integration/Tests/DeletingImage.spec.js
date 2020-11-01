/// <reference types="Cypress" />

const locators = require('../../fixtures/locators.json');
const user = require('../../fixtures/user.json');

context('Testing Deleting images from gallery', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';

    beforeEach('Logging in and creating gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2);
    })

    it('Deleting first image from gallery', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.DeleteImage.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.DeleteImage.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.DeleteImage.EditBtn).eq(1).click();
        cy.get(locators.DeleteImage.DeleteImageBtn).eq(0).click();
        cy.get(locators.DeleteImage.Submit).eq(0).click();
        cy.wait(500);
    })

    it('Deleting second image from gallery', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.DeleteImage.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.DeleteImage.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.DeleteImage.EditBtn).eq(1).click();
        cy.get(locators.DeleteImage.DeleteImageBtn).eq(3).click();
        cy.get(locators.DeleteImage.Submit).eq(0).click();
        cy.wait(500);
    })

    afterEach('Deleting gallery and cash', () => {
        cy.DeleteGallery();
        cy.clearLocalStorage();
    })

})