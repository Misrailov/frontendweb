describe("collections test", () =>{
    beforeEach(() => {
        cy.login();
    });
    it("show collections ", () =>{  
    
       

        cy.visit('localhost:3000/mybooks')
        cy.get('[data-cy=collections]').should('be.visible')
        cy.get('[data-cy=collection]').should('be.visible')
        cy.get('[data-cy=seeAllButton]').first().click()

    })
    it("Create a book Collection", () =>{
        cy.visit('localhost:3000/createCollection')
        cy.get('[data-cy=createBookInfo]').should('be.visible')
        cy.get('[data-cy=bookCollectionName]').type('test')
        cy.get('[data-cy=bookCollectionImgLink]').type('test')
        cy.get('[data-cy=bookCollectionDescription]').type('test')
        cy.get('[data-cy=bookCollectionSubmit]').click()
        
    })
})