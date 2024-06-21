import Link from 'next/link';
import { FC } from 'react';

interface BreadcrumbProps {
  paths: { label: string; href: string }[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      {paths.map((path, index) => (
        <span key={index}>
          <Link href={path.href} className="hover:underline text-gray-400">
            {path.label}
          </Link>
          {index < paths.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
