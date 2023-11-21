import React from 'react';

function ModalComponent({ closeModal, children }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:3,
      }}
    >
      <div
        style={{
          backgroundColor: '#242A32',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '80%',
          maxHeight: '80%',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {children}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={closeModal}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          >
            <div style={{ color: '#0296E5' }}>Kapat</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;