import React, { FC } from 'react';
import { SITE_NAME } from 'utils/config';
import LinkComponent from './LinkComponent';
import { ConnectKitButton } from 'connectkit';
import clsx from 'clsx';

interface Props {
  className?: string;
}

const Header: FC<Props> = ({ className }) => {
  return (
    <header
      className={clsx(
        'flex bg-gray-100 px-4 py-3 justify-between items-center',
        className
      )}>
      <LinkComponent href="/">
        <p className="text-xl font-bold">{SITE_NAME}</p>
      </LinkComponent>
      <div>
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;
