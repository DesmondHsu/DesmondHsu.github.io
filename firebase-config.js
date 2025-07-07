// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMQsbjrmGUgKpdy3hTl2hvrjZuNbCFcY8",
  authDomain: "desmondhsu.github.io", // Using custom domain for self-hosted auth
  projectId: "leo-openended-realm-engine",
  storageBucket: "leo-openended-realm-engine.firebasestorage.app",
  messagingSenderId: "860195611175",
  appId: "1:860195611175:web:829755146aa4bb37d62402",
  measurementId: "G-B6DFX4CMVX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Analytics
const analytics = firebase.analytics();

// Initialize Auth
const auth = firebase.auth();
auth.useDeviceLanguage();

// Initialize Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Handle redirect result
auth.getRedirectResult()
  .then((result) => {
    if (result.user) {
      // This gives you a Google Access Token
      const credential = firebase.auth.GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      
      // The signed-in user info
      const user = result.user;
      
      console.log("Sign-in successful!");
      console.log("Access Token:", token);
      console.log("User:", user);
      console.log("User Email:", user.email);
      console.log("User Name:", user.displayName);
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = firebase.auth.GoogleAuthProvider.credentialFromError(error);
    
    console.error("Redirect sign-in failed:");
    console.error("Error Code:", errorCode);
    console.error("Error Message:", errorMessage);
    console.error("Email:", email);
    console.error("Credential:", credential);
  });

console.log("Firebase initialized successfully");
console.log("Auth:", auth);
console.log("Analytics:", analytics);
console.log("Google Provider:", provider);