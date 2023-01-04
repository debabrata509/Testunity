/// <reference types = "cypress" />

let testData;
let wrapNumber;
describe('Guru99 testcases', () => {

    beforeEach(() => {
        cy.viewport(1536, 960)
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('https://demo.guru99.com/insurance/v1/index.php')
        cy.fixture('example.json').then(userdata => {
            testData = userdata

        })

    })

    it('Invalid login test', function () {

        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.wrongPassword)
        cy.contains('Log in').click()
        cy.get('span > b').should('have.text', 'Enter your Email address and password correct')
    })




    it('Valid login test', function () {

        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.password)
        cy.contains('Log in').click()

        cy.get('h4').should('have.text', 'thakur.debabrata@yahoo.com')// Login validation


    })

    it('Request Quatation', function () {

        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.password)
        cy.contains('Log in').click()

        let date = '2016'
        cy.get('#newquote').click().should('contain', 'Request Quotation')
        cy.get('#quotation_breakdowncover').select('Roadside').should('contain', 'Roadside')
        cy.get('#quotation_windscreenrepair_t').click().should('have.value', 'Yes')
        cy.get('#quotation_incidents').type('Accident near central park')
        cy.get('#quotation_vehicle_attributes_registration').type('KA-17W-7664')
        cy.get('#quotation_vehicle_attributes_mileage').type(40)
        cy.get('#quotation_vehicle_attributes_value').type(6700000)
        cy.get('#quotation_vehicle_attributes_parkinglocation').select('Private property')
        cy.get('#quotation_vehicle_attributes_policystart_1i').select(date, { force: true })
        cy.get('#quotation_vehicle_attributes_policystart_2i').select('May')
        cy.get('#quotation_vehicle_attributes_policystart_3i').select(14)
        cy.get('.btn-default').click()
        cy.get('#new_quotation > .actions > .btn-success').click()
        

    })

    it('Retrive Quatation', function () {
        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.password)
        cy.contains('Log in').click()
        cy.get('#ui-id-3').click().should('contain', 'Retrieve Quotation')
        cy.get('form > [type="text"]').type(19935)
        cy.get('#getquote').click()
        cy.get('body > table > tbody >tr').should('have.length', 10)
        cy.get('body > table > tbody >tr:eq(0)>td').should('have.length', 2)

        //assert user_id from table 
        cy.get('body > table > tbody >tr').eq(3).within(() => {
            cy.get('td').last().should('contain.text', '49936')
        })
    })


    it('Edit Profile', function () {

        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.password)
        cy.contains('Log in').click()

        let year = '1995'
        cy.get('#ui-id-5').click()
        cy.get('#user_title').select('Mr')
        cy.get('#user_surname').type('Thakur')
        cy.get('#user_firstname').type('Debabrata')
        cy.get('#user_phone').type('8637282151')
        cy.get('#user_dateofbirth_1i').select(year, { force: true })
        cy.get('#user_dateofbirth_2i').select('July')
        cy.get('#user_dateofbirth_3i').select(1)
        cy.get('#user_licencetype_t').click()
        cy.get('#user_dateofbirth_3i').select(3)
        cy.get('#user_occupation_id').select('Engineer')
        cy.get('#user_address_attributes_street').type('BTM')
        cy.get('#user_address_attributes_city').type('Bengaluru')
        cy.get('#user_address_attributes_county').type('India')
        cy.get('#user_address_attributes_postcode').type(560076)
        //cy.get('#edit_user_ > .actions > .btn').click()// Button is not working
    })


    it('Visit Profile', function () {
        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.password)
        cy.contains('Log in').click()

    })


    it('Logout', function () {
        cy.get('#email').type(testData.username)
        cy.get('#password').type(testData.password)
        cy.contains('Log in').click()

        cy.get('.button_to > .btn').click()
        cy.url().should('eq', "https://demo.guru99.com/insurance/v1/index.php")

    })


})