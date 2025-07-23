# Contentstack getting started React App

## Description

This is a React starter app that integrates with Contentstack's Content Delivery API. It provides a foundation for building dynamic web applications that fetch and display content from Contentstack's headless CMS.

## 🎨 Complete Visual Experience Implementation

This application now includes **complete Contentstack Visual Experience functionality** with:

### ✅ Features Implemented

1. **Live Preview SDK Integration**
   - Updated to latest `@contentstack/live-preview-utils` package (v3.2.5)
   - Proper initialization with stack configuration
   - Real-time communication with Contentstack CMS
   - Advanced configuration for all Visual Experience features

2. **Edit Tags (Inspector Mode)**
   - Edit tags added to ALL content elements across the application
   - Home page: Hero section, headings, descriptions, CTAs
   - Header: Logo and navigation links
   - Footer: Navigation, logo, information sections, copyright
   - Menu: Course categories and individual dish items
   - Proper `data-contentstack-*` attributes for field identification
   - Enhanced asset and reference edit tags

3. **Real-time Live Updates**
   - Live content synchronization using `onEntryChange` subscriptions
   - Automatic re-fetching of data when content is modified in CMS
   - Instant preview updates without page refresh

4. **Timeline Preview 📅**
   - **Time-based content preview** - See how your content will look at different points in time
   - **Scheduled content visualization** - Preview future content changes without pre-scheduling
   - **Auto-refresh functionality** - Content updates automatically based on timeline
   - **Date/time picker** - Select specific dates and times for content preview
   - **Timeline mode toggle** - Enable/disable timeline functionality

5. **Visual Builder 🔧**
   - **Drag-and-drop editing** - Move content elements visually
   - **Inline editing mode** - Edit content directly on the page
   - **Inspector mode** - Click elements to edit in sidebar
   - **Combined edit modes** - Use both inspector and inline editing simultaneously
   - **Real-time visual editing** - See changes instantly as you edit
   - **Editable content areas** - Enhanced support for various HTML elements

6. **Audience Preview 👥**
   - **Multi-audience support** - Preview content for different user segments
   - **Personalization engine** - Content adapts based on audience selection
   - **Audience-specific content** - Different content for different user groups
   - **Geographic targeting** - Content varies by location
   - **Customer type segmentation** - Premium vs. standard user content

7. **Device Preview 📱**
   - **Responsive design testing** - Preview on mobile, tablet, and desktop
   - **Orientation toggle** - Switch between portrait and landscape
   - **Custom viewport sizes** - Set specific screen dimensions
   - **Device-specific previews** - See exactly how content appears on different devices
   - **Real-time device switching** - Instant preview updates when changing devices

8. **Enhanced Utility Functions**
   - `getEditTags()` - Enhanced edit tags generation with comprehensive field support
   - `getAssetEditTags()` - Asset-specific edit tags for images and files
   - `getReferenceEditTags()` - Reference-specific edit tags for linked content
   - `timelineUtils` - Complete timeline management utilities
   - `visualBuilderUtils` - Visual builder control utilities
   - `audiencePreviewUtils` - Audience and personalization utilities
   - `devicePreviewUtils` - Device preview and responsive design utilities

### 🎯 Visual Experience Capabilities

- **Inspector Mode**: Click on any content element to directly edit it in Contentstack
- **Timeline Mode**: Preview how your site will look at different dates and times
- **Visual Builder**: Drag and drop content elements, edit inline
- **Device Testing**: See your content on mobile, tablet, and desktop
- **Audience Preview**: Test content for different user segments
- **Real-time Updates**: See content changes instantly as you type in the CMS
- **Field-level Editing**: Edit specific fields like headings, descriptions, images, etc.
- **Navigation Updates**: Modify menu items and links with live preview
- **Asset Management**: Update images and other assets with real-time reflection
- **Responsive Design**: Test layouts across different screen sizes

### 🔧 Enhanced Configuration

