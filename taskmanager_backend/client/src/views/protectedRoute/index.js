import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const token = useSelector(state => state.user.userToken);
  useEffect(() => {
      if (!token) {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
