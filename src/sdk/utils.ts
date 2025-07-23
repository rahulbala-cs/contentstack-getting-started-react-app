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
		default:
			return "app.contentstack.com";
	}
};

// This function should be called only ONCE in the application
export const initializeContentstackSdk = () => {
	const {
		REACT_APP_CONTENTSTACK_API_KEY,
		REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
		REACT_APP_CONTENTSTACK_ENVIRONMENT,
		REACT_APP_CONTENTSTACK_REGION,
		REACT_APP_CONTENTSTACK_PREVIEW_TOKEN
	} = process.env;

	if (!REACT_APP_CONTENTSTACK_API_KEY) {
		throw new Error(
			"Please set REACT_APP_CONTENTSTACK_API_KEY in your environment variables."
		);
	}

	if (!REACT_APP_CONTENTSTACK_DELIVERY_TOKEN) {
		throw new Error(
			"Please set REACT_APP_CONTENTSTACK_DELIVERY_TOKEN in your environment variables."
		);
	}

	if (!REACT_APP_CONTENTSTACK_ENVIRONMENT) {
		throw new Error(
			"Please set REACT_APP_CONTENTSTACK_ENVIRONMENT in your environment variables."
		);
	}

	const regionString = REACT_APP_CONTENTSTACK_REGION || "US";
	
	const region = (() => {
		switch (regionString) {
			case "US":
				return Contentstack.Region.US;
			case "EU":
				return Contentstack.Region.EU;
			case "AZURE_NA":
				return Contentstack.Region.AZURE_NA;
			case "AZURE_EU":
				return Contentstack.Region.AZURE_EU;
			default:
				return Contentstack.Region.US;
		}
	})();

	const Stack = Contentstack.Stack({
		api_key: REACT_APP_CONTENTSTACK_API_KEY,
		delivery_token: REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
		environment: REACT_APP_CONTENTSTACK_ENVIRONMENT,
		region: region,
		live_preview: {
			enable: true,
			preview_token: REACT_APP_CONTENTSTACK_PREVIEW_TOKEN || "",
			host: getHostByRegion(regionString)
		}
	});

	// Initialize Live Preview SDK with proper configuration
	ContentstackLivePreview.init({
		stackDetails: {
			apiKey: REACT_APP_CONTENTSTACK_API_KEY,
			environment: REACT_APP_CONTENTSTACK_ENVIRONMENT
		},
		clientUrlParams: {
			host: getHostByRegion(region)
		}
	} as any);

	// Set a global to verify SDK is working
	(window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__ = true;

	return Stack;
};

// Extract edit tags from the $ object for Live Preview inspector mode
export const getEditTags = (
	entryObject: any,
	fieldPath: string,
	locale: string = "en-us"
) => {
	if (!entryObject) return {};

	const editTags: Record<string, string> = {};

	// Add entry UID if available
	if (entryObject.uid || entryObject.sys?.id) {
		editTags["data-contentstack-entry-uid"] = entryObject.uid || entryObject.sys.id;
	}

	// Add field UID
	if (fieldPath) {
		editTags["data-contentstack-field-uid"] = fieldPath;
	}

	// Add content type UID if available
	if (entryObject.content_type_uid || entryObject._content_type_uid) {
		editTags["data-contentstack-content-type-uid"] = 
			entryObject.content_type_uid || entryObject._content_type_uid;
	}

	// Add locale
	editTags["data-contentstack-locale"] = locale;

	// Add version if available
	if (entryObject._version || entryObject.sys?.version) {
		editTags["data-contentstack-version"] = 
			String(entryObject._version || entryObject.sys.version);
	}

	// Extract edit tags from $ object if present
	if (entryObject.$ && typeof entryObject.$ === 'object') {
		const fieldPathParts = fieldPath.split('.');
		let current = entryObject.$;
		
		for (const path of fieldPathParts) {
			if (current && current[path]) {
				current = current[path];
			}
		}
		
		if (current && typeof current === 'object') {
			// Copy all properties from $ object that start with data-contentstack
			Object.keys(current).forEach(key => {
				if (key.startsWith('data-contentstack')) {
					editTags[key] = current[key];
				}
			});
		}
	}

	return editTags;
};

// Check if Live Preview is available and working
export const isLivePreviewEnabled = () => {
	try {
		// Check if we're in an iframe (Live Preview environment)
		const isInIframe = window !== window.parent;
		
		// Check if Live Preview is initialized
		const isInitialized = !!(window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__;
		
		// Check if preview parameters exist in URL
		const urlParams = new URLSearchParams(window.location.search);
		const hasLivePreview = urlParams.has('live_preview');
		
		return isInIframe && (isInitialized || hasLivePreview);
	} catch (error) {
		return false;
	}
};

// Get Live Preview status for debugging
export const getLivePreviewStatus = () => {
	const urlParams = new URLSearchParams(window.location.search);
	
	return {
		isInitialized: !!(window as any).__CONTENTSTACK_LIVE_PREVIEW_INITIALIZED__,
		isInIframe: window !== window.parent,
		hasLivePreviewParam: urlParams.has('live_preview'),
		hasContentTypeParam: urlParams.has('content_type_uid'),
		hasEntryParam: urlParams.has('entry_uid'),
		hasPreviewToken: !!process.env.REACT_APP_CONTENTSTACK_PREVIEW_TOKEN,
		currentURL: window.location.href
	};
};

// The one and only Stack instance for the app
const Stack = initializeContentstackSdk();

export default Stack;
