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

export const initializeContentstackSdk = () => {
	const {
		REACT_APP_CONTENTSTACK_API_KEY,
		REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
		REACT_APP_CONTENTSTACK_ENVIRONMENT,
		REACT_APP_CONTENTSTACK_REGION,
		REACT_APP_CONTENTSTACK_PREVIEW_TOKEN
	} = process.env;

	// DEBUG: Check if all required env variables are set
	console.log('🔍 DEBUG SDK Init - Environment Variables:');
	console.log('API_KEY:', REACT_APP_CONTENTSTACK_API_KEY ? '✅ Set' : '❌ Missing');
	console.log('DELIVERY_TOKEN:', REACT_APP_CONTENTSTACK_DELIVERY_TOKEN ? '✅ Set' : '❌ Missing');
	console.log('PREVIEW_TOKEN:', REACT_APP_CONTENTSTACK_PREVIEW_TOKEN ? '✅ Set' : '❌ Missing');
	console.log('ENVIRONMENT:', REACT_APP_CONTENTSTACK_ENVIRONMENT ? '✅ Set' : '❌ Missing');
	console.log('REGION:', REACT_APP_CONTENTSTACK_REGION ? '✅ Set' : '❌ Missing');

	const region: Contentstack.Region | undefined = (function (
		regionValue: string
	) {
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
			"Invalid region provided in REACT_APP_CONTENTSTACK_REGION. Valid values are: " +
				Object.keys(Contentstack.Region).join(", ")
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

	console.log('✅ Contentstack SDK initialized with Live Preview enabled');

	// CRITICAL: Apply Live Preview Query if URL parameters are present
	const urlParams = new URLSearchParams(window.location.search);
	const isLivePreview = urlParams.has('live_preview') || urlParams.has('content_type_uid') || urlParams.has('entry_uid');
	
	if (isLivePreview) {
		console.log('🎯 Live Preview Mode Detected - Applying livePreviewQuery');
		console.log('🎯 Live Preview Query params:', Object.fromEntries(urlParams.entries()));
		
		// Properly structure the live preview query
		const livePreviewQuery = {
			live_preview: urlParams.get('live_preview') || 'true',
			content_type_uid: urlParams.get('content_type_uid') || '',
			entry_uid: urlParams.get('entry_uid') || '',
			locale: urlParams.get('locale') || 'en-us'
		};
		
		console.log('🎯 Structured Live Preview Query:', livePreviewQuery);
		
		// Apply live preview query to the stack
		Stack.livePreviewQuery(livePreviewQuery);
		console.log('✅ Live Preview Query applied to Stack');
	} else {
		console.log('ℹ️ Regular mode - No Live Preview parameters detected');
	}

	// Initialize Live Preview Utils with proper configuration
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
		tagsAsObject: true, // Essential for React apps to get $ object format
	} as any);

	// DEBUG: Check if we're in Live Preview mode
	console.log('🔍 DEBUG Live Preview State:');
	console.log('Current URL:', window.location.href);
	console.log('URL Search Params:', window.location.search);
	console.log('Is Live Preview?', isLivePreview);
	console.log('Has content_type_uid?', urlParams.has('content_type_uid'));
	console.log('Has entry_uid?', urlParams.has('entry_uid'));
	
	// Check if ContentstackLivePreview has any state methods
	console.log('Live Preview SDK methods:', Object.getOwnPropertyNames(ContentstackLivePreview));

	console.log('✅ Live Preview Utils SDK initialized with tagsAsObject: true');

	return Stack;
};

// Live Preview utilities
export const onEntryChange = ContentstackLivePreview.onEntryChange;

// Utility function to check if we're in Live Preview mode
export const isLivePreviewMode = (): boolean => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.has('live_preview') || urlParams.has('content_type_uid') || urlParams.has('entry_uid');
};

// Utility function to get Live Preview query parameters
export const getLivePreviewQuery = () => {
	const urlParams = new URLSearchParams(window.location.search);
	return {
		live_preview: urlParams.get('live_preview') || 'true',
		content_type_uid: urlParams.get('content_type_uid') || '',
		entry_uid: urlParams.get('entry_uid') || '',
		locale: urlParams.get('locale') || 'en-us'
	};
};

// Function to refresh Live Preview context (useful for route changes)
export const refreshLivePreviewContext = () => {
	if (isLivePreviewMode()) {
		console.log('🔄 Refreshing Live Preview context');
		const livePreviewQuery = getLivePreviewQuery();
		console.log('🔄 Applying Live Preview query:', livePreviewQuery);
		// Re-initialize stack with current Live Preview parameters
		const Stack = initializeContentstackSdk();
		return Stack;
	}
	return null;
};

// Helper function to safely get edit tags from the $ object
export const getEditTags = (data: any, fieldPath?: string) => {
	// If no $ object is present, we're not in Live Preview context
	if (!data?.$) {
		return {};
	}
	
	// If no field path is provided, return the tags for the entry itself
	if (!fieldPath) {
		return data.$ || {};
	}
	
	// Resolve the field path to get the correct nested edit tags
	const pathParts = fieldPath.split('.');
	let current = data.$;
	
	for (const part of pathParts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			// If the path doesn't exist, return no tags
			return {};
		}
	}
	
	return current || {};
};
