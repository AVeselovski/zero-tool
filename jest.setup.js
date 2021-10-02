import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
// mock next-router
jest.mock("next/dist/client/router", () => require("next-router-mock"));
