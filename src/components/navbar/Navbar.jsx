'use client';
import Link from 'next/link';
import React from 'react';
import styles from './navbar.module.css';
import DarkModeToggle from '../darkModeToggle/DarkModeToggle';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const links = [
  {
    id: 1,
    title: 'Home',
    url: '/',
  },
  {
    id: 2,
    title: 'Portfolio',
    url: '/portfolio',
  },
  {
    id: 3,
    title: 'Blog',
    url: '/blog',
  },
  {
    id: 4,
    title: 'About',
    url: '/about',
  },
  {
    id: 5,
    title: 'Contact',
    url: '/contact',
  },
  {
    id: 6,
    title: 'Dashboard',
    url: '/dashboard',
  },
];

const Navbar = () => {
  const session = useSession();
  const router = useRouter();

  // console.log(session);
  return (
    <div className={styles.container}>
      <Link className={styles.logo} href="/">
        leleduc
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((item) => (
          <Link className={styles.link} href={item.url} key={item.id}>
            {item.title}
          </Link>
        ))}
        {session.status === 'authenticated' && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
        {session.status === 'unauthenticated' && (
          <button
            className={styles.logout}
            onClick={() => {
              router?.push('/dashboard/login');
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
