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

// Using popup auth flow - no redirect result handling needed

console.log("Firebase initialized successfully");
console.log("Auth:", auth);
console.log("Analytics:", analytics);
console.log("Google Provider:", provider);