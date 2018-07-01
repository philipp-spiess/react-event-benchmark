import "./index.css";

import nativeEventTest from "./tests/native";
import syntheticEventTest from "./tests/synthetic";

const elementDepth = 100;
// Improve the standard derivation by increasing the number of samples
// run.
Object.assign(window.Benchmark.options, { maxTime: 30 });

const rootElement = document.getElementById("root");
const startElement = document.getElementById("start");
const logElement = document.getElementById("log");

startElement.addEventListener("click", () => {
  startElement.disabled = true;
  const suite = new window.Benchmark.Suite();
  suite
    .add("NativeEventTest", nativeEventTest(root, elementDepth))
    .add("SyntheticEventTest", syntheticEventTest(root, elementDepth))
    .on("start", ({ target: { name } }) => log("Benchmark Started"))
    .on("cycle", ({ target }) => log(String(target)))
    .on("complete", () => {
      log("Fastest is " + suite.filter("fastest").map("name"));
      startElement.disabled = false;
    })
    .run({ async: true });
});

function log(message) {
  const line = document.createElement("p");
  line.innerText = message;
  logElement.appendChild(line);
}
