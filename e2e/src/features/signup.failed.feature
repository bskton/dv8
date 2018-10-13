Feature: Signup Failed

  A user should be able to see error message on sign up failed.

  Scenario: Show error message if email was already used by another user
    Given a user with email "user@mail.domain" already exists
    And I am on page "signup"
    When I enter "user@mail.domain" into the field "Email"
    And enter "password" into the field "Password"
#   And I press button "Get Started"
#   Then I am on page "signup"
#   And I see error message "This email is already in use"
#   And I see link "Want to log in?"