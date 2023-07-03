import React from 'react';
import NotFoundError from '@/components/organisms/error/NotFoundError';

export type NotFoundPageProps = {};

function NotFoundPage(props: NotFoundPageProps) {
  return <NotFoundError />;
}

export default NotFoundPage;
