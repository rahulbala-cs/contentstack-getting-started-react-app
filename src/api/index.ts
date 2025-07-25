import { Dispatch } from "react";
import { CONTENT_TYPES } from "../constants";
import {
  setFooterData,
  setHeaderData,
  setHomePageData,
  setMenuPageData,
} from "../reducer";
import Stack from "../sdk/utils"; // <-- Use the single, shared Stack instance
import * as Utils from "@contentstack/utils";

// All references to `getStack()` are removed, as we now use the shared `Stack` instance.

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
  const Query = Stack.ContentType(contentType).Query();
  return Query.toJSON()
    .find()
    .then((entry) => {
      return entry;
    })
    .catch((err: any) => {
      console.error(err);
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
    const blogQuery = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
    blogQuery.toJSON();
    const data = blogQuery.where("url", `${entryUrl}`).find();
    data.then(
      (result) => {
        jsonRtePath &&
          Utils.jsonToHTML({
            entry: result,
            paths: jsonRtePath,
            renderOption,
          });
        resolve(result[0]);
      },
      (error) => {
        console.error(error);
        reject(error);
      }
    );
  });
};

export const fetchHeaderData = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  const data = await getEntry(CONTENT_TYPES.HEADER);
  // Reverted to data[0][0] to correctly extract the entry object
  dispatch(setHeaderData(data[0][0]));
};

export const fetchFooterData = async (
  dispatch: Dispatch<any>
): Promise<void> => {
  const data = await getEntry(CONTENT_TYPES.FOOTER);
  // Reverted to data[0][0] to correctly extract the entry object
  dispatch(setFooterData(data[0][0]));
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
