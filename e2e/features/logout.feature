Feature: Log Out

  A user should be able to log out.

  @page @user
  Scenario: Redirect on Sign In page after Log Out
    Given a user with email "test@mail.local" and password "secret" already exists
    And I am on page "signin"