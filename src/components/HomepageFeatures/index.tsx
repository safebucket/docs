import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Secure File Sharing',
        description: (
            <>
                Share files and folders securely with colleagues, customers, and teams through
                encrypted bucket-based collaboration with role-based access control.
            </>
        ),
    },
    {
        title: 'Role-Based Access Control',
        description: (
            <>
                Fine grained sharing permissions with owner, contributor, and viewer roles.
            </>
        ),
    },
    {
        title: 'SSO Integration',
        description: (
            <>
                Single sign-on with any/multiple auth providers and manage their sharing capabilities.
                Forget about login to share files and manage sharing capabilities for each domain.
            </>
        ),
    },
];

function Feature({title, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
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
