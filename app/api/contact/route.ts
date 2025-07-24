import { NextResponse } from 'next/server';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Simulate 1.5s delay
  await delay(1500);

  return NextResponse.json({
    success: true,
    data: { name, email, phone, subject, message },
  });
}
