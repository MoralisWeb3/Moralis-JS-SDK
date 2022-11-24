import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Build',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>Build and prototype dapps quickly using familiar platforms like Firebase.</>,
  },
  {
    title: 'Learn',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: <>Understand and master Web3 through practical projects and expert courses.</>,
  },
  {
    title: 'Scale',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: <>Trusted enterprise APIs that empower businesses to integrate blockchain into everything.</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
