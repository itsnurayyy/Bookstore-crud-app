// script.test.js
const script = require('../js/script');

describe('Script Tests', () => {
  test('Toggle User Box', () => {
    document.body.innerHTML = '<div class="header"><div class="header-2"><div class="user-box"></div><div class="navbar"></div></div></div>';
    
    script.toggleUserBox();

    expect(document.querySelector('.header .header-2 .user-box').classList.contains('active')).toBe(true);
  });

  test('Toggle Navbar', () => {
    document.body.innerHTML = '<div class="header"><div class="header-2"><div class="user-box"></div><div class="navbar"></div></div></div>';
    
    script.toggleNavbar();

    expect(document.querySelector('.header .header-2 .navbar').classList.contains('active')).toBe(true);
  });

});