The Visual Experience is configured in `src/sdk/utils.ts` with:

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
  // Enhanced configuration for complete Visual Experience
  config: {
    // Live Preview configuration
    livePreview: {
      enable: true,
      tagsAsObject: true,
      onlyInspectorMode: false, // Allow both inspector and live edit modes
      pollInterval: 2000, // Polling interval for content updates
    },
    // Timeline configuration for time-based content preview
    timeline: {
      enable: true,
      mode: 'timeline', // Enable timeline mode
      enableAutoRefresh: true,
      refreshInterval: 5000, // Refresh every 5 seconds
    },
    // Visual Builder configuration for drag-and-drop editing
    visualBuilder: {
      enable: true,
      enableInlineEditing: true,
      enableRealtimeEditing: true,
      editableTags: ['div', 'section', 'article', 'header', 'footer', 'main', 'aside'],
    },
    // Audience Preview configuration
    audiencePreview: {
      enable: true,
      enablePersonalization: true,
    }
  },
  // Enhanced rendering options
  renderOptions: {
    // Enable all edit modes
    editMode: 'all', // 'inspector', 'inline', 'all'
    // Enhanced edit tag generation
    generateEditTags: true,
    // Device preview support
    devicePreview: {
      enable: true,
      defaultDevice: 'desktop',
      devices: ['mobile', 'tablet', 'desktop'],
    },
    // Viewport controls
    viewportControls: {
      enable: true,
      responsiveMode: true,
      orientationToggle: true,
    }
  }
});
```

### 📝 Enhanced Edit Tags Structure

Edit tags are automatically generated with comprehensive attributes:
- `data-contentstack-entry-uid` - Entry identifier
- `data-contentstack-content-type-uid` - Content type identifier
- `data-contentstack-field-uid` - Specific field identifier
- `data-contentstack-locale` - Content locale
- `data-contentstack-version` - Content version
- `data-contentstack-metadata` - Field metadata
- `className` - CSS classes for styling and identification

### 🎨 Visual Experience Panel

The app includes a floating Visual Experience panel that provides:

- **Device Preview Controls** - Switch between mobile, tablet, desktop views
- **Timeline Controls** - Enable timeline mode and select preview dates
- **Visual Builder Controls** - Toggle visual builder and edit modes
- **Audience Preview Controls** - Select different audience segments
- **Feature Status Dashboard** - Real-time status of all Visual Experience features

### 🧪 Testing Complete Visual Experience

1. **Setup in Contentstack**:
   - Configure preview URL in your Contentstack stack settings
   - Set up preview environment pointing to your deployment URL
   - Ensure Preview Token is configured with proper permissions

2. **Enable Live Preview**:
   - Open any entry in Contentstack CMS
   - Click "Live Preview" to open side-by-side editing
   - Make changes to content and see instant updates

3. **Test Timeline**:
   - Enable Timeline mode in the Visual Experience panel
   - Select different dates and times to see scheduled content
   - Observe how content changes based on publish schedules

4. **Test Visual Builder**:
   - Enable Visual Builder mode
   - Try drag-and-drop editing of content elements
   - Switch between inspector and inline edit modes

5. **Test Device Preview**:
   - Switch between mobile, tablet, and desktop views
   - Toggle orientation to test responsive design
   - Verify content adapts properly to different screen sizes

6. **Test Audience Preview**:
   - Select different audience segments
   - Observe how content changes for different user groups
   - Test personalization features

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
4. Use the Visual Experience panel to test Timeline, Visual Builder, and Audience Preview features.
5. Customize and extend the app as needed for your project requirements.

## Features

- Integration with Contentstack's Content Delivery API
- Dynamic rendering of content fetched from Contentstack
- **Complete Live Preview implementation with edit tags and real-time updates**
- **Timeline Preview for time-based content visualization**
- **Visual Builder for drag-and-drop content editing**
- **Audience Preview for personalized content testing**
- **Device Preview for responsive design testing**
- **Inspector mode for direct field editing**
- **Real-time content synchronization**
- **Comprehensive Visual Experience panel**

## Architecture

The Visual Experience implementation follows Contentstack best practices:

- **Client-Side Rendering (CSR)** approach for real-time updates
- **RESTful API integration** with Content Delivery API
- **Comprehensive edit tag implementation** for all editing modes
- **Event-driven live updates** using SDK subscriptions
- **Type-safe TypeScript implementation**
- **Modular utility functions** for different Visual Experience features
- **Responsive design testing** with device preview capabilities
- **Timeline-based content preview** for scheduled content
- **Audience segmentation** for personalized content testing

## 🚀 Advanced Features

### Timeline Utils
```typescript
import { timelineUtils } from './sdk/utils';

// Set timeline date for preview
timelineUtils.setTimelineDate(new Date('2024-12-25'));

// Get current timeline date
const currentDate = timelineUtils.getTimelineDate();

// Toggle timeline mode
timelineUtils.toggleTimeline(true);
```

### Visual Builder Utils
```typescript
import { visualBuilderUtils } from './sdk/utils';

// Enable visual builder
visualBuilderUtils.toggleVisualBuilder(true);

// Set edit mode
visualBuilderUtils.setEditMode('all'); // 'inspector', 'inline', 'all'

// Enable drag and drop
visualBuilderUtils.enableDragDrop(true);
```

### Audience Preview Utils
```typescript
import { audiencePreviewUtils } from './sdk/utils';

// Set audience for preview
audiencePreviewUtils.setAudience('premium-customers');

// Enable personalization
audiencePreviewUtils.enablePersonalization(true);
```

### Device Preview Utils
```typescript
import { devicePreviewUtils } from './sdk/utils';

// Set device for preview
devicePreviewUtils.setDevice('mobile'); // 'mobile', 'tablet', 'desktop'

// Toggle orientation
devicePreviewUtils.toggleOrientation();

// Set custom viewport size
devicePreviewUtils.setViewportSize(375, 667);
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, feel free to [open an issue](https://github.com/contentstack/contentstack-getting-started-react-app/issues).
