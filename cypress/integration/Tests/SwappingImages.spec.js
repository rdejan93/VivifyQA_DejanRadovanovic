/// <reference types="Cypress" />

let locators = require('../../fixtures/locators.json');
let user = require('../../fixtures/user.json');
context('Testing Swapping two Images on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';

    beforeEach('Logging in and creating gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2);
    })

    it('Swapping Images, first image down button', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.SwappingImages.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.SwappingImages.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.SwappingImages.Button).eq(1).click();
        cy.get(locators.SwappingImages.SwapBtn).eq(2).click();
        cy.get(locators.SwappingImages.Button).eq(0).click();
        cy.wait(500);
        cy.get(locators.SwappingImages.SlideBtn1).click();
        cy.get(locators.SwappingImages.SlideImage).eq(0).should('have.attr', 'src').and('eq', image2);
    })

    it('Swapping Images, second image up button', () => {
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/my-galleries?page=1&term=').as('load');
        cy.get(locators.SwappingImages.NavBarBtns).eq(1).click();
        cy.wait('@load');
        cy.get(locators.SwappingImages.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.SwappingImages.Button).eq(1).click();
        cy.get(locators.SwappingImages.SwapBtn).eq(4).click();
        cy.get(locators.SwappingImages.Button).eq(0).click();
        cy.wait(500);
        cy.get(locators.SwappingImages.SlideBtn1).click();
        cy.get(locators.SwappingImages.SlideImage).eq(0).should('have.attr', 'src').and('eq', image2);
    })

    afterEach('Deleting gallery and cache', () => {
        cy.DeleteGallery();
        cy.clearLocalStorage();
    })
})