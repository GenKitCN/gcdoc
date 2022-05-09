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
    title: '简单易用',
    Svg: require('@site/static/img/click-svgrepo-com.svg').default,
    description: (
        <>
            提供多平台的一键安装方案
        </>
    ),
  },
  {
    title: '清晰易读',
    Svg: require('@site/static/img/translate-language-svgrepo-com.svg').default,
    description: (
        <>
            汉化大部分控制台内容
        </>
    ),
  },
  {
    title: '无微不至',
    Svg: require('@site/static/img/comment-discussion-svgrepo-com.svg').default,
    description: (
        <>
            全天候答疑解惑  <del>弱智问题除外</del>
        </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
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
