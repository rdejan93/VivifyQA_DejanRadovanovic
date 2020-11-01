/// <reference types="Cypress" />

const locators = require('../../fixtures/locators.json');
const user = require('../../fixtures/user.json');

context('Testing Creating Gallery with invalid data on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description'
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let imageWrong = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQC9a5JzhE_hSzIj1xERr5zCjqSL9ZwhqQF4g&usqp=CAU';


    beforeEach('Login', () => {

        cy.Login(user.email, user.password);
        cy.visit('/create');
    })

    it('Testing Create Gallery button', () => {
        cy.get(locators.Create.NavBarBtns).eq(2).click();
        cy.url().should('include', '/create');
    })

    it('Testing Creating Gallery with no fields entered', () => {
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Title).then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Testing Creating Gallery with only title entered', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Images).then(($input) => {
            expect($input[2].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Testing Creating Gallery with only description entered', () => {
        cy.get(locators.Create.Description).type(description);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Title).then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Testing Creating Gallery with only image entered', () => {
        cy.get(locators.Create.Images).eq(2).type(image1);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Title).then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Creating Gallery with Title and Description entered', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.Description).type(description);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Images).then(($input) => {
            expect($input[2].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Creating Gallery with Description and Image entered', () => {
        cy.get(locators.Create.Description).type(description);
        cy.get(locators.Create.Images).eq(2).type(image1);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Title).then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        })
    })

    it('Creating Gallery with image field not URL', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.Description).type(description);
        cy.get(locators.Create.Images).eq(2).type(title);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Images).then(($input) => {
            expect($input[2].validationMessage).to.eq('Please enter a URL.');
        })
    })

    it('Creating Gallery with wrong image url', () => {
        cy.get(locators.Create.Title).type(title);
        cy.get(locators.Create.Description).type(description);
        cy.get(locators.Create.Images).eq(2).type(imageWrong);
        cy.get(locators.Create.Submit).eq(0).click();
        cy.get(locators.Create.Alert).should('exist').and('have.text', 'Wrong format of image')
    })

    afterEach('Clear cache', () => {
        cy.clearLocalStorage();
    })


})