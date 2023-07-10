import { NextResponse } from 'next/server';
import connect from '@/utils/db';
import user from '@/models/user';

export const GET = async (request) => {
  try {
    await connect();
    const users = await user.find();
    return new NextResponse(users, { status: 200 });
  } catch (err) {
    return new NextResponse('Database error', { status: 500 });
  }
};
