import { redirect } from 'next/navigation';

export default function Authpage() {
  redirect('/auth/login');
  return <></>;
}
