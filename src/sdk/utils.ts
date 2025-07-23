import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

const getLivePreviewHostByRegion = (region: string) => {
	switch (region) {
		case "US":
			return "rest-preview.contentstack.com";
		case "EU":
			return "eu-rest-preview.contentstack.com";
		case "AZURE_NA":
			return "azure-na-rest-preview.contentstack.com";
		case "AZURE_EU":
			return "azure-eu-rest-preview.contentstack.com";
		default:
			return "rest-preview.contentstack.com";
	}
};

const getHostByRegion = (region: string) => {
	switch (region) {
		case "US":
			return "app.contentstack.com";
		case "EU":
			return "eu-app.contentstack.com";
		case "AZURE_NA":
			return "azure-na-app.contentstack.com";
		case "AZURE_EU":
			return "azure-eu-app.contentstack.com";
		case "GCP_NA":
			return "gcp-na-api.contentstack.com";
		default:
			return "app.contentstack.com";
	}
};

// Enhanced Live Preview initialization with Timeline and Visual Builder support
export const initializeContentstackSdk = () => {
	const {
		REACT_APP_CONTENTSTACK_API_KEY,
		REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
		REACT_APP_CONTENTSTACK_ENVIRONMENT,
		REACT_APP_CONTENTSTACK_REGION,
		REACT_APP_CONTENTSTACK_PREVIEW_TOKEN
	} = process.env;

	const region: Contentstack.Region | undefined = (function (
		regionValue: string
	): Contentstack.Region | undefined {
		switch (regionValue) {
			case "US":
				return Contentstack.Region.US;
			case "EU":
				return Contentstack.Region.EU;
			case "AZURE_NA":
				return Contentstack.Region.AZURE_NA;
			case "AZURE_EU":
				return Contentstack.Region.AZURE_EU;
			case "GCP_NA":
				return Contentstack.Region.GCP_NA;
			default:
				return undefined;
		}
	})(REACT_APP_CONTENTSTACK_REGION as string);

	if (!region) {
		throw new Error(
			"Invalid region provided in REACT_APP_CONTENTSTACK_REGION."
		);
	}

	const Stack = Contentstack.Stack({
		api_key: REACT_APP_CONTENTSTACK_API_KEY as string,
		delivery_token: REACT_APP_CONTENTSTACK_DELIVERY_TOKEN as string,
		environment: REACT_APP_CONTENTSTACK_ENVIRONMENT as string,
		region: region,
		live_preview: {
			enable: true,
			host: getLivePreviewHostByRegion(REACT_APP_CONTENTSTACK_REGION as string),
			preview_token: REACT_APP_CONTENTSTACK_PREVIEW_TOKEN as string
		}
	});

	// Enhanced Live Preview initialization with all Visual Experience features
	ContentstackLivePreview.init({
		stackSdk: Stack,
		stackDetails: {
			apiKey: REACT_APP_CONTENTSTACK_API_KEY as string,
			environment: REACT_APP_CONTENTSTACK_ENVIRONMENT as string,
		},
		clientUrlParams: {
			host: getHostByRegion(REACT_APP_CONTENTSTACK_REGION as string),
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
	} as any);

	// Set enhanced global variables for feature detection
	(window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__ = true;
	(window as any).__CONTENTSTACK_TIMELINE_ENABLED__ = true;
	(window as any).__CONTENTSTACK_VISUAL_BUILDER_ENABLED__ = true;
	(window as any).__CONTENTSTACK_AUDIENCE_PREVIEW_ENABLED__ = true;
	
	return Stack;
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;

// Enhanced Timeline utilities
export const timelineUtils = {
	// Set timeline date for content preview
	setTimelineDate: (date: Date) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.setTimelineDate === 'function') {
			sdk.setTimelineDate(date);
		} else {
			console.warn('Timeline feature not available in current SDK version');
		}
	},
	
	// Get current timeline date
	getTimelineDate: () => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.getTimelineDate === 'function') {
			return sdk.getTimelineDate();
		}
		return new Date();
	},
	
	// Enable/disable timeline mode
	toggleTimeline: (enable: boolean) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.toggleTimeline === 'function') {
			sdk.toggleTimeline(enable);
		} else {
			console.warn('Timeline toggle not available in current SDK version');
		}
	}
};

