import { testUrl, refreshToken, accessToken } from './constants';

describe('Тест оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as('order');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'login.json' }).as(
      'login'
    );
    cy.visit(testUrl);
    cy.setCookie('accessToken', accessToken);
    window.localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
  });
  it('Оформление заказа', () => {
    cy.get('[data-cy="bun-top"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="select-ingredient"]').should(
      'contain',
      'Выберите начинку'
    );
    cy.get('[data-cy=ingredient-1').within(() => {
      cy.get('button').click();
    });
    cy.get('[data-cy=ingredient-2').within(() => {
      cy.get('button').click();
    });
    cy.get('[data-cy=ingredient-3').within(() => {
      cy.get('button').click();
    });
    cy.get('[data-cy="orderButton"]').click();
    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', { ingredients: ['2', '3', '1', '1'] });
    cy.get('[data-cy="orderNumber"]').should('contain', '47699');
    cy.get('[data-cy="closeModal"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.reload();
    cy.get('[data-cy="bun-top"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="select-ingredient"]').should(
      'contain',
      'Выберите начинку'
    );
  });
});
