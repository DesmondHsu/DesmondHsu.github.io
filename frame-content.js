function FrameContent() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState("Home");

  // Listen for auth state changes
  React.useEffect(() => {
    if (typeof firebase !== "undefined" && typeof auth !== "undefined") {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("Auth state changed:", user ? "logged in" : "logged out");
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          color: "white",
        }}
      >
        Loading...
      </div>
    );
  }

  // If user is logged in, show blank/nothing
  if (user) {
    // Placeholder for PageContentArea and BottomNavigationBar
    // These will be defined in subsequent steps.
    // For now, let's imagine they exist and FrameContent passes props to them.

    // Inline style for the main container when logged in
    const loggedInContainerStyle = {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column", // To stack PageContentArea and BottomNavigationBar
      backgroundColor: "#000", // Ensuring the background of the app screen area is black
    };

    // Page Components
    const pageStyle = {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white", // Default text color for pages
      fontSize: "20px",
    };

    const HomePage = () => <div style={pageStyle}>Home Page</div>;
    const FriendsPage = () => <div style={pageStyle}>Friends Page</div>;
    const CreatePage = () => <div style={pageStyle}>Create Page</div>;
    const InboxPage = () => <div style={pageStyle}>Inbox Page</div>;
    const ProfilePage = () => <div style={pageStyle}>Profile Page</div>;

    const PageContentArea = ({ currentPage }) => {
      const containerStyle = {
        flexGrow: 1, // Takes up available space
        width: "100%",
        overflowY: "auto", // In case content overflows
      };

      // Render all pages, but only the active one is visible
      // This keeps their state if they were to become stateful later.
      return (
        <div style={containerStyle}>
          <div
            style={{
              display: currentPage === "Home" ? "flex" : "none",
              height: "100%",
            }}
          >
            <HomePage />
          </div>
          <div
            style={{
              display: currentPage === "Friends" ? "flex" : "none",
              height: "100%",
            }}
          >
            <FriendsPage />
          </div>
          <div
            style={{
              display: currentPage === "Create" ? "flex" : "none",
              height: "100%",
            }}
          >
            <CreatePage />
          </div>
          <div
            style={{
              display: currentPage === "Inbox" ? "flex" : "none",
              height: "100%",
            }}
          >
            <InboxPage />
          </div>
          <div
            style={{
              display: currentPage === "Profile" ? "flex" : "none",
              height: "100%",
            }}
          >
            <ProfilePage />
          </div>
        </div>
      );
    };

    const BottomNavigationBar = ({ currentPage, setCurrentPage }) => {
      const navBarStyle = {
        height: "60px", // Standard height for a nav bar
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around", // Distribute items evenly
        padding: "0 10px", // Some horizontal padding
        borderTop: "1px solid #333", // Optional: a subtle top border
      };

      const navItemStyle = {
        display: "flex",
        flexDirection: "column", // Icon above text
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexGrow: 1, // Each item takes equal width
        textAlign: "center",
        padding: "5px 0", // Padding for touch target
      };

      const iconStyle = (isActive) => ({
        fontSize: "20px", // Adjust as needed for emojis/text icons
        color: isActive ? "white" : "grey",
        marginBottom: "2px", // Space between icon and text
      });

      const textStyle = (isActive) => ({
        fontSize: "10px", // Smaller text for nav items
        color: isActive ? "white" : "grey",
      });

      const createButtonStyle = (isActive) => ({
        ...navItemStyle,
        // Potentially different style for '+' button, e.g. background or larger icon
        // For now, it's the same as others but can be customized.
        // If you want it to look more like a button:
        // backgroundColor: isActive ? '#555' : '#333',
        // borderRadius: '50%', // Make it circular
        // width: '40px',
        // height: '40px',
        // padding: '0' // Reset padding if using fixed width/height for a circular button
      });

      const navItems = [
        { name: "Home", icon: "🏠" },
        { name: "Friends", icon: "👥" },
        { name: "Create", icon: "➕" }, // Using 'Create' as page name for the '+' button's view
        { name: "Inbox", icon: "📥" },
        { name: "Profile", icon: "👤" },
      ];

      return (
        <div style={navBarStyle}>
          {navItems.map((item) => {
            const isActive = currentPage === item.name;
            const currentItemStyle =
              item.name === "Create"
                ? createButtonStyle(isActive)
                : navItemStyle;
            return (
              <div
                key={item.name}
                style={currentItemStyle}
                onClick={() => setCurrentPage(item.name)}
              >
                <span style={iconStyle(isActive)}>{item.icon}</span>
                <span style={textStyle(isActive)}>
                  {item.name === "Create" ? "" : item.name}
                </span>
                {/* No text for Create button, or use 'Create' if preferred */}
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div style={loggedInContainerStyle}>
        <PageContentArea currentPage={currentPage} />
        <BottomNavigationBar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }

  // If user is not logged in, show sign-in button
  const buttonStyle = {
    border: "1px solid rgb(40, 44, 66)",
    backgroundColor: "rgb(16, 21, 31)",
    color: "rgba(255, 255, 255, 0.92)",
    padding: "0.5em 1em",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition:
      "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
  };

  const iconStyle = {
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: "20px",
    marginRight: "0.5em",
    display: "flex",
    alignItems: "center",
    transition: "color 0.3s ease",
  };

  const handleSignIn = async () => {
    console.log("Sign in with Google clicked");

    if (
      typeof firebase === "undefined" ||
      typeof auth === "undefined" ||
      typeof provider === "undefined"
    ) {
      console.error("Firebase not properly initialized");
      return;
    }

    try {
      // Use popup instead of redirect to avoid GitHub Pages parameter issues
      const result = await auth.signInWithPopup(provider);

      // This gives you a Google Access Token
      const credential =
        firebase.auth.GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info
      const user = result.user;

      console.log("Sign-in successful!");
      console.log("Access Token:", token);
      console.log("User:", user);
      console.log("User Email:", user.email);
      console.log("User Name:", user.displayName);
    } catch (error) {
      // Handle Errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      const credential =
        firebase.auth.GoogleAuthProvider.credentialFromError(error);

      console.error("Sign-in failed:");
      console.error("Error Code:", errorCode);
      console.error("Error Message:", errorMessage);
      console.error("Email:", email);
      console.error("Credential:", credential);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <button
        style={buttonStyle}
        onClick={handleSignIn}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgb(30, 35, 45)";
          e.target.style.borderColor = "#C14DD4";
          e.target.style.color = "rgba(255, 255, 255, 1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "rgb(16, 21, 31)";
          e.target.style.borderColor = "rgb(40, 44, 66)";
          e.target.style.color = "rgba(255, 255, 255, 0.92)";
        }}
      >
        <span style={iconStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="1em"
            height="1em"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </span>
        <p style={{ margin: 0 }}>Sign in with Google</p>
      </button>
    </div>
  );
}
