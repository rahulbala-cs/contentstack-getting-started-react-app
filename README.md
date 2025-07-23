# Contentstack React Live Preview App

## Description

This is a React starter app that integrates with Contentstack's Content Delivery API and Live Preview SDK. It provides a foundation for building dynamic web applications with real-time content preview capabilities.

## 🎯 Live Preview Implementation

This application includes **complete Contentstack Live Preview functionality** with:

### ✅ Core Features Implemented

1. **Live Preview SDK Integration (v3.2.5)**
   - Proper initialization with stack configuration
   - Real-time communication with Contentstack CMS
   - Environment variable configuration
   - Single shared Stack instance pattern

2. **Edit Tags (Inspector Mode)**
   - Edit tags added to ALL content elements across the application
   - Home page: Hero section, banner image, and content fields
   - Header: Logo, navigation menu items
   - Footer: Copyright text, social links
   - Menu page: All dishes with titles, descriptions, and images
   - Proper field path resolution and `$` object extraction

3. **Real-time Content Updates**
   - Live content synchronization via `onEntryChange` subscription
   - Instant preview of content changes without page reload
   - Proper entry and field identification
   - Content version tracking

4. **Debug and Status Panel**
   - Real-time Live Preview status monitoring
   - Environment variable validation
   - URL parameter checking
   - Troubleshooting guidance
   - SDK initialization verification

### 🛠 Technical Implementation

**SDK Initialization (`src/sdk/utils.ts`):**
```typescript
// Single shared Stack instance with Live Preview configuration
ContentstackLivePreview.init({
  stackDetails: {
    apiKey: REACT_APP_CONTENTSTACK_API_KEY,
    environment: REACT_APP_CONTENTSTACK_ENVIRONMENT
  },
  clientUrlParams: {
    host: getHostByRegion(region)
  }
});
```

**Edit Tags Implementation:**
```typescript
// Extract edit tags from $ object for any field
const editTags = getEditTags(entryObject, fieldPath, locale);
// Apply to JSX elements
<h1 {...editTags}>{content}</h1>
```

**Component Integration:**
- All components use `getEditTags()` with proper field paths
- Components pass the top-level entry object (not nested objects)
- Correct field path resolution (e.g., `"title"`, `"hero_banner.banner_title"`)

### 📋 Environment Variables Required

```bash
REACT_APP_CONTENTSTACK_API_KEY=your_api_key
REACT_APP_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
REACT_APP_CONTENTSTACK_ENVIRONMENT=your_environment
REACT_APP_CONTENTSTACK_REGION=US
REACT_APP_CONTENTSTACK_PREVIEW_TOKEN=your_preview_token
```

### 🔧 How to Test Live Preview

1. **Set Environment Variables**
   - Add all required environment variables to your deployment
   - Ensure preview token is correctly set

2. **Access from Contentstack**
   - Open an entry in Contentstack CMS
   - Click "Live Preview" to open the preview panel
   - Your app should load with Live Preview active

3. **Verify Functionality**
   - Check the Live Preview Status panel (top-right corner)
   - All indicators should be green (✅)
   - Edit content in Contentstack and see real-time updates
   - Click on content elements to open the editor

### 🐛 Troubleshooting

The app includes a comprehensive status panel that shows:

- **SDK Initialization Status**: Whether the Live Preview SDK loaded correctly
- **Preview Mode Detection**: If the app is running in Live Preview iframe
- **URL Parameters**: Live Preview parameters from Contentstack
- **Environment Variables**: Whether all required variables are set
- **Debug Information**: Current URL and SDK status

Common issues and solutions:
- **SDK not initialized**: Check console for errors, verify imports
- **Preview token missing**: Set `REACT_APP_CONTENTSTACK_PREVIEW_TOKEN`
- **Not in preview mode**: Open from Contentstack Live Preview panel
- **Missing URL parameters**: Ensure Live Preview is properly configured in Contentstack

### 📁 Key Files

- `src/sdk/utils.ts` - Live Preview SDK initialization and utilities
- `src/api/index.ts` - API calls using shared Stack instance
- `src/components/VisualExperience.tsx` - Live Preview status panel
- `src/components/*/` - All components with edit tags implementation

### 🎮 Live Demo

1. Clone this repository
2. Set up environment variables
3. Deploy to your hosting platform
4. Configure Live Preview URLs in Contentstack
5. Open Live Preview from any entry

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- Contentstack account with a configured stack

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contentstack-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Contentstack credentials
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Learn More

- [Contentstack Documentation](https://www.contentstack.com/docs/)
- [Live Preview Setup Guide](https://www.contentstack.com/docs/developers/set-up-live-preview/)
- [React Documentation](https://reactjs.org/)

## License

This project is licensed under the MIT License.
