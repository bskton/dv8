Feature: Home page

  A user should be able see "Click me!" button.

  @page @form
  Scenario: Open home page and see button
    Given I am on page ""
    Then I see "DV8" link
