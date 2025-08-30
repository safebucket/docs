import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Secure File Sharing',
    icon: '🔐',
    description: (
      <>
        Share files and folders securely with colleagues, customers, and teams through 
        encrypted bucket-based collaboration with role-based access control.
      </>
    ),
  },
  {
    title: 'Multi-Cloud Storage',
    icon: '☁️',
    description: (
      <>
        Store files across AWS S3, Google Cloud Storage, or MinIO without vendor lock-in.
        Switch providers seamlessly while maintaining the same user experience.
      </>
    ),
  },
  {
    title: 'OIDC Integration',
    icon: '🔑',
    description: (
      <>
        Integrate with any OIDC provider including Google, GitHub, Authelia, or custom 
        identity systems. Manage user access with enterprise-grade authentication.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>
          {icon}
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
