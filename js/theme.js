const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

function changeTheme(button, theme) {
    // Remove active class from all buttons
    document.querySelectorAll('.pref-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to the clicked button
    button.classList.add('active');

    // Apply the selected theme
    setTheme(theme);
}

function updateActiveTheme() {
    const currentTheme = localStorage.getItem('theme');

    document.querySelectorAll('.pref-btn').forEach(btn => {
        btn.classList.remove('active');

        if (btn.getAttribute('onclick').includes(`'${currentTheme}'`)) {
            btn.classList.add('active');
        }
    });
}