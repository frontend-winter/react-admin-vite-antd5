describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.get("[data-testid='title']").should(
      "contain.text",
      "Hello React + TypeScript + Vite"
    );
  });
});

export {};
