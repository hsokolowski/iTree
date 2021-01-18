import React from 'react';

function Joint({ children, attr2, predicateName, pivot, match, notMatch, onChange }) {
  return (
    <div>
      <p>
        {attr2} <b>{predicateName}</b> {pivot}
      </p>
      {children}
    </div>
  );
}

export default Joint;
