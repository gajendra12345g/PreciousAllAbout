Feature: UserActivity

    Scenario: User navigates to UserActivity
        Given I am a User loading UserActivity
        When I navigate to the UserActivity
        Then UserActivity will load with out errors
        Then User can change the tabs
        And I can leave the screen with out errors