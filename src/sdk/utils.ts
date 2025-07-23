import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

console.log("📦 SDK utils module loaded");

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

// This function should be called only ONCE in the application
export const initializeContentstackSdk = () => {
	console.log("🚀 Initializing Contentstack SDK...");
	
	const {
		REACT_APP_CONTENTSTACK_API_KEY,
		REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
		REACT_APP_CONTENTSTACK_ENVIRONMENT,
		REACT_APP_CONTENTSTACK_REGION,
		REACT_APP_CONTENTSTACK_PREVIEW_TOKEN
	} = process.env;

	console.log("📋 Environment variables:", {
		API_KEY: REACT_APP_CONTENTSTACK_API_KEY ? "✅ Set" : "❌ Missing",
		DELIVERY_TOKEN: REACT_APP_CONTENTSTACK_DELIVERY_TOKEN ? "✅ Set" : "❌ Missing",
		ENVIRONMENT: REACT_APP_CONTENTSTACK_ENVIRONMENT ? "✅ Set" : "❌ Missing",
		REGION: REACT_APP_CONTENTSTACK_REGION ? "✅ Set" : "❌ Missing",
		PREVIEW_TOKEN: REACT_APP_CONTENTSTACK_PREVIEW_TOKEN ? "✅ Set" : "❌ Missing"
	});

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
		console.error("❌ Invalid region provided in REACT_APP_CONTENTSTACK_REGION.");
		throw new Error(
			"Invalid region provided in REACT_APP_CONTENTSTACK_REGION."
		);
	}

	console.log("⚙️ Creating Contentstack Stack...");
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

	console.log("🔴 Initializing Live Preview SDK...");
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
		tagsAsObject: true,
	} as any);

	console.log("✅ SDK initialized successfully!");
	console.log("🔍 Live Preview version:", (window as any).ContentstackLivePreviewSDKVersion);
	
	return Stack;
};

export const onEntryChange = ContentstackLivePreview.onEntryChange;

// The one and only Stack instance for the app
console.log("🚀 Creating Stack instance...");
const Stack = initializeContentstackSdk();
console.log("📡 Stack instance created:", !!Stack);
export default Stack;

// Corrected getEditTags function
export const getEditTags = (data: any, fieldPath?: string) => {
	if (!data?.$) {
		return {};
	}
	if (!fieldPath) {
		return data.$ || {};
	}
	const pathParts = fieldPath.split('.');
	let current = data.$;
	for (const part of pathParts) {
		if (current && typeof current === 'object' && part in current) {
			current = current[part];
		} else {
			return {};
		}
	}
	return current || {};
};
