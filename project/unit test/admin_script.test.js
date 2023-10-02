// admin_script.test.js
const adminScript = require('../js/admin_script'); // admin_script.js exports the functions

describe('Admin Script Tests', () => {
  test('Toggle Navbar', () => {
   
    document.body.innerHTML = '<div class="header"><div class="navbar"></div><div class="account-box"></div></div>';
    
   
    adminScript.toggleNavbar();

    
    expect(document.querySelector('.header .navbar').classList.contains('active')).toBe(true);
  });

  test('Toggle Account Box', () => {
  
    document.body.innerHTML = '<div class="header"><div class="navbar"></div><div class="account-box"></div></div>';
   
    adminScript.toggleAccountBox();

    expect(document.querySelector('.header .account-box').classList.contains('active')).toBe(true);
  });

});
