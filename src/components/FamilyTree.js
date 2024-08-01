import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Grid, Card, CardHeader, Avatar, Typography } from '@mui/material';

const FamilyTree = () => {
  const [familyMembers, setFamilyMembers] = useState([]);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const db = getFirestore();
        const familyMembersRef = collection(db, 'familyMembers');
        const snapshot = await getDocs(familyMembersRef);
        const familyMembersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Family members data:', familyMembersData);
        setFamilyMembers(familyMembersData);
      } catch (error) {
        console.error('Error fetching family members:', error);
      }
    };

    fetchFamilyMembers();
  }, []);

  return (
    <div>
      <Typography variant="h1" align="center" gutterBottom>
        The DiBella Family Tree
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {familyMembers.map(member => (
          <Grid item key={member.id} xs={6} sm={4} md={3} textAlign="center">
            <Card component={Link} to={`/member/${member.id}`} sx={{ maxWidth: 200, margin: 'auto' }}>
              <Avatar src={member.imageURL} sx={{ width: 200, height: 200, borderRadius: 5, margin: 'auto' }} />
              <CardHeader
                title={<Typography variant="h5" color="white">{member.name}</Typography>}
                subheader={
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2" color="white">
                      {member.birthYear}
                    </Typography>
                    {member.deathYear && (
                      <Typography variant="body2" color="white">
                        - {member.deathYear}
                      </Typography>
                    )}
                  </div>
                }
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FamilyTree;
