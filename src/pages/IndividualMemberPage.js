import React from 'react';

const IndividualMemberPage = ({ match }) => {
  const memberId = match.params.id;

  return (
    <div>
      <h2>Individual Member Page</h2>
      <p>Member ID: {memberId}</p>
    </div>
  );
}

export default IndividualMemberPage;
