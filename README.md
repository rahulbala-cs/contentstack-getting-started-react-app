# Contentstack getting started React App

## Description

This is a React starter app that integrates with Contentstack's Content Delivery API. It provides a foundation for building dynamic web applications that fetch and display content from Contentstack's headless CMS.

## Live Preview Implementation

This application now includes **complete Contentstack Live Preview functionality** with:

### ✅ Features Implemented

1. **Live Preview SDK Integration**
   - Updated to latest `@contentstack/live-preview-utils` package
   - Proper initialization with stack configuration
   - Real-time communication with Contentstack CMS

2. **Edit Tags (Inspector Mode)**
   - Edit tags added to ALL content elements across the application
   - Home page: Hero section, headings, descriptions, CTAs
   - Header: Logo and navigation links
   - Footer: Navigation, logo, information sections, copyright
   - Menu: Course categories and individual dish items
   - Proper `data-contentstack-*` attributes for field identification

3. **Real-time Live Updates**
   - Live content synchronization using `onEntryChange` subscriptions
   - Automatic re-fetching of data when content is modified in CMS
   - Instant preview updates without page refresh

4. **Enhanced Utility Functions**
   - `generateLiveEditTags()` - Automatically generates edit tags for any content
   - `getEditTagsProps()` - Creates entry-specific edit tags
   - `getAssetEditTagsProps()` - Creates asset-specific edit tags
   - Robust data structure handling with fallback UID detection

### 🎯 Live Preview Capabilities

- **Inspector Mode**: Click on any content element to directly edit it in Contentstack
- **Real-time Updates**: See content changes instantly as you type in the CMS
- **Field-level Editing**: Edit specific fields like headings, descriptions, images, etc.
- **Navigation Updates**: Modify menu items and links with live preview
- **Asset Management**: Update images and other assets with real-time reflection

### 🔧 Configuration

The Live Preview is configured in `src/sdk/utils.ts` with:

```typescript
ContentstackLivePreview.init({
  stackSdk: Stack,
  stackDetails: {
    apiKey: REACT_APP_CONTENTSTACK_API_KEY,
    environment: REACT_APP_CONTENTSTACK_ENVIRONMENT,
  },
  clientUrlParams: {
    host: getHostByRegion(REACT_APP_CONTENTSTACK_REGION),
  },
  enable: true,
  debug: process.env.NODE_ENV === 'development',
});
```

### 📝 Edit Tags Structure

Edit tags are automatically generated with the following attributes:
- `data-contentstack-entry-uid` - Entry identifier
- `data-contentstack-content-type-uid` - Content type identifier
- `data-contentstack-field-uid` - Specific field identifier
- `data-contentstack-locale` - Content locale

### 🧪 Testing Live Preview

1. **Setup in Contentstack**:
   - Configure preview URL in your Contentstack stack settings
   - Set up preview environment pointing to `http://localhost:3000`

2. **Enable Live Preview**:
   - Open any entry in Contentstack CMS
   - Click "Live Preview" to open side-by-side editing
   - Make changes to content and see instant updates

3. **Test Inspector Mode**:
   - Hover over content elements to see edit indicators
   - Click on any content to jump directly to field editing
   - Modify text, images, or other content types

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/contentstack/contentstack-getting-started-react-app.git
   ```

2. Navigate to the project directory:

   ```
   cd contentstack-getting-started-react-app
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Rename `.env.sample` as `.env` file in the root directory and add your Contentstack API keys:

   ```
   REACT_APP_CONTENTSTACK_API_KEY=YOUR_STACK_API_KEY
   REACT_APP_CONTENTSTACK_DELIVERY_TOKEN=YOUR_DELIVERY_TOKEN
   REACT_APP_CONTENTSTACK_ENVIRONMENT=YOUR_ENVIRONMENT
   REACT_APP_CONTENTSTACK_REGION=YOUR_STACK_REGION
   REACT_APP_CONTENTSTACK_PREVIEW_TOKEN=YOUR_PREVIEW_TOKEN
   ```

5. Run the development server:
   ```
   npm start
   ```

## Configuration

To configure the app with your Contentstack account:

- Replace `YOUR_STACK_API_KEY`, `YOUR_DELIVERY_TOKEN`, `YOUR_ENVIRONMENT`, `YOUR_STACK_REGION`, and `YOUR_PREVIEW_TOKEN` in the `.env` file with your Contentstack API key, delivery token, environment name, region, and preview token respectively.

**Supported Regions:**

- **AWS North America:** `US`
- **AWS Europe:** `EU`
- **Azure North America:** `AZURE_NA`
- **Azure Europe:** `AZURE_EU`
- **GCP North America:** `GCP_NA`

## Usage

1. Once the app is running, navigate to `http://localhost:3000` in your web browser.
2. Explore the app to see how it fetches and displays content from Contentstack.
3. Enable Live Preview in Contentstack to experience real-time content editing.
4. Customize and extend the app as needed for your project requirements.

## Features

- Integration with Contentstack's Content Delivery API
- Dynamic rendering of content fetched from Contentstack
- **Complete Live Preview implementation with edit tags and real-time updates**
- **Inspector mode for direct field editing**
- **Real-time content synchronization**

## Architecture

The Live Preview implementation follows Contentstack best practices:

- **Client-Side Rendering (CSR)** approach for real-time updates
- **RESTful API integration** with Content Delivery API
- **Proper edit tag implementation** for inspector mode
- **Event-driven live updates** using SDK subscriptions
- **Type-safe TypeScript implementation**

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, feel free to [open an issue](https://github.com/contentstack/contentstack-getting-started-react-app/issues).
