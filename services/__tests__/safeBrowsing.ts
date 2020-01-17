import isSafeUrl, {
  SafeBrowsingRequest,
  SafeBrowsingResponse,
} from "../safeBrowsing";
import nock from "nock";
import config from "config";

const responseWithoutMalware = { matches: [] };

const responseWithMalware: SafeBrowsingResponse = {
  matches: [
    {
      threatType: "MALWARE",
      platformType: "WINDOWS",
      threatEntryType: "URL",
      threat: { url: "http://www.urltocheck1.org/" },
      threatEntryMetadata: {
        entries: [
          {
            key: "malware_threat_type",
            value: "landing",
          },
        ],
      },
      cacheDuration: "300.000s",
    },
    {
      threatType: "MALWARE",
      platformType: "WINDOWS",
      threatEntryType: "URL",
      threat: { url: "http://www.urltocheck2.org/" },
      threatEntryMetadata: {
        entries: [
          {
            key: "malware_threat_type",
            value: "landing",
          },
        ],
      },
      cacheDuration: "300.000s",
    },
  ],
};

describe("SafeBrowsing", () => {
  beforeEach(() => nock.cleanAll());

  it("should return false if the URL is reported as malware by Google's SafeBrowsing", async () => {
    const scope = nock(config.get<string>("safeBrowsing.domain"))
      .post(config.get<string>("safeBrowsing.path"))
      .reply(200, responseWithMalware);

    const request = await isSafeUrl(["https://www.example.com"]);

    expect(request).toEqual(false);
    expect(scope.isDone()).toEqual(true);
  });

  it("should return true if the URL is not reported as malware by Google's SafeBrowsing", async () => {
    const scope = nock(config.get<string>("safeBrowsing.domain"))
      .post(config.get<string>("safeBrowsing.path"))
      .reply(200, responseWithoutMalware);

    const request = await isSafeUrl(["https://www.example.com"]);

    expect(request).toEqual(true);
    expect(scope.isDone()).toEqual(true);
  });

  it("should return true if request fails", async () => {
    const scope = nock(config.get<string>("safeBrowsing.domain"))
      .post(config.get<string>("safeBrowsing.path"))
      .reply(500);

    const request = await isSafeUrl(["https://www.example.com"]);

    expect(request).toEqual(true);
    expect(scope.isDone()).toEqual(true);
  });

  it("should accept a single string as an argument", async () => {
    const scope = nock(config.get<string>("safeBrowsing.domain"))
      .post(config.get<string>("safeBrowsing.path"))
      .reply(200, (_uri, requestBody: SafeBrowsingRequest) => {
        expect(requestBody.threatInfo.threatEntries).toHaveLength(1);
        expect(requestBody.threatInfo.threatEntries[0]).toEqual({
          url: "https://www.example.com",
        });
      });

    await isSafeUrl("https://www.example.com");

    expect(scope.isDone()).toEqual(true);
  });
});
