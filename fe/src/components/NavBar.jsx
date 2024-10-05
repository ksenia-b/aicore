import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #333;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 15px;

  &:hover {
    color: #ddd;
  }
`;

const UserInfo = styled.span`
  margin-right: 15px;
`;

const LogoutButton = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <Nav>
            <NavLinks>
                <StyledLink to="/threads">Threads</StyledLink>
            </NavLinks>

            {isAuthenticated && <NavLinks>
                <UserInfo>Hello, {user?.email}</UserInfo>
                <LogoutButton onClick={logout}>Logout</LogoutButton>
            </NavLinks>
            }
        </Nav>
    );
};

export default Navbar;
