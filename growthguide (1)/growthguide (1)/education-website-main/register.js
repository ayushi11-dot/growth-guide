

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
 
const firebaseConfig = {
   apiKey: "AIzaSyBOejfI6lr2B5uPmP0JR2DndIvB2qsGRGY",
   authDomain: "growth-guide-23152.firebaseapp.com",
   projectId: "growth-guide-23152",
   storageBucket: "growth-guide-23152.firebasestorage.app",
   messagingSenderId: "603010750091",
   appId: "1:603010750091:web:050ed5bd5cf91ddb11a68e"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);  
 const submit_login=document.getElementById('login')
const submit=document.getElementById('submit');
submit?.addEventListener("click",async function(event){
    event.preventDefault();
    const email=document.getElementById('email').value;  
    const password=document.getElementById('password').value;  
    console.log("email:",email,password)
await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    // Signed up 
    const user = userCredential.user;
    alert("You have sign up successfully and Your dashboard is created");
    window.location.href="index.html"

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})
submit_login?.addEventListener("click",async function(event){
  event.preventDefault();
  const email=document.getElementById('login_email').value; 
  const password=document.getElementById('login_password').value;  
  console.log("email:",email,password)
await signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  
  // Signed up 
  const user = userCredential.user;
  alert("Logging In...")
   window.location.href="welcome.html"
  
  // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
  // ..
});
})

const googleButton = document.getElementById("g_button");

if (googleButton) {
  googleButton.addEventListener("click", async (event) => {
      event.preventDefault(); 

      const provider = new GoogleAuthProvider();

      try {
          const result = await signInWithPopup(auth, provider);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log("Google Sign-In successful:", user);
          alert("You have sign up successfully and Your dashboard is created")
        

          window.location.href = "Login_Page.html";  
      } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error("Google Sign-In error:", errorMessage);
          alert("Failed to sign in with Google: " + errorMessage);
      }
  });
}


function handleForgotPassword(email) {
    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent! Please check your inbox.");
        })
        .catch((error) => {
            // Handle Errors
            console.error("Error sending password reset email: ", error);
            if (error.code === "auth/user-not-found") {
                alert("No user found with this email.");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email address.");
            } else {
                alert("An error occurred. Please try again.");
            }
        });
}

// Example: Adding event listener to a button
document.getElementById("forgotPasswordButton").addEventListener("click", () => {
    const email = document.getElementById("login_email").value; // Assuming there is an input field with id 'emailInput'
    handleForgotPassword(email);
});
