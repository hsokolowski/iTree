import React from 'react';

function Leaf({ category, matchedCount, notMatchedCount, quality }) {
  return (
    <div>
      <p>
        {category} {matchedCount} {notMatchedCount} {quality}
      </p>
    </div>
  );
}

export default Leaf;
