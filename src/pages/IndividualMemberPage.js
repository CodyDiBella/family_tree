import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const IndividualMemberPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [parentMembers, setParentMembers] = useState([]);
  const [spouseMember, setSpouseMember] = useState(null);
  const [childrenMembers, setChildrenMembers] = useState([]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const db = getFirestore();
        const memberRef = doc(db, 'familyMembers', id);
        const memberSnapshot = await getDoc(memberRef);
        if (memberSnapshot.exists()) {
          setMember({ id: memberSnapshot.id, ...memberSnapshot.data() });

          // Fetch parent members
          if (memberSnapshot.data().parents) {
            const parentIds = Array.isArray(memberSnapshot.data().parents)
              ? memberSnapshot.data().parents
              : [memberSnapshot.data().parents];
            await Promise.all(
              parentIds.map(async (parentId) => {
                const parentRef = doc(db, 'familyMembers', parentId);
                const parentSnapshot = await getDoc(parentRef);
                if (parentSnapshot.exists()) {
                  setParentMembers((prevParents) => [...prevParents, parentSnapshot.data()]);
                }
              })
            );
          }

          // Fetch spouse member
          if (memberSnapshot.data().spouse) {
            const spouseRef = doc(db, 'familyMembers', memberSnapshot.data().spouse);
            const spouseSnapshot = await getDoc(spouseRef);
            if (spouseSnapshot.exists()) {
              setSpouseMember(spouseSnapshot.data());
            }
          }

          // Fetch children members
          if (memberSnapshot.data().children) {
            const childrenIds = Array.isArray(memberSnapshot.data().children)
              ? memberSnapshot.data().children
              : [memberSnapshot.data().children];
            await Promise.all(
              childrenIds.map(async (childId) => {
                const childRef = doc(db, 'familyMembers', childId);
                const childSnapshot = await getDoc(childRef);
                if (childSnapshot.exists()) {
                  setChildrenMembers((prevChildren) => [...prevChildren, childSnapshot.data()]);
                }
              })
            );
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching member:', error);
      }
    };

    fetchMember();
  }, [id]);

  return (
    <div className="container">
      <div className="page-content">
        {member ? (
          <div>
            <h1>{member.name}</h1>
            <img src={member.imageURL} alt={member.name} style={{ width: '200px', height: '200px' }} />
            <p>Birth Year: {member.birthYear}</p>
            {member.deathYear && <p>Death Year: {member.deathYear}</p>}

            {/* Display Parent Members */}
            {parentMembers.length > 0 && (
              <div className="member-section">
                <h2>Parents</h2>
                {parentMembers.map((parent) => (
                  <div key={parent.id} className="member-card">
                    <img src={parent.imageURL} alt={parent.name} style={{ width: '100px', height: '100px' }} />
                    <p>{parent.name}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Display Spouse Member */}
            {spouseMember && (
              <div className="member-section">
                <h2>Spouse</h2>
                <div className="member-card">
                  <img src={spouseMember.imageURL} alt={spouseMember.name} style={{ width: '100px', height: '100px' }} />
                  <p>{spouseMember.name}</p>
                </div>
              </div>
            )}

            {/* Display Children Members */}
            {childrenMembers.length > 0 && (
              <div className="member-section">
                <h2>{childrenMembers.length === 1 ? 'Child' : 'Children'}</h2>
                {childrenMembers.map((child) => (
                  <div key={child.id} className="member-card">
                    <img src={child.imageURL} alt={child.name} style={{ width: '100px', height: '100px' }} />
                    <p>{child.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default IndividualMemberPage;
