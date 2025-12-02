import React from 'react'

function Activity({ onClose }) {
  return (
    <div className='activity-tab' onClick={onClose}>
      
      <div 
        className="activity-container"
        onClick={(e) => e.stopPropagation()}
      >
        This is the activity dashboard
      </div>

    </div>
  );
}

export default Activity
