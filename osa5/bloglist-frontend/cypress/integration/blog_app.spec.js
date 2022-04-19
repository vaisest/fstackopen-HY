// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { click } from "@testing-library/user-event/dist/click";
import { createIndexes } from "../../../../osa4/blogilista/models/blog";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "asder",
      name: "asder asderman",
      password: "asdasd123",
    });
    cy.visit("http://localhost:3000");
  });

  it("initially shows login form", function () {
    cy.contains("Log in to application");
    cy.contains("Username").find("#usernameInput");
    cy.contains("Password").find("#passwordInput");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#usernameInput").type("asder");
      cy.get("#passwordInput").type("asdasd123");
      cy.get("#login-button").click();

      cy.contains("asder asderman logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#usernameInput").type("asding");
      cy.get("#passwordInput").type("sadsad123");
      cy.get("#login-button").click();

      cy.contains("asder asderman logged in").should("not.exist");
      cy.contains("invalid username or password").should(
        "have.css",
        "color",
        "rgb(204, 0, 0)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#usernameInput").type("asder");
      cy.get("#passwordInput").type("asdasd123");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get("#new-blog-form").should("not.exist");
      cy.get("button.blogFormVisibilityButton").click();

      cy.get("#new-blog-title-input").type("Asding is Important");
      cy.get("#new-blog-author-input").type("Asd Asdington");
      cy.get("#new-blog-url-input").type("https://wikipedia.org");

      cy.get("button.blogFormCreateButton").click();

      cy.contains("Asding is Important");
      cy.contains("Asd Asdington");
      cy.contains("View");
      cy.contains("Like").should("not.exist");
    });

    describe("with preset blogs", function () {
      beforeEach(function () {
        cy.get("button.blogFormVisibilityButton").click();

        cy.get("#new-blog-title-input").type("Asding is Important");
        cy.get("#new-blog-author-input").type("Asd Asdington");
        cy.get("#new-blog-url-input").type("https://wikipedia.org");

        cy.get("button.blogFormCreateButton").click();
      });

      it("a blog can be liked", function () {
        cy.get("div.blog")
          .contains("Asding is Important")
          .contains("View")
          .click();

        cy.get("div.blog")
          .contains("Asding is Important")
          .contains("Likes 0 Like");

        cy.get("div.blog")
          .contains("Asding is Important")
          .contains("Like")
          .click();

        cy.get("div.blog")
          .contains("Asding is Important")
          .contains("Likes 1 Like");
      });

      it("a blog can be deleted", function () {
        cy.get("div.blog")
          .contains("Asding is Important")
          .contains("View")
          .click();

        cy.on("window:confirm", (windowText) => {
          expect(windowText).to.equal(
            'Do you really want to delete "Asding is Important" by Asd Asdington'
          );
        });

        cy.get("div.blog")
          .contains("Asding is Important")
          .find("button.deleteButton")
          .click();

        cy.get("div.blog").contains("Asding is Important").should("not.exist");
      });

      it("blogs should be in descending order based on likes", function () {
        cy.get("button.blogFormVisibilityButton").click();

        cy.get("#new-blog-title-input").type("Asding Forever");
        cy.get("#new-blog-author-input").type("Asder Asdloop");
        cy.get("#new-blog-url-input").type("https://google.com");

        cy.get("button.blogFormCreateButton").click();

        // ei jumalauta
        cy.get("div.blog:contains(Asding Forever)");

        cy.get("div.blog")
          .get("button:contains(View)")
          .click({ multiple: true });

        cy.get("div.blog:contains(Asding is Important)")
          .contains("Like")
          .click();

        cy.contains("Likes 1").then(() => {
          cy.get("div.likes-div").then((blogElements) => {
            expect(blogElements[0].innerText).to.contain("Likes 1");
            expect(blogElements[1].innerText).to.contain("Likes 0");
          });
        });
      });
    });
  });
});
