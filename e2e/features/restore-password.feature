Feature: Restore Password

  A user should be able to restore password to get an access to an account

  @page
  Scenario: Display Forgot password link on Sign In page
    Given I am on page "signin"
    And I see "Forgot password?" link
    When I click "Forgot password?" link
    Then I am navigated on page "password-restore"
