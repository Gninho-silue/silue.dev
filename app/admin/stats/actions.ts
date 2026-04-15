'use server';

export async function checkPassword(password: string): Promise<boolean> {
  return password === process.env.ADMIN_PASSWORD;
}
