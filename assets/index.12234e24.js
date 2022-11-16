// (function polyfill() {
//     const relList = document.createElement("link").relList;
//     if (relList && relList.supports && relList.supports("modulepreload")) {
//         return;
//     }
//     for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
//         processPreload(link);
//     }
//     new MutationObserver((mutations) => {
//         for (const mutation of mutations) {
//             if (mutation.type !== "childList") {
//                 continue;
//             }
//             for (const node of mutation.addedNodes) {
//                 if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
//             }
//         }
//     }).observe(document, { childList: true, subtree: true });
//     function getFetchOpts(script) {
//         const fetchOpts = {};
//         if (script.integrity) fetchOpts.integrity = script.integrity;
//         if (script.referrerpolicy) fetchOpts.referrerPolicy = script.referrerpolicy;
//         if (script.crossorigin === "use-credentials") fetchOpts.credentials = "include";
//         else if (script.crossorigin === "anonymous") fetchOpts.credentials = "omit";
//         else fetchOpts.credentials = "same-origin";
//         return fetchOpts;
//     }
//     function processPreload(link) {
//         if (link.ep) return;
//         link.ep = true;
//         const fetchOpts = getFetchOpts(link);
//         fetch(link.href, fetchOpts);
//     }
// })();
const tailwind = "";
const facebookIcon = "./assets/facebook_480px.1db20559.png";
const googleIcon = "./assets/google_480px.708fe9b3.png";
const appleIcon = "./assets/104447_apple_logo_icon.319ab539.png";
const closeIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACxSURBVHgBzZLBDcMgDEUNXBiDVXLkFiZpNmk3IQIkjlmFRRA1B6qUGiL1FEtIxuY/bMsAtzLn3GatVaN8jFF57x/nGG9OCGFjjD2FEAcFqeKc84Huq370A0DhjoCER/WQJi6lKDwJ/b3lGPXL6eEipYQ+ZoxJJICCcM5hJCYBPaTeR+KvGfxr/KqF0WBJADVEFC4zCJuJW8+z3KcCDK6jaWutU1fJCpTVbbxa5foGbmVvrL7eoTbMOzkAAAAASUVORK5CYII=";
const errorIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH9SURBVHgB1VXNbtNAEJ4ZJyTHPIKvqSqInwCDUokbqoQgt6ZPAHmClDcoT4B7S8oBc0ONEOEJWqlBXN038Imaut5hnDaO87NrN2oP/aQkm935vm/HO7MGeOzAooDzN23XsqAFDM8lujGdZAgVq2+xpcbOYBxsZHAr3JcQFwxgAO8K4486o7UGv9+2+4h4AOURXLPqPT3+4RcabCA+F2PsNo9PjrQGk87LLrH1GTYEy9lcUezkHxflA0S8ryMrBc7WcITpRyHsr4tBKYIaVxc2SPndy4+tM7DiOIRycM87bXfFgJj2jLR6xZ4NUbFtCiUF7oqB0FpwX2BoLRicdt20gRomTpIoO+MjGmOR8NmCQT2qGwnLIIbS8ZX0K6pHYe2yahYla096xL7ZolwbZmQFMc3A8cYhA1+YGFLjDQQ+Y8Kg6AqT1bPZuJIJAPqy8B70Gew2B6MgHU86O+lj0jZkouBXxpsNLLQOwYAoiuZpK2XoCQy2v4y87F9+afJu55B0WTD7/+i6V02qDSL4CpqmlI7f1xqk5Vq7fHIqamvJRVAAn7aHow/5uZXT+tN5ZTOrn3c3QX9reLK7PEvLE83B9wCRXsipH0E5hAq4t058amtiTrNRyYFEvYbVTr+QjvYIyEs3pdMofCfPzVxbqtpOCMP4bxw4/rjs7fqw+A8Is7XihVrVrQAAAABJRU5ErkJggg==";
const successIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHaSURBVHgB1VUxUsJAFP0/oqAVR8ATiBWUpBEZC3GEGTs4gp5APYF4AqFjBCd0YGXo4tjEG+QIqZQZkl13k0iWJJiNHa9JZvP3vf//vp8F2HagTFBrWq0B0jIlSsnbhNRmD33cMPS0vX8KtGaVa1TgFigWN4RYFKDvEBhMGoYlLXA1rZYchCdEqIEcrCUBNUkEk8iJAm8ssxJkAmubQ9TR2YcprirRMFdBLTs5B2tjbkdrarXiRoH2tNplmZTh/yjt7i8eNgp4B5oFzE2U9Z71+T5cg65YxUqAWzFTazyrEpVb9blu3DFi/fdTLv/djQlwn4MsAvLRiX+gl6/VDtDQcVTBo5gAgj9EAosZlG+lkTOSvhiiUDiMCayD2suvvFe+IopIkEexEqBALCHN4s7B4py/DdnwcBH2+pmVnCMXJo2mOHZ8MyOBl7oxGPoTujqjNHJmFl3g8eEUCqbfgphIR1yTyRyJO4kJTFTdphQfo8GiiFRbCMzF38XaITt7hV7MNYFIe1bRZHq+BOhG9obwqkD3ItoqD4hNSAGl9Cb6R43Z1HcJUZMqSSMfn773ouuJc8BFuDWZGwaQjjmge5xEzpF6ZfL7wQXgV2aTtakYpGsjokmI3LW53fgBVF7ZYV6TaKkAAAAASUVORK5CYII=";
const signInHtml = `
<div class="md:w-[300px] sm:w-[400px] w-full xl:w-[400px] mx-auto flex flex-col gap-y-5">
    <h3 class="font-medium text-3xl">Sign in</h3>
    <form action="#" class="flex flex-col gap-y-5" method="POST" >
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-2">
            <input type="email" name="email" class="w-full bg-transparent outline-none" placeholder="Enter email or user name" />
        </div>
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-2">
            <input name="password" class="w-full bg-transparent outline-none" type="password" placeholder="Password" />
        </div>
        <div class="text-[#B0B0B0] text-xs flex justify-end -mt-5 mb-5">
            <a class="hover:underline">Forgot your password ?</a>
        </div>
        <div>
            <button id="btnAuth" class="w-full bg-[#4D47C3] text-white p-2 rounded-md shadow-md hover:bg-[#3f39b1]" type="submit">
                Login
            </button>
        </div>
        <div class="text-[#B0B0B0] text-xs flex justify-center mt-2">
            <span>or continue with</span>
        </div>
        <div class="mt-4 flex gap-x-4 justify-center">
            <div class="max-w-[40px] cursor-pointer">
                <img
                    class="w-full h-auto object-cover"
                    src="${facebookIcon}"
                    alt="login with facebook"
                />
            </div>
            <div class="max-w-[40px] cursor-pointer">
                <img
                    class="w-full h-auto object-cover"
                    src="${appleIcon}"
                    alt="login with apple id"
                />
            </div>
            <div class="max-w-[40px] cursor-pointer">
                <img
                    class="w-full h-auto object-cover"
                    src="${googleIcon}"
                    alt="login with google"
                />
            </div>
        </div>
    </form>
</div>

`;
const signUpHtml = `
<div class="md:w-[300px]  md:-mt-20 sm:w-[400px] w-full xl:w-[400px] mx-auto flex flex-col gap-y-5">
    <h3 class="font-medium text-3xl">Register</h3>
    <form action="#" class="flex flex-col gap-y-5">
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-1">
            <input name="email"  type="email" class="w-full bg-transparent outline-none" placeholder="Your email" />
        </div>
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-1">
            <input name="username" class="w-full bg-transparent outline-none" type="text" placeholder="Username" />
        </div>
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-1">
            <input name="phoneNumber" class="w-full bg-transparent outline-none" type="text" placeholder="Contact number" />
        </div>
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-1">
            <input  name="password" class="w-full bg-transparent outline-none" type="password" placeholder="Password" />
        </div>
        <div class="bg-[#F0EFFF] p-3 rounded-lg text-[#a19cfd] flex text-base my-1">
            <input  name="confirmPassword" class="w-full bg-transparent outline-none" type="password" placeholder="Confirm password" />
        </div>
        <div>
            <button id="btnAuth" class="w-full bg-[#4D47C3] text-white p-2 rounded-md shadow-md hover:bg-[#3f39b1]" type="submit">
                Register
            </button>
        </div>
        <div class="text-[#B0B0B0] text-xs flex justify-center mt-2">
            <span>or continue with</span>
        </div>
        <div class="mt-4 flex gap-x-4 justify-center">
            <div class="max-w-[40px] cursor-pointer">
                <img
                    class="w-full h-auto object-cover"
                    src="${facebookIcon}"
                    alt="login with facebook"
                />
            </div>
            <div class="max-w-[40px] cursor-pointer">
                <img
                    class="w-full h-auto object-cover"
                    src="${appleIcon}"
                    alt="login with apple id"
                />
            </div>
            <div class="max-w-[40px] cursor-pointer">
                <img
                    class="w-full h-auto object-cover"
                    src="${googleIcon}"
                    alt="login with google"
                />
            </div>
        </div>
    </form>
</div>
`;
const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
const getRamdomAvatar = async () => {
    const response = await fetch("https://picsum.photos/1000/1000");
    return response.url;
};
const handleSignIn = (e) => {
    const submitEvent = e;
    submitEvent.preventDefault();
    const formData = new FormData(submitEvent.target);
    const email = formData.get("email");
    const password = formData.get("password");
    let user = users.find((user2) => user2.email === email);
    if (!user) {
        user = users.find((user2) => user2.phoneNumber === email);
    }
    if (!user) {
        createToast("User not found", ToastType.ERROR);
        return;
    }
    if (user.password !== password) {
        createToast("Password is incorrect", ToastType.ERROR);
        return;
    }
    createToast("Login success", ToastType.SUCCESS);
    localStorage.setItem("user", JSON.stringify(user));
};
const handleForcus = (e) => {
    var _a;
    if (e) {
        const input = e.target;
        (_a = input.parentElement) == null ? void 0 : _a.classList.remove("border", "border-red-500");
    }
};
const setUpForcusEvent = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.addEventListener("focus", handleForcus);
    });
};
const removeForcusEvent = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.removeEventListener("focus", handleForcus);
    });
};
const handleSignUp = async (e) => {
    var _a, _b;
    (_a = document.getElementById("btnAuth")) == null ? void 0 : _a.setAttribute("disabled", "true");
    e.preventDefault();
    const emailElement = document.querySelector('input[name="email"]');
    const usernameElement = document.querySelector('input[name="username"]');
    const phoneNumberElement = document.querySelector('input[name="phoneNumber"]');
    const passwordElement = document.querySelector('input[name="password"]');
    const confirmPasswordElement = document.querySelector('input[name="confirmPassword"]');
    const email = emailElement.value;
    const username = usernameElement.value;
    const phoneNumber = phoneNumberElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;
    if (password !== confirmPassword) {
        passwordElement.parentElement.classList.add("border", "border-red-500");
        confirmPasswordElement.parentElement.classList.add("border", "border-red-500");
        createToast("Password and confirm password are not the same", ToastType.ERROR);
        return;
    }
    const user = {
        email,
        username,
        phoneNumber,
        password,
        avatar: await getRamdomAvatar(),
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    createToast("Register successfully", ToastType.SUCCESS);
    (_b = document.getElementById("btnAuth")) == null ? void 0 : _b.setAttribute("disabled", "false");
};
const renderSignIn = () => {
    document.getElementsByTagName("title")[0].innerText = "Sign in";
    const mainForm = document.querySelector("#main-form");
    mainForm.removeEventListener("submit", handleSignUp);
    removeForcusEvent();
    mainForm.innerHTML = signInHtml;
    setUpForcusEvent();
    document.getElementById("reason").innerText = "Sign in to";
    document.getElementById("if").innerText = "If you don\u2019t have an account, let' register.";
    document.getElementById("link-auth").innerText = " Register here !";
    document.getElementById("link-auth").href = "#signup";
    mainForm.addEventListener("submit", handleSignIn);
};
const renderSignUp = () => {
    document.getElementsByTagName("title")[0].innerText = "Sign up";
    document.querySelector("#main-form").removeEventListener("submit", handleSignIn);
    removeForcusEvent();
    document.querySelector("#main-form").innerHTML = signUpHtml;
    setUpForcusEvent();
    document.getElementById("reason").innerText = "Register to";
    document.getElementById("if").innerText = "If you already have an account, let's sign in.";
    document.getElementById("link-auth").innerText = " Sign in here !";
    document.getElementById("link-auth").href = "#signin";
    document.querySelector("#main-form").addEventListener("submit", handleSignUp);
};
const handleHashChange = () => {
    const hash = window.location.hash.substring(1);
    if (hash === "signin" || hash === "") {
        renderSignIn();
    } else if (hash === "signup") {
        renderSignUp();
    }
};
var ToastType = /* @__PURE__ */ ((ToastType2) => {
    ToastType2["SUCCESS"] = "success";
    ToastType2["ERROR"] = "error";
    return ToastType2;
})(ToastType || {});
const createElementFromHTML = (htmlString) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};
let toast = null;
const createToast = (message, type) => {
    toast == null ? void 0 : toast.remove();
    const iconSrc = type === "success" ? successIcon : errorIcon;
    const toastHtml = `
    <div class="fixed w-10/12 sm:w-72 bg-gray-50 shadow-lg top-4 right-2 z-10 border-b-4 ${
        type === "success" ? `border-b-[#55B938]` : `border-b-[#D65745]`
    }">
            <div class="relative py-6 px-3 flex gap-x-2 items-center">
                <div class="absolute top-1 right-1">
                    <img id="close-toast" src="${closeIcon}" class="cursor-pointer" alt="close" />
                </div>
                <div class="min-w-[32px] basis-6">
                    <img src="${iconSrc}" alt="success" />
                </div>
                <div class="flex-grow-0">${message}</div>
            </div>
        </div>
        `;
    toast = createElementFromHTML(toastHtml);
    document.getElementsByTagName("body")[0].appendChild(toast);
    const closeToast = document.querySelector("#close-toast");
    closeToast.addEventListener("click", () => {
        toast == null ? void 0 : toast.remove();
    });
    setTimeout(() => {
        toast == null ? void 0 : toast.remove();
    }, 6e3);
};
window.onhashchange = handleHashChange;
handleHashChange();
