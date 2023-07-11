import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import post from '@/models/post';

export const GET = async (request) => {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  try {
    await connect();
    const posts = await post.find(username && { username });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse('Database error', { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newPost = new post(body);
  try {
    await connect();
    newPost.save();
    return new NextResponse('Post has been created!', { status: 201 });
  } catch (err) {
    return new NextResponse('Database error', { status: 500 });
  }
};
