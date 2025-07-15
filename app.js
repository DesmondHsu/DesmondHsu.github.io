const { useState } = React;

function OrientationSwitch({ isLandscape, onToggle }) {
  const switchStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    color: "#333",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    transition: "all 0.3s ease",
    zIndex: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  return (
    <button
      style={switchStyle}
      onClick={onToggle}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(255, 255, 255, 1)";
        e.target.style.borderColor = "rgba(0, 0, 0, 0.2)";
        e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "rgba(255, 255, 255, 0.9)";
        e.target.style.borderColor = "rgba(0, 0, 0, 0.1)";
        e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      }}
      title={isLandscape ? "Switch to Portrait" : "Switch to Landscape"}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        {isLandscape ? (
          // Portrait icon
          <path d="M17 19H7V5h10v14zm-10 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2z" />
        ) : (
          // Landscape icon
          <path d="M1 18h22V6H1v12zm2-10h18v8H3V8zm1 1v6h16V9H4z" />
        )}
      </svg>
    </button>
  );
}

function MobileFrame({ children, isLandscape }) {
  const frameStyle = {
    width: isLandscape ? "800px" : "360px",
    height: isLandscape ? "360px" : "720px",
    backgroundColor: "#333",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden",
  };

  const screenStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={frameStyle}>
      <div style={screenStyle}>{children}</div>
    </div>
  );
}

function AppFrame({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

function App() {
  // Load orientation preference from localStorage, default to portrait (false)
  const [isLandscape, setIsLandscape] = useState(() => {
    const saved = localStorage.getItem('orientation-preference');
    console.log('Loading orientation preference:', saved);
    const result = saved ? JSON.parse(saved) : false; // Default to portrait
    console.log('Initial orientation:', result ? 'landscape' : 'portrait');
    return result;
  });

  const bodyStyle = {
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    overflow: "auto",
  };

  const toggleOrientation = () => {
    const newOrientation = !isLandscape;
    console.log('Toggling orientation from', isLandscape ? 'landscape' : 'portrait', 'to', newOrientation ? 'landscape' : 'portrait');
    setIsLandscape(newOrientation);
    // Save preference to localStorage
    localStorage.setItem('orientation-preference', JSON.stringify(newOrientation));
    console.log('Saved to localStorage:', localStorage.getItem('orientation-preference'));
  };

  return (
    <div style={bodyStyle}>
      <OrientationSwitch
        isLandscape={isLandscape}
        onToggle={toggleOrientation}
      />
      <MobileFrame isLandscape={isLandscape}>
        <AppFrame>
          <FrameContent />
        </AppFrame>
      </MobileFrame>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
