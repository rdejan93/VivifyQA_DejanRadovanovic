/// <reference types="Cypress" />

const locators = require('../../fixtures/locators.json');
const user = require('../../fixtures/user.json');

context('Testing Creating Gallery as a user', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';

    beforeEach('Login', () => {
        cy.Login(user.email, user.password);
        cy.visit('/create')
    })

    it('Creating Gallery with title and one image entered', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.Images).eq(2).type(image1);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('creatingGallery');
        cy.wait('@creatingGallery');
    })

    it('Creating Gallery with all fields entered', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.Description).type(description);
        cy.get(locators.Create.Images).eq(2).type(image1);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('creatingGallery');
        cy.wait('@creatingGallery');
    })

    it('Creating Gallery with title and two images', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.AddImageBtn).eq(2).click();
        cy.get(locators.Create.Images).eq(2).type(image1)
        cy.get(locators.Create.Images).eq(3).type(image2);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.server();
        cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('creatingGallery');
        cy.wait('@creatingGallery');
    })

    it('Creating Gallery with title, description and two images', () => {
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
})

afterEach('Deleting Gallery and cache', () => {
    cy.DeleteGallery();
    cy.clearLocalStorage();
})
