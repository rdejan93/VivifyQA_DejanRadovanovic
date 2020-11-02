/// <reference types="Cypress" />

let user = require('../../fixtures/user.json');
import { authDelete } from '../../page_object/DeletingGalleryObject.js'

context('Testing Deleting Gallery with page object model on GalleryApp', () => {

    let title = 'Title';
    let description = 'Description';
    let image1 = 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg';
    let image2 = 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg';


    before('Logging in and creating Gallery', () => {
        cy.Login(user.email, user.password);
        cy.CreatingGalleryBackend(title, description, image1, image2)
    })

    it('Deleting Gallery with POM', () => {
        authDelete.deleteGallery()
    })

    after('Clear cache', () => {
        cy.clearLocalStorage();
    })

})