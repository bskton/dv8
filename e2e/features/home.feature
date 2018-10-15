Feature: Home page

  A user should be able see "Click me!" button.

  @home
  Scenario: Open home page and see button
    Given I am on home page
    Then I should see "Click me!" button