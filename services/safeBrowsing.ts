import got from "got";
import config from "config";

export interface SafeBrowsingMatch {
  threatType: string;
  platformType: string;
  threatEntryType: string;
  threat: Record<"url", string>;
  threatEntryMetadata: Record<"entries", Record<string, string>[]>;
  cacheDuration: string;
}

export interface SafeBrowsingResponse {
  matches: SafeBrowsingMatch[];
}

export interface SafeBrowsingRequest {
  client: {
    clientId: string;
    clientVersion: string;
  };
  threatInfo: {
    threatTypes: string[];
    platformTypes: string[];
    threatEntryTypes: string[];
    threatEntries: Record<"url", string>[];
  };
}

const normalizeUrls = (urls: string | string[]): Record<"url", string>[] =>
  (typeof urls === "string" ? [urls] : urls).map((url: string) => ({ url }));

const platformTypes = ["ANY_PLATFORM", "PLATFORM_TYPE_UNSPECIFIED"];

const threatTypes = [
  "THREAT_TYPE_UNSPECIFIED",
  "MALWARE",
  "SOCIAL_ENGINEERING",
  "UNWANTED_SOFTWARE",
  "POTENTIALLY_HARMFUL_APPLICATION",
];

const threatEntryTypes = ["EXECUTABLE", "URL", "THREAT_ENTRY_TYPE_UNSPECIFIED"];

/**
 * isSafeUrl
 *
 * Returns `true` if the URL is reported as safe by Google's SafeBrowser, or
 * `false` otherwise.
 * In case of a request error, the answer will be `true` to avoid punishing
 * clean URLs.
 */
export default (urls: string | string[]): Promise<boolean> => {
  const body: SafeBrowsingRequest = {
    client: {
      clientId: config.get<string>("safeBrowsing.clientId"),
      clientVersion: config.get<string>("safeBrowsing.clientVersion"),
    },
    threatInfo: {
      threatTypes,
      platformTypes,
      threatEntryTypes,
      threatEntries: normalizeUrls(urls),
    },
  };

  return got
    .post<SafeBrowsingResponse>(config.get<string>("safeBrowsing.url"), {
      responseType: "json",
      json: body,
    })
    .then(({ body }) => !body.matches.length)
    .catch(() => true);
};
