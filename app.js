const { useState } = React;

function MobileFrame({ children }) {
  const frameStyle = {
    width: "800px",
    height: "360px",
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
  };

  return (
    <div style={frameStyle}>
      <div style={screenStyle}>{children}</div>
    </div>
  );
}

function LandscapeFrame({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "red",
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
  const bodyStyle = {
    margin: 0,
    padding: 0,
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
  };

  return (
    <div style={bodyStyle}>
      <MobileFrame>
        <LandscapeFrame>
          <FrameContent />
        </LandscapeFrame>
      </MobileFrame>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
