import "../styles/tailwind.css";
import facebookIcon from "/src/assets/icons/facebook_480px.png";
import googleIcon from "/src/assets/icons/google_480px.png";
import appleIcon from "/src/assets/icons/104447_apple_logo_icon.png";
import closeIcon from "/src/assets/icons/Close Icon.png";
import errorIcon from "/src/assets/icons/error.png";
import successIcon from "/src/assets/icons/success.png";
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
interface IUser {
    email: string;
    username: string;
    phoneNumber: string;
    password: string;
    avatar: string;
}
const users: IUser[] = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!) : [];

const getRamdomAvatar = async () => {
    const response = await fetch("https://picsum.photos/1000/1000");
    return response.url;
};
const handleSignIn = (e: Event) => {
    const submitEvent = e as SubmitEvent;
    submitEvent.preventDefault();
    const formData = new FormData(submitEvent.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let user = users.find((user) => user.email === email);
    if (!user) {
        user = users.find((user) => user.phoneNumber === email);
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
    // window.location.href = "/home";
};

const handleForcus = (e: Event | null) => {
    if (e) {
        const input = e.target as HTMLInputElement;
        input.parentElement?.classList.remove("border", "border-red-500");
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
const handleSignUp = async (e: Event) => {
    document.getElementById("btnAuth")?.setAttribute("disabled", "true");
    e.preventDefault();
    const submitEvent = e as SubmitEvent;
    const emailElement = document.querySelector('input[name="email"]') as HTMLInputElement;
    const usernameElement = document.querySelector('input[name="username"]') as HTMLInputElement;
    const phoneNumberElement = document.querySelector('input[name="phoneNumber"]') as HTMLInputElement;
    const passwordElement = document.querySelector('input[name="password"]') as HTMLInputElement;
    const confirmPasswordElement = document.querySelector('input[name="confirmPassword"]') as HTMLInputElement;
    const email = emailElement.value;
    const username = usernameElement.value;
    const phoneNumber = phoneNumberElement.value;
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;
    if (password !== confirmPassword) {
        passwordElement.parentElement!.classList.add("border", "border-red-500");
        confirmPasswordElement.parentElement!.classList.add("border", "border-red-500");
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
    document.getElementById("btnAuth")?.setAttribute("disabled", "false");
};
const renderSignIn = () => {
    document.getElementsByTagName("title")[0].innerText = "Sign in";

    const mainForm = document.querySelector("#main-form")!;

    mainForm.removeEventListener("submit", handleSignUp);

    removeForcusEvent();
    mainForm.innerHTML = signInHtml;
    setUpForcusEvent();
    document.getElementById("reason")!.innerText = "Sign in to";
    document.getElementById("if")!.innerText = "If you don’t have an account, let' register.";
    document.getElementById("link-auth")!.innerText = " Register here !";
    (document.getElementById("link-auth")! as HTMLAnchorElement).href = "#signup";

    mainForm.addEventListener("submit", handleSignIn);
};
const renderSignUp = () => {
    document.getElementsByTagName("title")[0].innerText = "Sign up";

    document.querySelector("#main-form")!.removeEventListener("submit", handleSignIn);
    removeForcusEvent();
    document.querySelector("#main-form")!.innerHTML = signUpHtml;
    setUpForcusEvent();
    document.getElementById("reason")!.innerText = "Register to";
    document.getElementById("if")!.innerText = "If you already have an account, let's sign in.";
    document.getElementById("link-auth")!.innerText = " Sign in here !";
    (document.getElementById("link-auth")! as HTMLAnchorElement).href = "#signin";

    document.querySelector("#main-form")!.addEventListener("submit", handleSignUp);
};

const handleHashChange = () => {
    const hash = window.location.hash.substring(1);
    if (hash === "signin" || hash === "") {
        renderSignIn();
    } else if (hash === "signup") {
        renderSignUp();
    }
};

enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
}
const createElementFromHTML = (htmlString: string) => {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    return div.firstChild as HTMLElement;
};
let toast: HTMLElement | null = null;
const createToast = (message: string, type: ToastType) => {
    toast?.remove();
    const iconSrc = type === ToastType.SUCCESS ? successIcon : errorIcon;
    const toastHtml = `
    <div class="fixed w-10/12 sm:w-72 bg-gray-50 shadow-lg top-4 right-2 z-10 border-b-4 ${
        type === ToastType.SUCCESS ? `border-b-[#55B938]` : `border-b-[#D65745]`
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
    const closeToast = document.querySelector("#close-toast") as HTMLImageElement;
    closeToast.addEventListener("click", () => {
        toast?.remove();
    });
    setTimeout(() => {
        toast?.remove();
    }, 6000);
};

window.onhashchange = handleHashChange;
handleHashChange();
