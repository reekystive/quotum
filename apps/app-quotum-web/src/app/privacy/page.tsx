import type { Metadata } from 'next';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Privacy Policy | Quotum',
  description:
    'Privacy Policy for Quotum - Learn how we protect your data and privacy when using our quote management platform.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage() {
  return (
    <main
      className={`
        mx-auto max-w-4xl px-4 py-8
        [&_h1]:mb-6 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:text-neutral-900 [&_h1]:dark:text-white
        [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:dark:text-white
        [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-neutral-900 [&_h3]:dark:text-white
        [&_li]:mb-2 [&_li]:list-disc [&_li]:text-neutral-700 [&_li]:dark:text-neutral-300
        [&_p]:mb-4 [&_p]:leading-7 [&_p]:text-neutral-700 [&_p]:dark:text-neutral-300
        [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_strong]:dark:text-white
        [&_ul]:mb-4 [&_ul]:pl-6
      `}
    >
      <h1>Privacy Policy</h1>

      <p
        className={`
          text-sm text-neutral-600
          dark:text-neutral-400
        `}
      >
        <strong>Last Updated:</strong> August 2025
      </p>

      <h2>1. Introduction</h2>
      <p>
        Quotum ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, disclose, and safeguard your information when you use our Quotum Chrome extension and web platform
        (collectively, the "Service"). This policy applies to all users of our services worldwide.
      </p>

      <h2>2. Information We Collect</h2>

      <h3>2.1 Information You Provide Directly</h3>
      <ul>
        <li>
          <strong>Text Quotes:</strong> Content you explicitly select and save from web pages
        </li>
        <li>
          <strong>Page Information:</strong> Titles and URLs of pages where you create quotes
        </li>
        <li>
          <strong>Account Information:</strong> If you create an account, we may collect basic profile information
        </li>
      </ul>

      <h3>2.2 Automatically Collected Information</h3>
      <ul>
        <li>
          <strong>Text Fragment Data:</strong> Technical metadata used to create precise text anchors
        </li>
        <li>
          <strong>Browser Storage:</strong> Local preferences for server environment configuration
        </li>
        <li>
          <strong>Usage Analytics:</strong> Basic usage statistics to improve our service (anonymized)
        </li>
      </ul>

      <h3>2.3 Information We Do NOT Collect</h3>
      <p>We explicitly do not collect:</p>
      <ul>
        <li>Personal browsing history beyond pages where you actively create quotes</li>
        <li>Passwords or authentication credentials</li>
        <li>Personal identification information unless voluntarily provided</li>
        <li>Health, financial, or location data</li>
        <li>Content from pages you visit but don't interact with our extension</li>
      </ul>

      <h2>3. How We Use Your Information</h2>

      <h3>3.1 Primary Purposes</h3>
      <ul>
        <li>
          <strong>Quote Management:</strong> Store and organize your saved quotes
        </li>
        <li>
          <strong>Text Anchoring:</strong> Generate precise links back to original content
        </li>
        <li>
          <strong>Cross-Device Sync:</strong> Access your quotes across different devices
        </li>
        <li>
          <strong>Service Improvement:</strong> Enhance functionality and user experience
        </li>
      </ul>

      <h3>3.2 Legal Basis for Processing (GDPR)</h3>
      <ul>
        <li>
          <strong>Consent:</strong> You explicitly choose to save quotes using our extension
        </li>
        <li>
          <strong>Legitimate Interest:</strong> Providing and improving our quote management service
        </li>
        <li>
          <strong>Contract Performance:</strong> Delivering the service you requested
        </li>
      </ul>

      <h2>4. Data Storage and Security</h2>

      <h3>4.1 Data Storage</h3>
      <ul>
        <li>
          <strong>Local Storage:</strong> Extension preferences stored locally in your browser
        </li>
        <li>
          <strong>Cloud Storage:</strong> Quote data stored securely on our servers
        </li>
        <li>
          <strong>Data Retention:</strong> We retain data as long as your account is active or as needed to provide
          services
        </li>
      </ul>

      <h3>4.2 Security Measures</h3>
      <ul>
        <li>Encryption in transit using HTTPS/TLS protocols</li>
        <li>Secure server infrastructure with access controls</li>
        <li>Regular security audits and updates</li>
        <li>No storage of sensitive authentication data in the extension</li>
      </ul>

      <h2>5. Data Sharing and Disclosure</h2>

      <h3>5.1 We Do NOT Sell Your Data</h3>
      <p>
        We do not sell, trade, or otherwise transfer your personal information to third parties for commercial purposes.
      </p>

      <h3>5.2 Limited Sharing Scenarios</h3>
      <p>We may share information only in these specific circumstances:</p>
      <ul>
        <li>
          <strong>Service Providers:</strong> Third-party services that help us operate our platform (under strict data
          processing agreements)
        </li>
        <li>
          <strong>Legal Compliance:</strong> When required by law, court order, or legal process
        </li>
        <li>
          <strong>Safety Protection:</strong> To protect the rights, property, or safety of Quotum, our users, or others
        </li>
        <li>
          <strong>Business Transfer:</strong> In connection with a merger, acquisition, or sale of assets (users will be
          notified)
        </li>
      </ul>

      <h2>6. Your Privacy Rights</h2>

      <h3>6.1 Access and Control</h3>
      <ul>
        <li>
          <strong>Access:</strong> View all quotes you've saved
        </li>
        <li>
          <strong>Modify:</strong> Edit or update your saved quotes
        </li>
        <li>
          <strong>Delete:</strong> Remove individual quotes or your entire account
        </li>
        <li>
          <strong>Export:</strong> Download your data in a portable format
        </li>
      </ul>

      <h3>6.2 Regional Rights</h3>
      <p>Depending on your location, you may have additional rights:</p>
      <ul>
        <li>
          <strong>GDPR (EU/UK):</strong> Right to portability, rectification, erasure, and objection
        </li>
        <li>
          <strong>CCPA (California):</strong> Right to know, delete, and opt-out of sale
        </li>
        <li>
          <strong>Other Jurisdictions:</strong> Rights as provided by applicable local laws
        </li>
      </ul>

      <h2>7. Chrome Extension Specific Practices</h2>

      <h3>7.1 Permission Usage</h3>
      <ul>
        <li>
          <strong>activeTab:</strong> Only accesses the current tab when you actively use our extension
        </li>
        <li>
          <strong>contextMenus:</strong> Adds right-click menu option for quote creation
        </li>
        <li>
          <strong>scripting:</strong> Injects code only to extract selected text and provide user feedback
        </li>
        <li>
          <strong>storage:</strong> Stores your server preference settings locally
        </li>
        <li>
          <strong>Host Permissions:</strong> Required to work on HTTPS websites where you want to save quotes
        </li>
      </ul>

      <h3>7.2 No Remote Code Execution</h3>
      <p>
        Our extension does not load or execute any remote code. All functionality is contained within the extension
        package reviewed by Chrome Web Store.
      </p>

      <h2>8. Children's Privacy</h2>
      <p>
        Our Service is not directed to children under 13 years of age. We do not knowingly collect personal information
        from children under 13. If we learn that we have collected personal information from a child under 13, we will
        delete that information promptly.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        Your information may be transferred to and processed in countries other than your own. We ensure appropriate
        safeguards are in place for such transfers, including:
      </p>
      <ul>
        <li>Standard contractual clauses approved by relevant authorities</li>
        <li>Adequacy decisions where applicable</li>
        <li>Other legally recognized transfer mechanisms</li>
      </ul>

      <h2>10. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
      <ul>
        <li>Posting the new Privacy Policy on this page</li>
        <li>Updating the "Last Updated" date</li>
        <li>Providing prominent notice for material changes</li>
      </ul>
      <p>Your continued use of the Service after any changes constitutes acceptance of the new Privacy Policy.</p>

      <h2>11. Contact Information</h2>
      <p>
        If you have any questions about this Privacy Policy or our privacy practices, please contact us:
        privacy@quotum.me
      </p>

      <h2>12. Compliance Certifications</h2>
      <p>We certify that:</p>
      <ul>
        <li>We do not sell or transfer user data to third parties, outside of approved use cases</li>
        <li>We do not use or transfer user data for purposes unrelated to our single purpose</li>
        <li>We do not use or transfer user data to determine creditworthiness or for lending purposes</li>
      </ul>

      <div
        className={`
          mt-8 border-t border-neutral-200 pt-8
          dark:border-neutral-700
        `}
      >
        <p
          className={`
            text-sm text-neutral-600
            dark:text-neutral-400
          `}
        >
          This Privacy Policy is effective as of the last updated date above and applies to all users of Quotum services
          worldwide.
        </p>
      </div>
    </main>
  );
}
