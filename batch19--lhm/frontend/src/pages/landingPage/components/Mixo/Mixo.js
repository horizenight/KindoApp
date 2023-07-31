import React from 'react';

const Mixo = () => {
  const overlayStyle = {
    position: 'relative',
    width: '100vw',  // Full viewport width
    height: '100vh', // Full viewport height
    overflow: 'hidden', // Prevent scroll bars
  };

  const iframeStyle = {
    width: '100%',
    height: '100%',
    border: '0',
  };

  return (
    <div style={overlayStyle} id='about'>

      <iframe
        title="External Website"
        src="https://www.mixo.io/site/histourists-nu9mu"
        style={iframeStyle}
        sandbox="allow-same-origin allow-scripts allow-forms"
      ></iframe>
    </div>
  );
};

export default Mixo;
