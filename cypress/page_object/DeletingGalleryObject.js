export default class AuthDelete {

    get myGalleries() {
        return cy.get('.nav-link').eq(1)
    }

    get galleryTitle() {
        return cy.get('.box-title').eq(0)
    }

    get deleteBtn() {
        return cy.get('.btn').eq(0)
    }

    deleteGallery() {
        this.myGalleries.click()
        this.galleryTitle.click()
        cy.wait(500);
        this.deleteBtn.click()
    }
}

export const authDelete = new AuthDelete()