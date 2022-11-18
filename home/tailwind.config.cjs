/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./index.html", "./**/*.{js,html,ts}"],
    theme: {
        extend: {
            colors: {
                "white-blur": "#F2F5F5",
            },
            width: {
                queue: "300px",
            },
        },
    },
    plugins: [],
};
