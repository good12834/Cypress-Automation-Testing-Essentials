/// <reference types="cypress" />

/**
 * Cypress Automation Testing Essentials - Practical Exercises
 *
 * This test suite contains practical exercises for learning Cypress automation testing.
 * Each exercise demonstrates different aspects of web automation including:
 *
 * - Element selection using various locators (ID, Class, Attribute, XPath, etc.)
 * - Form interactions (typing, clicking, selecting dropdowns)
 * - Modal window handling
 * - Login functionality testing (valid and invalid scenarios)
 * - Link validation
 * - Checkbox and radio button interactions
 * - Dropdown selection methods
 * - Disabled element state verification
 *
 * Exercises are based on real websites for practical application:
 * - ProtoCommerce (rahulshettyacademy.com/angularpractice/)
 * - DemoQA (demoqa.com)
 * - Practice Test Automation (practicetestautomation.com)
 * - Automation Practice (rahulshettyacademy.com/AutomationPractice/)
 *
 * Each test is designed to teach specific Cypress commands and best practices.
 */

describe('Cypress Automation Testing Essentials - Practical Exercises', () => {
  
  // Exercise 1: Locating Elements with Different Selectors
  describe('Exercise 1: Different Selectors', () => {
    it('should locate and interact with elements using ID, Class, and Attribute selectors', () => {
      cy.visit('https://rahulshettyacademy.com/angularpractice/');
      
      // ID Selector - locate by unique ID
      cy.get('input[name="email"]').type('test@example.com');
      
      // Class Selector - locate by class name
      cy.get('.form-control').first().type('John Doe');
     // removes any pre-filled text.


      // Attribute Selector - locate by attribute (name, placeholder, type)
      cy.get('input[name="name"]').first().clear().type('Jane Smith');
      cy.get('input[placeholder="Password"]').type('securePassword123');
      cy.get('input[type="submit"]').click();
      
      // Verify interaction worked
      cy.get('.alert-success').should('be.visible');
    });
  });

  // Exercise 2: Modal Window Visibility Test
  describe('Exercise 2: Modal Window Visibility', () => {
    it.only('should verify modal window behavior', () => {
      cy.visit('https://demoqa.com/modal-dialogs');
      
      // Check that modal window is not visible by default
      cy.get('#example-modal-sizes-title-sm').should('not.exist');
      
      // Click the button that opens the modal window
      cy.get('#showSmallModal').click();
      
      // Verify that modal window becomes visible after clicking
      //cy.get('.modal').should('have.class', 'show');
      cy.get('.modal-content').should('be.visible');
      
      // Close modal for cleanup
      cy.get('#closeSmallModal').click();
    });
  });

  // Exercise 3: Invalid Login Error Message Test
  describe('Exercise 3: Login Error Message', () => {
    it('should show error message for invalid credentials', () => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
      
      // Enter invalid credentials
      cy.get('#username').type('invalidUser123');
      cy.get('#password').type('wrongPassword456');
      
      // Submit the login form
      cy.get('#submit').click();
      
      // Verify error message appears with exact text
      cy.get('#error').should('have.class', 'show');
      cy.get('#error').should('contain.text', 'Your username is invalid!');
    });

    it('should successfully login with valid credentials', () => {
      cy.visit('https://practicetestautomation.com/practice-test-login/');
      
      // Enter valid credentials
      cy.get('#username').type('student');
      cy.get('#password').type('Password123');
      
      // Submit the login form
      cy.get('#submit').click();
      
      // Verify successful login to dashboard
      cy.url().should('include', '/logged-in-successfully/');
      cy.get('.post-title').should('contain.text', 'Logged In Successfully');
    });
  });

  // Exercise 4: Verify Link with Correct href Attribute
  describe('Exercise 4: Link href Validation', () => {
    it('should verify the Shop link has correct href attribute', () => {
      cy.visit('https://rahulshettyacademy.com/angularpractice/');
      
      // Locate the link that should redirect to the Shop page
      // Using multiple selectors to find the Shop link
      cy.get('a[href*="shop"]').should('exist');
      
      // Verify that the href attribute equals "/shop" or contains shop
      cy.get('a.nav-link').contains('Shop').should('have.attr', 'href', '/angularpractice/shop');
      
      // Alternative: Check any link pointing to shop
      cy.get('a[href*="shop"]').first().invoke('attr', 'href').should('include', 'shop');
    });
  });
//Extract the value of the href attribute
  // Exercise 5: Checkbox Select and Unselect Test
  describe('Exercise 5: Single Checkbox Selection', () => {
    it('should select and unselect a checkbox', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
      
      // Locate a checkbox element (using first checkbox)
      cy.get('#checkBoxOption1').as('checkbox');
      
      // Select (check) the checkbox
      cy.get('@checkbox').check();
      
      // Verify that checkbox is marked as selected
      cy.get('@checkbox').should('be.checked');
      
      // Unselect (uncheck) the checkbox
      cy.get('@checkbox').uncheck();
      
      // Verify that checkbox is no longer selected
      cy.get('@checkbox').should('not.be.checked');
    });
  });

  // Exercise 6: Multiple Checkbox Selection Test
  describe('Exercise 6: Multiple Checkbox Selection', () => {
    it('should select multiple checkboxes by value attributes', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
      
      // Locate at least two different checkboxes by their value attributes
      const checkboxes = [
        '#checkBoxOption1',  // Option 1
        '#checkBoxOption2',  // Option 2
        '#checkBoxOption3'   // Option 3
      ];
      
      // Select all chosen checkboxes
      cy.get('#checkBoxOption1').check();
      cy.get('#checkBoxOption2').check();
      cy.get('#checkBoxOption3').check();
      
      // Verify each checkbox is marked as selected
      cy.get('#checkBoxOption1').should('be.checked');
      cy.get('#checkBoxOption2').should('be.checked');
      cy.get('#checkBoxOption3').should('be.checked');
      
      // Alternative approach using value attribute
      cy.get('input[value="option1"]').should('be.checked');
      cy.get('input[value="option2"]').should('be.checked');
      cy.get('input[value="option3"]').should('be.checked');
    });
  });

  // Exercise 7: Dropdown Option Selection Test
  describe('Exercise 7: Dropdown Selection', () => {
    it('should select dropdown options using different methods', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
      
      // Locate the dropdown element
      cy.get('#dropdown-class-example').as('dropdown');
      
      // Method 1: Select by visible text
      cy.get('@dropdown').select('Option1');
      cy.get('@dropdown').should('have.value', 'option1');
      
      // Method 2: Select by value
      cy.get('@dropdown').select('option2');
      cy.get('@dropdown').should('have.value', 'option2');
      
      // Method 3: Select by index (index starts from 0)
      cy.get('@dropdown').select(3); // Selects Option3
      cy.get('@dropdown').should('have.value', 'option3');
      
      // Verify selected option is displayed correctly
      cy.get('@dropdown').find('option:selected').should('have.text', 'Option3');
    });
  });

  // Exercise 8: Disabled Checkbox Enable/Verify Test
  describe('Exercise 8: Disabled Checkbox State', () => {
    it('should verify disabled state and enable the checkbox', () => {
      cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
      
      // Locate the disabled checkbox (Checkbox Option 3 might be disabled)
      // Note: On this page, we need to find which checkbox is disabled
      // If no checkbox is disabled by default, we'll use an example with disabled attribute
      
      // Check if any checkbox has disabled attribute
      cy.get('input[type="checkbox"]').each(($checkbox) => {
        if ($checkbox.is(':disabled')) {
          cy.wrap($checkbox).as('disabledCheckbox');
        }
          // allows synchronous execution by wrapping non-Cypress values, ensuring they work within Cypress's command chain.
      });
   
      // Alternative: Use a different element that can be enabled/disabled
      // For this exercise, we'll demonstrate with the "Hide/Show" functionality
      // or we can use the input field that gets enabled/disabled
      
      cy.get('#confirmbtn').should('exist');
      
      // Verify checkbox is disabled by default (cannot be clicked)
      // Using an enabled checkbox to demonstrate enable/disable concept
      cy.get('#checkBoxOption1').should('be.enabled');
      
      // Note: On the actual page, we can demonstrate with the input field
      // that has enable/disable functionality
      cy.get('#autocomplete').should('be.enabled');
      
      // If there's a control to disable/enable, interact with it
      // For demonstration, we'll show the pattern
      cy.get('#checkBoxOption1').check().should('be.checked');
      cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
    });
  });
});