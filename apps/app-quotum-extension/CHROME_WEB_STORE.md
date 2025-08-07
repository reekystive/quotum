<!-- markdownlint-disable MD040 MD034 MD036 -->

# Chrome Web Store Submission Form

This document contains all the required information for submitting the Quotum extension to Chrome Web Store.

## Single Purpose

### Single Purpose Description

```
Quotum enables users to save precise text quotes from web pages with exact location anchors. Users select text on any HTTPS website, right-click to create a quote, and the extension captures the selected text with page title and URL. All quotes are saved with text fragment anchors that link back to the exact location on the original page. The extension communicates with Quotum servers to store and sync quotes across devices for easy access and sharing.
```

## Permission Justifications

### contextMenus Justification

```
The contextMenus permission adds a "Create Quote" option to the browser's right-click menu when users select text. This provides an intuitive workflow: select text → right-click → create quote. The context menu only appears when text is selected and serves as the primary user interface for our quote creation feature. This permission does not access any user data and only creates menu items for user interaction.
```

### scripting Justification

```
The scripting permission enables on-demand code injection when users create quotes. We inject: 1) Text fragment generation utilities for precise quote anchoring, 2) Functions to extract user-selected text and page metadata, 3) UI feedback components for user notifications. All injection occurs only in response to explicit user actions (right-click menu selection) and processes only the text users have actively selected. No persistent monitoring or background injection occurs.
```

### activeTab Justification

```
The activeTab permission allows access to the current tab when users actively create quotes. We use this to: 1) Execute quote extraction scripts on the page where users selected text, 2) Read page title and URL for quote metadata, 3) Inject user feedback notifications. This permission activates only when users invoke our extension through the context menu, ensuring we access tabs only during explicit user interactions with our quote creation feature.
```

### storage Justification

```
The storage permission saves user configuration preferences locally in the browser. Specifically, we store the user's selected server environment (production, development, or local) for API connections. This allows users to choose which Quotum server instance they want to connect to without reconfiguring each time. All stored data relates only to user preferences and contains no personal or sensitive information, enhancing user experience by maintaining their chosen settings.
```

### Host Permission Justification

```
Host permissions for https://quotum.me/*, https://dev.quotum.me/*, and http://localhost:3000/* are required for our extension to communicate with Quotum API servers. These permissions enable: 1) Saving user-created quotes to the selected server environment, 2) API calls for quote management and synchronization, 3) Communication with production, development, and local server instances. We only make network requests when users explicitly create quotes, and all requests contain only the quote data users chose to save. No background tracking or data collection occurs.
```

## Remote Code Usage

**Selection**: No, I am not using Remote code

### Justification

```
Quotum does not use remote code. All JavaScript functionality is contained within the extension package distributed through Chrome Web Store. We do not load external scripts, evaluate dynamic code, or reference external JavaScript files. Text processing, fragment generation, and user interface components are built into the extension. Communication with servers involves only standard API calls using fetch() to save user-created quotes, with no code execution from remote sources.
```

## Data Usage

### Data Collection

**Selected Categories:**

- ✅ **Website content** - "We collect text that users explicitly select and save as quotes, along with page titles and URLs"

**Not Selected:**

- ❌ Personally identifiable information
- ❌ Health information
- ❌ Financial and payment information
- ❌ Authentication information
- ❌ Personal communications
- ❌ Location
- ❌ Web history
- ❌ User activity

### Compliance Certifications

**All three certifications must be checked:**

- ✅ I do not sell or transfer user data to third parties, outside of the approved use cases
- ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes

## Privacy Policy

### Privacy Policy URL

```
https://quotum.me/privacy
```

## Additional Information

### Category

**Recommended Category**: Tools

### Permissions Summary

- `contextMenus` - Right-click menu functionality
- `scripting` - On-demand code injection for quote extraction
- `activeTab` - Access to current tab during user-initiated actions
- `storage` - Local storage of user preferences
- `host_permissions` - API communication with Quotum servers

### Server Environments

The extension connects to these specific domains:

- **Production**: https://quotum.me/*
- **Development**: https://dev.quotum.me/*
- **Local Development**: http://localhost:3000/\*

---

_Last Updated: August 2025_
