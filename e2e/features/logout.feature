Feature: Log Out

  A user should be able to log out.

  @page @user @form @navigation
  Scenario: Redirect on Sign In page after Log Out
    Given a user with email "test@mail.local" and password "secret" already exists
    And I am on page "signin"
    And I wait until see header "Sign In"
    When I enter "test@mail.local" into the field "Email"
    And I enter "secret" into the field "Password"
    And I press button "Sign In"
    And I am navigated on page "profile"
    And I click menu button
    And I see main menu with item "Log Out"
    And I click main menu item "Log Out"
    Then I am navigated on page "signin"
