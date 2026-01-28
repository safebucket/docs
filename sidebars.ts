import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
        {
            type: 'category',
            label: 'Getting Started',
            items: [
                'getting-started/dev-deployment',
                'getting-started/local-deployment',
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
                'configuration/storage-providers',
                'configuration/environment-variables',
            ],
            collapsed: false,
        },
        {
            type: 'category',
            label: 'API Reference',
            items: [
                'api/overview',
            ],
            collapsed: false,
        },
    ],
};

export default sidebars;
