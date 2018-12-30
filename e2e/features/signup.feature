Feature: Sign Up

  A user should be able to sign up to use all available features.

  @signup
  Scenario: Successfully sign up using email and password
    Given I am on sign up page
    And a user with email "user@mail.domain" and password "123123" does not exist
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And click button "Sign Up" and redirected on page "Profile" with url "profile"
    Then I see success message "Your account has been successfully created."
    And I see message "Please check your e-mail and activate your account."

  @signup-failed
  Scenario: Show error message if email was already used by another user
    Given a user with email "user@mail.domain" and password "123123" already exists
    And I am on sign up page
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And I press button "Sign Up"
    Then I am on same page "signup"
    And I see error message "The email address is already in use by another account."
#   And I see link "Want to log in?"

  @signup-empty-field-validation-error
  Scenario: Show validation error if email is empty
    Given page "signup" is opened
    When I click input "Email"
    And I click input "Password"
    Then I see validation message "Field must not be empty." for "Email"
    And I click input "Email"
    And I see validation message "Has to be at least 6 characters long." for "Password"

  @signup-invalid-email-error
  Scenario: Show validation error if email is invalid
    Given I am on page "signup"
    When I enter "test" into the field "Email"
    And I click input "Password"
    Then I see validation message "Email is invalid." for "Email"
