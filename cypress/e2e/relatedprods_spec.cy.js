describe("My Outfits", () => {
  it('User can add to and see their outfit', () => {
    // user visits page
    cy.visit('/client/dist/index.html');
    cy.wait(500);
    // user sees "your outfit" section on page
    cy.findByRole('heading', { name: "Your Outfit" });
    // user can add current product to outfit
    cy.findByRole('button', { name: "+Add to Outfit" }).click();
    // user will see current product in My Outfit section
    cy.get('[class = "sc-lbbesr-2 iXmusV"]').within(() => {
      cy.get('[id = "carousel-related"]').should('exist');
    });
    // user can delete product
    // user will see it removed from My Outfit

  });
});

// describe("Related Products", () => {
//   it('User can view and click on related products', () => {
//     // user visits page
//     cy.visit('/client/dist/index.html');
//     // user sees "related products" section on page
//     cy.findByRole('heading', { name: "Related Products" });
//       // user sees related products
//       // user can click on product and view its product page
//   });

//   it('User can compare related products', () => {
//     // user visits page
//     cy.visit('/client/dist/index.html');
//     // user can click star to compare products
//     cy.findByRole('button', { name: "", class: "sc-re0cl0-1 drNFft" }).click;
//     cy.findByRole('button', { name: "modal" })
//   });
// });

