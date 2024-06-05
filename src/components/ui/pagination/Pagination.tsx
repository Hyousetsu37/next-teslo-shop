'use client';
import { generatePagination } from '@/utils';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page') ?? 1;
  const currentPage = Number(pageParam) > 0 ? Number(pageParam) : 1;
  const allPages = generatePagination(currentPage, totalPages);

  if (+pageParam < 1 || isNaN(+pageParam)) {
    redirect(pathName);
  }

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }

    if (+pageNumber === 0) {
      return `${pathName}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className={`page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                currentPage === 1 ? 'pointer-events-none text-gray-400' : ''
              }`}
              href={createPageUrl(currentPage - 1)}
              aria-disabled={currentPage === 1 ? 'true' : 'false'}
              tabIndex={currentPage === 1 ? -1 : undefined}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={page + '-' + index} className="page-item">
              <a
                className={`page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                  page === currentPage
                    ? 'bg-blue-500 shadow-sm text-white hover:bg-blue-700 hover:text-white'
                    : ''
                }`}
                href={createPageUrl(page)}
              >
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <Link
              className={`page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none ${
                currentPage === totalPages
                  ? 'pointer-events-none  text-gray-400'
                  : ''
              }`}
              href={createPageUrl(currentPage + 1)}
              aria-disabled={currentPage === totalPages ? 'true' : 'false'}
              tabIndex={currentPage === totalPages ? 1 : undefined}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
