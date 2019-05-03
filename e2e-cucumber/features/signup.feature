Feature: Sign Up

  A user should be able to sign up to use all available features.

  @page @user @form @message @browser
  Scenario: Successfully sign up using email and password
    Given I start new browser
    And I am on page "signup"
    And I wait until see header "Sign Up"
    And a user with email "user@mail.domain" and password "123123" does not exist
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And I press button "Sign Up"
    Then I am navigated on page "profile"
    And I wait until see header "Profile"
    And I wait until see "Save" button

  @page @user @form @message @browser
  Scenario: Show error message if email was already used by another user
    Given I start new browser
    And I am on page "signup"
    And I wait until see header "Sign Up"
    And a user with email "user@mail.domain" and password "123123" already exists
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And I press button "Sign Up"
    Then I am navigated on page "signup"
    And I wait until see header "Sign Up"
    And I see error message "The email address is already in use by another account."

  @page @user @form @message
  Scenario: Show validation error if email is empty
    Given I am on page "signup"
    And I wait until see header "Sign Up"
    When I click input "Email"
    And I click input "Password"
    Then I see validation message "Field must not be empty." for "Email"
    And I click input "Email"
    And I see validation message "Has to be at least 6 characters long." for "Password"

  @page @user @form @message
  Scenario: Show validation error if email is invalid
    Given I am on page "signup"
    And I wait until see header "Sign Up"
    When I enter "test" into the field "Email"
    And I click input "Password"
    Then I see validation message "Email is invalid." for "Email"
