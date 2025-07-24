import { NextResponse } from 'next/server'

// Hardcoded users list
const users = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  },
  {
    id: '2',
    email: 'jane@example.com',
    password: 'secure456',
    name: 'Jane Doe',
  },
]

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const { password: _, ...userWithoutPassword } = user

  return NextResponse.json(userWithoutPassword)
}
