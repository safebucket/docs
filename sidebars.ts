import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Safebucket documentation sidebar
  tutorialSidebar: [
    'intro',
    'features',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/local-full-deployment',
        'getting-started/local-lite-deployment',
        'getting-started/dev-deployment',
        'getting-started/aws-deployment',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/authentication',
        'configuration/mfa',
        {
          type: 'category',
          label: 'Database Providers',
          link: { type: 'doc', id: 'configuration/database-providers/index' },
          items: [
            'configuration/database-providers/postgres',
            'configuration/database-providers/sqlite',
          ],
        },
        {
          type: 'category',
          label: 'Storage Providers',
          link: { type: 'doc', id: 'configuration/storage-providers/index' },
          items: [
            'configuration/storage-providers/aws-s3',
            'configuration/storage-providers/google-cloud-storage',
            'configuration/storage-providers/minio',
            'configuration/storage-providers/rustfs',
            'configuration/storage-providers/generic-s3',
          ],
        },
        {
          type: 'category',
          label: 'Activity Providers',
          link: { type: 'doc', id: 'configuration/activity-providers/index' },
          items: [
            'configuration/activity-providers/filesystem',
            'configuration/activity-providers/loki',
          ],
        },
        {
          type: 'category',
          label: 'Cache Providers',
          link: { type: 'doc', id: 'configuration/cache-providers/index' },
          items: [
            'configuration/cache-providers/memory',
            'configuration/cache-providers/redis',
            'configuration/cache-providers/valkey',
          ],
        },
        {
          type: 'category',
          label: 'Event Providers',
          link: { type: 'doc', id: 'configuration/event-providers/index' },
          items: [
            'configuration/event-providers/jetstream',
            'configuration/event-providers/gcp-pubsub',
            'configuration/event-providers/aws-sqs',
            'configuration/event-providers/memory',
          ],
        },
        {
          type: 'category',
          label: 'Notification Providers',
          link: {
            type: 'doc',
            id: 'configuration/notification-providers/index',
          },
          items: [
            'configuration/notification-providers/filesystem',
            'configuration/notification-providers/smtp',
          ],
        },
        'configuration/environment-variables',
      ],
      collapsed: false,
    },
  ],
};

export default sidebars;
