import { Dispatch } from "react";
import { CONTENT_TYPES } from "../constants";
import {
  setFooterData,
  setHeaderData,
  setHomePageData,
  // COMMENT: Uncomment below line
  setMenuPageData,
} from "../reducer";
import { initializeContentstackSdk, isLivePreviewMode, refreshLivePreviewContext } from "../sdk/utils";
import * as Utils from "@contentstack/utils";

// Initialize Stack - this will be Live Preview aware
let Stack = initializeContentstackSdk();

// Function to get Live Preview aware Stack instance
const getStack = () => {
  if (isLivePreviewMode()) {
    console.log('🎯 Using Live Preview enabled Stack instance');
    // Refresh Live Preview context to ensure latest parameters
    const livePreviewStack = refreshLivePreviewContext();
    if (livePreviewStack) {
      return livePreviewStack;
    }
  }
  return Stack;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

export const getEntry = (contentType: string) => {
  const LivePreviewStack = getStack();
  const Query = LivePreviewStack.ContentType(contentType).Query();
  return Query.toJSON()
    .find()
    .then((entry) => {
      console.log(`📦 Fetched ${contentType} with Live Preview context:`, entry);
      return entry;
    })
    .catch((err: any) => {
      console.error(`❌ Error fetching ${contentType}:`, err);
      return {};
    });
};

export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    const LivePreviewStack = getStack();
    const blogQuery = LivePreviewStack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        console.log(`📦 Fetched entry by URL (${entryUrl}) with Live Preview context:`, result);
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(`❌ Error fetching entry by URL (${entryUrl}):`, error);
        reject(error);
      }
    );
  });
};

export const fetchHeaderData = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  const data = await getEntry(CONTENT_TYPES.HEADER);
  console.log('📦 Header Data Structure:', data);
  console.log('📦 Header data[0]:', data[0]);
  console.log('📦 Header data[0] has uid?', data[0]?.uid);
  console.log('📦 Header data[0] has $?', data[0]?.$);
  // FIXED: Use data[0] instead of data[0][0] to preserve entry metadata
  dispatch(setHeaderData(data[0]));
};

export const fetchFooterData = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  const data = await getEntry(CONTENT_TYPES.FOOTER);
  console.log('📦 Footer Data Structure:', data);
  console.log('📦 Footer data[0]:', data[0]);
  console.log('📦 Footer data[0] has uid?', data[0]?.uid);
  console.log('📦 Footer data[0] has $?', data[0]?.$);
  // FIXED: Use data[0] instead of data[0][0] to preserve entry metadata
  dispatch(setFooterData(data[0]));
};

export const fetchHomePageData = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  const data: any = await getEntryByUrl({
    contentTypeUid: CONTENT_TYPES.PAGE,
    entryUrl: "/",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  dispatch(setHomePageData(data[0]));
};

export const fetchInitialData = async (
  dispatch: Dispatch<any>,
  setLoading: (status: boolean) => void
): Promise<void> => {
  try {
    await Promise.all([
      fetchHeaderData(dispatch),
      fetchFooterData(dispatch),
      fetchHomePageData(dispatch),
    ]);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// COMMENT: Uncomment below code

export const fetchMenuPageData = async (
  dispatch: Dispatch<any>,
  setLoading: (status: boolean) => void
): Promise<void> => {
  const data: any = await getEntryByUrl({
    contentTypeUid: CONTENT_TYPES.PAGE,
    entryUrl: "/menu",
    referenceFieldPath: ["sections.menu.course.dishes"],
    jsonRtePath: undefined,
  });
  dispatch(setMenuPageData(data[0].sections[0].menu.course));
  setLoading(false);
};
