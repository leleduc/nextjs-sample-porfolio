'use client';
import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
// import Error from 'next/error';

// async function getData() {
//   const res = await fetch('/api/posts', {
//     method: 'GET',
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

const Blog = () => {
  const router1 = useRouter;
  console.log(router1);
  // let hostname = location.hostname;
  // console.log(hostname);
  // const url = window.location;
  // console.log(url);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);
  console.log(data);

  // const data = getData();
  return (
    <div className={styles.mainContainer}>
      {data?.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item.id}
        >
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
