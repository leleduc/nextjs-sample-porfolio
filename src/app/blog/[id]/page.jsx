'use client';
import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
// import { notFound } from 'next/navigation';
import useSWR from 'swr';

const BlogPost = ({ params }) => {
  // async function getData(id) {
  //   const res = await fetch(`/api/posts/${id}`, {
  //     method: 'GET',
  //     cache: 'no-store',
  //   });

  //   if (!res.ok) {
  //     return notFound();
  //   }

  //   return res.json();
  // }

  //  async function generateMetadata({ params }) {
  //   const post = await getData(params.id);
  //   return {
  //     title: post.title,
  //     description: post.desc,
  //   };
  // }

  // const data = getData(params.id);
  console.log(params.id);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`, fetcher);

  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data?.title}</h1>
          <p className={styles.desc}>{data?.desc}</p>
          <div className={styles.author}>
            <Image
              src={data?.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data?.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image src={data?.img} alt="" fill={true} className={styles.image} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data?.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
