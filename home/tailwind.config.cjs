/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./index.html", "./scripts/**/*.{js,html}"],
    theme: {
        extend: {
            colors: {
                "white-blur": "#F2F5F5",
            },
        },
    },
    plugins: [],
};
