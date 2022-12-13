import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const introUrl = useBaseUrl('Introduction');
  return <Redirect to={introUrl} />;
}
