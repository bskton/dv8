Feature: Signup

  A user should be able to sign up to use all available features.

  @signup
  Scenario: Successfully sign up using email and password
    Given I am on sign up page
    And a user with email "user@mail.domain" and password "123123" does not exist
    When I enter "user@mail.domain" into the field "Email"
    And enter "123123" into the field "Password"
    And click button "Get Started"
    Then I redirected on page "profile"
    And I see success message "Your account has been successfully created."
    And I see message "Please check your e-mail and activate your account."

  @signup-failed
  Scenario: Show error message if email was already used by another user
    Given a user with email "user@mail.domain" and password "123123" already exists
    And I am on sign up page
    When I enter "user@mail.domain" into the field "Email"
    And enter "123123" into the field "Password"
#   And I press button "Get Started"
#   Then I am on page "signup"
#   And I see error message "This email is already in use"
#   And I see link "Want to log in?"
