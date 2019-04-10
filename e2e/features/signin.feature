Feature: Sign In

  A user should be able to sign in to use all available features.

  @page @user @form
  Scenario: Successfully sign in using email and password
    Given I am on page "signin"
    And I wait until see header "Sign In"
    And a user with email "user@mail.domain" and password "123123" already exists
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And I press button "Sign In"
    Then I am navigated on page "profile"
    And I wait until see header "Profile"

  @page @user @form @navigation @browser
  Scenario: Authentication state does not change after page reload
    Given I start new browser
    And I am on page "signin"
    And I wait until see header "Sign In"
    And a user with email "user@mail.domain" and password "123123" already exists
    When I enter "user@mail.domain" into the field "Email"
    And I enter "123123" into the field "Password"
    And I press button "Sign In"
    And I am navigated on page "profile"
    And I wait until see header "Profile"
    And I reload the page
    Then I am navigated on page "profile"
    And I wait until see header "Profile"
    And I click menu button
    And I see main menu with item "Log Out"
    And I am on page ""
    And I click menu button
    And I see main menu with item "Log Out"

