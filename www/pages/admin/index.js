import React from 'react';
import withAuth from '../../components/hoc/withAuth';

const Admin = () => (
  <>
    <h1>Welcome to Admin Panel!</h1>
  </>
);

export default withAuth(Admin);
