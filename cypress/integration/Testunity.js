/// <reference types = "cypress" />

describe('Guru99 testcases', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('userdata.json').then(userdata => {
            this.userdata = userdata
        })
    })

    it.only('invalid login test', function () {

        cy.get('#email').type(this.username)
        cy.get('#password').type(this.wrongPassword)
        cy.contains('Log in').click()

        cy.get('span > b').should('have.text', 'Enter your Email address and password correct')//Invalid Login validation

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

    })


    it('Valid login test', function () {
        cy.visit('/')
        cy.get('#email').type('thakur.debabrata@yahoo.com')
        cy.get('#password').type(12345)
        cy.contains('Log in').click()

        cy.get('h4').should('have.text', 'thakur.debabrata@yahoo.com')// Login validation


    })

    it('Request Quatation', function () {
        cy.visit('//')
        cy.get('#email').type('thakur.debabrata@yahoo.com')
        cy.get('#password').type(12345)
        cy.contains('Log in').click()

        cy.get('#newquote').click().should('contain', 'Request Quotation')
        cy.get('#quotation_breakdowncover').select('Roadside').should('contain', 'Roadside')
        cy.get('#quotation_windscreenrepair_t').click().should('have.value', 'Yes')
        cy.get('#quotation_incidents').type('Accident near central park')
        cy.get('#quotation_vehicle_attributes_registration').type('KA-17W-7664')
        cy.get('#quotation_vehicle_attributes_mileage').type(40)
        cy.get('#quotation_vehicle_attributes_value').type(6700000)
        cy.get('#quotation_vehicle_attributes_parkinglocation').select('Private property')
        // cy.get('#quotation_vehicle_attributes_policystart_1i').select(2018)
        cy.get('#quotation_vehicle_attributes_policystart_2i').select('May')
        cy.get('#quotation_vehicle_attributes_policystart_3i').select(14)
        cy.get('.btn-default').click()


    })


    it('Edit Profile', function () {

        cy.visit('https://demo.guru99.com/insurance/v1/index.php')
        cy.get('#email').type('thakur.debabrata@yahoo.com')
        cy.get('#password').type(12345)
        cy.contains('Log in').click()

        cy.get('#ui-id-5').click()
        cy.get('#user_title').select('Mr')
        cy.get('#user_surname').type('Thakur')
        cy.get('#user_firstname').type('Debabrata')
        cy.get('#user_phone').type('8637282151')
        // cy.get('#user_dateofbirth_1i').select(1995)
        cy.get('#user_dateofbirth_2i').select('July')
        cy.get('#user_dateofbirth_3i').select(1)
        cy.get('#user_licencetype_t').click()
        cy.get('#user_dateofbirth_3i').select(3)
        cy.get('#user_occupation_id').select('Engineer')
        cy.get('#user_address_attributes_street').type('BTM')
        cy.get('#user_address_attributes_city').type('Bengaluru')
        cy.get('#user_address_attributes_county').type('India')
        cy.get('#user_address_attributes_postcode').type(560076)








    })


})