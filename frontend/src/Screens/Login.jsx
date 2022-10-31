import React from 'react';

const loginStyle = {
  content: {
    display: 'block',
    height: '30%',
    width: '30%',
    position: 'absolute',
    left: '30%',
    top: '25%',
    'z-index': '1000',
    padding: '1vw',
    border: '0.1vw solid rgb(182, 182, 182)',
  },
};

const Login = ({closePopup }) => {
  return (
    <div className="popup-container" style={loginStyle}>
     <div className="popup-body">
      <h1>Welcome</h1>
      <button onClick={closePopup}>&times;</button>
     </div>
    </div>
  );
};

export default Login;