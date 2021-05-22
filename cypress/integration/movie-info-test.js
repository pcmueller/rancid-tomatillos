describe('Movie Info Page', () => {

  beforeEach(() => {
    // see: cypress/support/commands.js
    cy.stubSingleMovieData()
  });

  describe('Movie Info Loading', () => {

    it('Should display a loading page while fetching movie data', () => {
      cy.get('.message')
        .should('contain', 'Page Loading 🍿')
        .should('be.visible')
    });

    it('Should remove loading message once movies have loaded', () => {
      cy.get('.message').should('not.exist')
    });

  });

  describe('Movie Info Display', () => {

    it('Should render all data for the movie info display', () => {
      cy.get('.title').contains('Money Plane')
      .get('img').should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg')
      .get('section').should('have.css', 'background-image', 'url("https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg")')
      .get('.release-date').contains('September 29, 2020')
      .get('.overview').contains('A professional thief')
      .get('.genres').contains('Action')
      .get('.budget').contains('This information is unavailable')
      .get('.revenue').contains('This information is unavailable')
      .get('.runtime').contains(82)
      .get('.tagline').eq('')
      .get('.avg-rating').contains(6)
    });

  });

  describe('Return Home Click', () => {

    before(() => {
      cy.interceptAllMoviesData()
    });

    it('Should go back to main page view when the Return Home button is clicked', () => {

      cy.get('button').click()
        .url().should('eq', 'http://localhost:3000/')
        .get('.library').find('.movie-card').should('have.length', 1)
    });

  });

});
