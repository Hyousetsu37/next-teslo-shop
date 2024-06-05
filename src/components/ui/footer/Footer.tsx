import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export function Footer() {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href={'/'} className="mr-2">
        <span className={`${titleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span className="capitalize"> | shop</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </Link>
      <Link href={'/'} className="mr-2">
        {' '}
        Privacy and Legal{' '}
      </Link>
      <Link href={'/'} className="mr-2">
        {' '}
        Locations{' '}
      </Link>
    </div>
  );
}
