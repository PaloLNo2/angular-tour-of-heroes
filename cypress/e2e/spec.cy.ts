

beforeEach(() => {

  cy.visit('/')

})


describe('Dashboard-Navigation', () => {
  it('Navigation', () => {
      
   
    cy.get('[class="heroes-menu"]').children().eq(0).click()
        
        
    cy.get('app-hero-detail')
        .should('contain','Details')
        .should('contain','id')
    cy.get('button').contains('go back').should('exist')
    cy.get('button').contains('save').should('exist')
        
        
    cy.get('button').contains('go back').click()
    cy.contains('Top Heroes').should('exist')


    cy.get('[class="heroes-menu"]').children().eq(0).click()


    cy.get('button').contains('save').click()
    cy.contains('Top Heroes').should('exist') 
  })

})

describe('Dashboard-Top heroes', () => {
  it('Hero1', () => {
    
    cy.get('[class="heroes-menu"]').children().eq(0).click()
    cy.get('app-hero-detail')
        .should('contain','Details')
        .should('contain','id')
    cy.get('button').contains('go back').should('exist')
    cy.get('button').contains('save').should('exist')


    cy.get('app-messages')
        .children()
        .children()
        .last()
        .should('contain', 'fetched hero id=')
    
    
    cy.get('#hero-name').type('r')
    cy.get('button').contains('save').click()
    cy.get('[class="heroes-menu"]').children().eq(0).should('contain','Bombastor')


    cy.get('app-messages')
        .children()
        .children()
        .last()
        .prev()
        .should('contain', 'updated hero id')


    cy.get('[class="heroes-menu"]').children().eq(0).click()
    cy.get('#hero-name').type('r')
    cy.get('button').contains('go back').click()
    cy.get('[class="heroes-menu"]').children().eq(0).should('not.contain','Bombastorr')

  })

  it('Top heroes changes', () => {
    
    cy.get('[ng-reflect-router-link="/heroes"]').click()


    cy.contains('Bombasto').next('button').click()
    
    
    cy.get('[ng-reflect-router-link="/dashboard"]').click()
    
    
    cy.get('[class="heroes-menu"]').children().eq(0).should('not.contain','Bombasto')

  })
})

describe('Dashboard-Hero Search', () => {
    it('Hero Search', () => {
      
      cy.get('#search-box').type('n')
      cy.get('.search-result').children().should('exist')
      cy.contains('Dr. Nice').should('exist')
      cy.contains('Magneta').should('exist')
      cy.contains('RubberMan').should('exist')
      cy.contains('Dynama').should('exist')
      cy.contains('Tornado').should('exist')
  
  
      cy.get('app-messages')
          .children()
          .children()
          .last()
          .should('contain', 'found heroes matching "n"')
  

      cy.contains('Tornado').click()
      cy.get('app-hero-detail')
          .should('contain','Details')
          .should('contain','id')
      cy.get('button').contains('go back').should('exist')
      cy.get('button').contains('save').should('exist')
  

      cy.get('app-messages')
      .children()
      .children()
      .last()
      .should('contain', 'fetched hero id=20')
  

      cy.get('button').contains('go back').click()
  

      cy.get('#search-box').type('Mar')
      cy.get('.search-result').children().should('not.exist')
  

      cy.get('app-messages')
      .children()
      .children()
      .last()
      .should('contain', 'no heroes matching "Mar"')


    })
  
  })

describe('Dashboard-Messages', () =>{
  it('Clear Messages', () => {
   
    cy.get('app-messages')
        .children()
        .children()
        .last()
        .should('exist')
   
   
    cy.get('button')
        .contains('Clear messages')
        .click()


    cy.contains('HeroService').should('not.exist')
  })
})


describe('Heroes list-Navigation', () => { 
  it('Navigation-hero1', () => {
    
    cy.get('[ng-reflect-router-link="/heroes"]').click()
    
    
    cy.get('.heroes').children().first().click()


    cy.get('app-hero-detail')
    .should('contain','Details')
    .should('contain','id')
    cy.get('button').contains('go back').should('exist')
    cy.get('button').contains('save').should('exist')


    cy.get('button').contains('go back').click()
    cy.contains('My Heroes').should('exist')


    cy.get('.heroes').children().first().click()
   
   
    cy.get('button').contains('save').click()
    cy.contains('My Heroes').should('exist')

  })
})

describe('Heroes list-Add/delete hero',() => {
  it('Add/delete hero', () => {

    cy.get('[ng-reflect-router-link="/heroes"]').click()


    cy.get('#new-hero').type('Aladin')
    cy.get('.add-button').click()


    cy.get('.heroes').children().last().should('contain','Aladin')


    cy.get('app-messages')
        .children()
        .children()
        .last()
        .should('contain', 'added hero w/ id=21')


    cy.get('[ng-reflect-router-link="/dashboard"]').click()
    cy.get('#search-box').type('Alad')
    cy.contains('Aladin').should('exist')


    cy.get('[ng-reflect-router-link="/heroes"]').click()


    cy.get('.heroes').children().last().should('contain','Aladin').find('button').click()


    cy.get('.heroes').children().should('not.contain','Aladin')


    cy.get('app-messages')
    .children()
    .children()
    .last()
    .should('contain', 'deleted hero id=21')


    cy.get('#new-hero').type('Aldo')


    cy.get('.add-button').click()


    cy.get('.heroes').children().last().should('contain','Aldo').click()


    cy.contains('id:').parents().should('contain','21')


  })
})

/* This is it! */



