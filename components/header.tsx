import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--background100);
  border-bottom: 1px solid var(--border);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled.a<{ active: boolean }>`
  color: ${(props) => (props.active ? 'var(--primary)' : 'var(--foreground)')};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

export default function Header() {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <Nav>
        <Link href="/" passHref legacyBehavior>
          <NavLink active={router.pathname === '/'}>Clamp Generator</NavLink>
        </Link>
        <Link href="/typography" passHref legacyBehavior>
          <NavLink active={router.pathname === '/typography'}>Typography Scale</NavLink>
        </Link>
      </Nav>
    </HeaderWrapper>
  );
}
