import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 30 },
    { duration: "30s", target: 80 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const res = http.get("http://nginx:8080/api/scale-test");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has instance": (r) => r.body.includes("instance"),
    "response has duration": (r) => r.body.includes("durationMs"),
  });
}