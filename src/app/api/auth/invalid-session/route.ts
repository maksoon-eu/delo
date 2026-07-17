import { signOut } from '@/config/auth';
import { LOGIN_ROUTE } from '@/constants/routes';

export async function GET() {
  await signOut({ redirectTo: LOGIN_ROUTE });
}
