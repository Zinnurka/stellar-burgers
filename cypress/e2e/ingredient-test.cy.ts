import { testUrl, ingredientName2 } from './constants';

describe('Тест выбора ингридиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.visit(testUrl);
  });
  it('Добавление ингридиента в конструктор', () => {
    cy.get('[data-cy=ingredient-2').within(() => {
      cy.get('button').click();
    });
    cy.get('[data-cy="bun-ingredient-2"]')
      .should('exist')
      .within(() => {
        cy.get('.constructor-element__text').should('contain', ingredientName2);
      });
  });
  it('Открытие модального окна и закрытие через кнопку', () => {
    cy.get('[data-cy=ingredient-2').click();
    cy.get('[data-cy="modal"]')
      .should('exist')
      .within(() => {
        cy.get('h3').should('contain', ingredientName2);
      });
    cy.get('[data-cy="closeModal"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('Открытие модального окна и закрытие через оверлей', () => {
    cy.get('[data-cy=ingredient-2').click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modalOverlay"]').click('top', { force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
