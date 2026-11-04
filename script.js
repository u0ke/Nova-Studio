
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');

const mobileMenu = document.querySelector("header details");

function getSavedTheme() {
    try {
        return localStorage.getItem("nova-theme");
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem("nova-theme", theme);
    } catch {
        // Theme still works for this page session.
    }
}

function setTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.classList.toggle("dark", isDark);

    themeIcon.className = isDark
        ? "fi fi-rr-sun"
        : "fi fi-rr-moon";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );

    themeColor.setAttribute(
        "content",
        isDark ? "#171916" : "#F8F9F5"
    );

    saveTheme(theme);
}

// Restore saved theme
const savedTheme = getSavedTheme();

setTheme(savedTheme === "dark" ? "dark" : "light");

// Toggle theme
themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");

    setTheme(isDark ? "light" : "dark");
});

// Close mobile menu after selecting a link
document.querySelectorAll("header details nav a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.open = false;
    });
});
