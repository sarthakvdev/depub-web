import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

const LinkComponent: FC<Props> = ({
  href,
  children,
  isExternal,
  className,
}: Props) => {
  const isExternalCheck = href.match(/^([a-z0-9]*:|.{0})\/\/.*$/) || isExternal;

  if (isExternalCheck) {
    return (
      <a
        className="underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link href={href}>{children}</Link>;
};

export default LinkComponent;
