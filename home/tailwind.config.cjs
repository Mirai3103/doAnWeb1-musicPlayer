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
            screens: {
                "-2xl": { max: "1535px" },
                "-xl": { max: "1279px" },
                "-lg": { max: "1023px" },
                "-md": { max: "767px" },
                "-sm": { max: "639px" },
                "@md": { min: "640px", max: "767px" },
                "@lg": { min: "768px", max: "1023px" },
                "@xl": { min: "1024px", max: "1279px" },
                "@2xl": { min: "1280px", max: "1535px" },
            },
        },
    },
    plugins: [],
};
