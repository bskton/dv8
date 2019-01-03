Feature: Sign In

  A user should be able to sign in to use all available features.

  @page @user @form
  Scenario: Successfully sign in using email and password
    Given I am on page "signin"
    And a user with email "user@mail.domain" and password "123123" already exists
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And I press button "Sign In"
    Then I am navigated on page "profile"
