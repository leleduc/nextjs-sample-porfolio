import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import post from '@/models/post';

export const GET = async (request) => {
  try {
    await connect();
    const posts = await post.find();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    return new NextResponse('Database error', { status: 500 });
  }
};
