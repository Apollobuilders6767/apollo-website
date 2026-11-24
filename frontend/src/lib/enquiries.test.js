import axios from "axios";
import { submitEnquiry } from "./enquiries";

jest.mock("axios");

beforeEach(() => {
  window.dataLayer = [];
  axios.post.mockReset();
});

test("pushes generate_lead only after a confirmed send, with no personal data", async () => {
  axios.post.mockResolvedValue({ data: { id: "1", email_sent: true } });

  await submitEnquiry({
    form_name: "contact",
    project_type: "Kitchen renovation",
    name: "Ada Lovelace",
    email: "ada@example.com",
    phone: "0400000000",
    message: "Please call me",
  });

  expect(axios.post).toHaveBeenCalledWith(
    "/api/enquiries",
    expect.objectContaining({
      form_name: "contact",
      email: "ada@example.com",
    })
  );
  expect(window.dataLayer).toEqual([
    {
      event: "generate_lead",
      form_name: "contact",
      service_type: "Kitchen renovation",
    },
  ]);
});

test("shows a delivery error and does not track a lead when email_sent is false", async () => {
  axios.post.mockResolvedValue({ data: { id: "1", email_sent: false } });

  await expect(
    submitEnquiry({
      form_name: "consult",
      project_type: "Consultation",
      name: "Ada",
      email: "ada@example.com",
      phone: "0400000000",
    })
  ).rejects.toMatchObject({
    userMessage: expect.stringMatching(/couldn't send your enquiry/i),
  });
  expect(window.dataLayer).toEqual([]);
});

test("shows the server error when the request fails", async () => {
  axios.post.mockRejectedValue({
    response: { data: { detail: "Request body too large." } },
  });

  await expect(
    submitEnquiry({ form_name: "contact", project_type: "Kitchen" })
  ).rejects.toMatchObject({ userMessage: "Request body too large." });
  expect(window.dataLayer).toEqual([]);
});
