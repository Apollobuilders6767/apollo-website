import { captureAttribution, getAttribution } from "./attribution";

function clearStore() {
  window.localStorage.clear();
  document.cookie.split(";").forEach((part) => {
    const name = part.split("=")[0].trim();
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
}

beforeEach(() => {
  clearStore();
});

test("stores click ids from the landing query and omits personal fields", () => {
  captureAttribution(
    "?gclid=CLICK123&utm_source=google&utm_medium=cpc&utm_campaign=kitchens&email=person@example.com&phone=0400000000"
  );
  expect(getAttribution()).toEqual({
    gclid: "CLICK123",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "kitchens",
  });
});

test("keeps an earlier gclid when a later page has no click id", () => {
  captureAttribution("?gclid=FIRST");
  captureAttribution("?utm_content=ad-a");
  expect(getAttribution().gclid).toBe("FIRST");
  expect(getAttribution().utm_content).toBe("ad-a");
});

test("a new gclid replaces the stored one", () => {
  captureAttribution("?gclid=FIRST");
  captureAttribution("?gclid=SECOND");
  expect(getAttribution().gclid).toBe("SECOND");
});
