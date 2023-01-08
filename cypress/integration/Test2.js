/// <reference types = "cypress" />
/// <reference types = "cypress-iframe" />

import 'cypress-iframe'


describe('sedond case', function(){
    it('second case', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('select').select('option2').should('have.value', 'option2')
        cy.get('#autocomplete').type('india')
        cy.get('#alertbtn').click()
        cy.on('window:alert', (str)=> 
        {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        cy.get('#opentab').invoke('removeAttr','target').click()
        cy.url().should('include','https://www.rahulshettyacademy.com/')
        cy.go('back')
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains('Top').click()


        /////iframe

        cy.frameLoaded('#courses-iframe')
        cy.iframe('.dropdown-toggle').click()
    })
})
