import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyAdtLPZo929wG-z_w34AzK-Hpa4aj_P3Pg",
    authDomain: "simpleauth-4081f.firebaseapp.com",
    projectId: "simpleauth-4081f",
    storageBucket: "simpleauth-4081f.appspot.com",
    messagingSenderId: "683645601504",
    appId: "1:683645601504:web:" // Add your actual appId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let isLoginForm = true;

window.toggleForm = function() {
    isLoginForm = !isLoginForm;
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleBtn = document.querySelector('.toggle-form');
    
    formTitle.textContent = isLoginForm ? 'Login' : 'Sign Up';
    submitBtn.textContent = isLoginForm ? 'Login' : 'Sign Up';
    toggleBtn.textContent = isLoginForm ? "Don't have an account? Sign up" : 'Already have an account? Login';
    document.getElementById('error').style.display = 'none';
}

window.handleAuth = async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    try {
        if (isLoginForm) {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Logged in successfully!');
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully!');
        }
        // Clear inputs after successful auth
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        errorDiv.style.display = 'none';
    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
    }
}