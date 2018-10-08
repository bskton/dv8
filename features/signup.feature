Feature: Signup
  
  A user should be able to sign up to use all available features.

  Scenario: Successfully sign up using email and password
    Given I am on page "signup"
    And I see login form
    When I enter "user@mail.domain" into the field "Email"
    And I enter "password" into the field "Password"
    And I press button "Get Started"
    Then I am on page "profile"
    And I see "Your account has been successfully created"
    And I see "Please check your e-mail and activate your account"

  Scenario: Log out
    Given I am logged in
    And I am on page "profile"
    When I press menu button
    And I press link "Log Out"
    Then I am logged out
    And I am on page "signin"

  Scenario: Show error message if email was already used by another user
    Given a user with email "user@mail.domain" already exists
    And I am on page "signup"
    And I see login form
    When I enter "user@mail.domain" into the field "Email"
    And I enter "password" into the field "Password"
    And I press button "Get Started"
    Then I am on page "signup"
    And I see error message "This email is already in use"
    And I see link "Want to log in?"