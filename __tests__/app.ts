import request, { Response } from "supertest";
import app from "../app";

describe("App", () => {
  it("should return 200", () =>
    request(app)
      .get("/")
      .then((resp: Response) => expect(resp.status).toBe(200)));

  it("should return 404", () =>
    request(app)
      .get("/notFound")
      .then((resp: Response) => expect(resp.status).toBe(404)));
});