// Enhanced Visual Builder utilities
export const visualBuilderUtils = {
	// Enable/disable visual builder mode
	toggleVisualBuilder: (enable: boolean) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.toggleVisualBuilder === 'function') {
			sdk.toggleVisualBuilder(enable);
		} else {
			console.warn('Visual Builder not available in current SDK version');
		}
	},
	
	// Set edit mode (inspector, inline, or both)
	setEditMode: (mode: 'inspector' | 'inline' | 'all') => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.setEditMode === 'function') {
			sdk.setEditMode(mode);
		} else {
			console.warn('Edit mode setting not available in current SDK version');
		}
	},
	
	// Enable drag-and-drop editing
	enableDragDrop: (enable: boolean) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.enableDragDrop === 'function') {
			sdk.enableDragDrop(enable);
		} else {
			console.warn('Drag and drop not available in current SDK version');
		}
	}
};

// Enhanced Audience Preview utilities
export const audiencePreviewUtils = {
	// Set audience for preview
	setAudience: (audienceId: string) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.setAudience === 'function') {
			sdk.setAudience(audienceId);
		} else {
			console.warn('Audience preview not available in current SDK version');
		}
	},
	
	// Get current audience
	getCurrentAudience: () => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.getCurrentAudience === 'function') {
			return sdk.getCurrentAudience();
		}
		return null;
	},
	
	// Enable personalization
	enablePersonalization: (enable: boolean) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.enablePersonalization === 'function') {
			sdk.enablePersonalization(enable);
		} else {
			console.warn('Personalization not available in current SDK version');
		}
	}
};

// Enhanced edit tags generation with comprehensive field support
export const getEditTags = (data: any, fieldPath?: string) => {
	if (!data?.$) {
		return {};
	}
	
	const entry = data;
	const baseEditTags = {
		'data-contentstack-entry-uid': entry.uid || '',
		'data-contentstack-content-type-uid': entry._content_type_uid || entry.content_type_uid || '',
		'data-contentstack-locale': entry.locale || 'en-us',
		'data-contentstack-version': entry._version || '',
	};

	if (!fieldPath) {
		return {
			...baseEditTags,
			'data-contentstack-field-uid': '',
			className: 'cs-entry-root'
		};
	}

	// Generate field-specific edit tags
	const fieldEditTags = {
		...baseEditTags,
		'data-contentstack-field-uid': fieldPath,
		className: `cs-field cs-field-${fieldPath.replace(/\./g, '-')}`
	};

	// Extract field-specific edit data from $ object
	const pathParts = fieldPath.split('.');
	let current = data.$;
	for (const part of pathParts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			break;
		}
	}

	// Add field-specific metadata if available
	if (current && typeof current === 'object') {
		if (current._edit_tags) {
			Object.assign(fieldEditTags, current._edit_tags);
		}
		if (current._metadata) {
			(fieldEditTags as any)['data-contentstack-metadata'] = JSON.stringify(current._metadata);
		}
	}

	return fieldEditTags;
};

// Enhanced Asset edit tags with Visual Builder support
export const getAssetEditTags = (asset: any) => {
	if (!asset || !asset.uid) {
		return {};
	}

	return {
		'data-contentstack-asset-uid': asset.uid,
		'data-contentstack-asset-version': asset._version || '',
		'data-contentstack-asset-filename': asset.filename || '',
		'data-contentstack-asset-content-type': asset.content_type || '',
		className: 'cs-asset cs-asset-editable'
	};
};

// Enhanced Reference edit tags for linked content
export const getReferenceEditTags = (reference: any, fieldPath: string) => {
	if (!reference || !reference.uid) {
		return {};
	}

	return {
		'data-contentstack-reference-uid': reference.uid,
		'data-contentstack-reference-content-type': reference._content_type_uid || '',
		'data-contentstack-field-uid': fieldPath,
		'data-contentstack-reference-locale': reference.locale || 'en-us',
		className: 'cs-reference cs-reference-editable'
	};
};

// Device preview utilities
export const devicePreviewUtils = {
	// Set device for preview
	setDevice: (device: 'mobile' | 'tablet' | 'desktop') => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.setDevice === 'function') {
			sdk.setDevice(device);
		} else {
			console.warn('Device preview not available in current SDK version');
		}
		// Emit custom event for device change
		window.dispatchEvent(new CustomEvent('contentstack:device-change', { detail: { device } }));
	},
	
	// Toggle orientation (portrait/landscape)
	toggleOrientation: () => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.toggleOrientation === 'function') {
			sdk.toggleOrientation();
		} else {
			console.warn('Orientation toggle not available in current SDK version');
		}
		window.dispatchEvent(new CustomEvent('contentstack:orientation-change'));
	},
	
	// Set custom viewport size
	setViewportSize: (width: number, height: number) => {
		const sdk = ContentstackLivePreview as any;
		if (sdk && typeof sdk.setViewportSize === 'function') {
			sdk.setViewportSize(width, height);
		} else {
			console.warn('Viewport size setting not available in current SDK version');
		}
	}
};

// The one and only Stack instance for the app
const Stack = initializeContentstackSdk();
export default Stack;
