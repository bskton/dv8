Feature: Signup

  A user should be able to sign up to use all available features.

  Scenario: Successfully sign up using email and password
    Given I am on page "signup"
    When I enter "user@mail.domain" into the field "Email"
    And enter "password" into the field "Password"
    And click button "Get Started"
    Then I redirected on page "profile"