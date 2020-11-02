/// <reference types="Cypress" />

let locators = require('../../../fixtures/locators.json');
let user = require('../../../fixtures/user.json');

context('Testing adding comment on other users gallery', () => {

    let title1 = 'asd';
    let title = 'Title';
    let description = 'Description';
    let comment = 'Nice gallery'
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';
    let image3 = 'https://www.planetware.com/photos-large/I/italy-colosseum-day.jpg';
    let image4 = 'https://www.planetware.com/photos-large/IND/india-top-attractions-taj-mahal.jpg';

    before('Logging in and creating galleries', () => {
        cy.Login(user.email1, user.password);
        cy.CreatingGalleryBackend(title1, description, image3, image4);
        cy.contains('Logout').click();
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2);
        cy.AddingComment(title1, comment);
    })

    it('Deleting comment on other users gallery', () => {
        cy.get(locators.Comment.SearchBar).type(title1);
        cy.get(locators.Comment.Submit).eq(0).click();
        cy.wait(1000);
        cy.get(locators.Comment.GalleryTitle).eq(0).click();
        cy.wait(500);
        cy.get(locators.Comment.DeleteBtn).click();
        cy.get(locators.Comment.ValidComment).should('not.exist');
    })

    after('Deleting Galleries', () => {
        cy.DeleteGallery();
        cy.contains('Logout').click();
        cy.wait(500);
        cy.Login(user.email1, user.password);
        cy.DeleteGallery();
        cy.clearLocalStorage();
    })

})
