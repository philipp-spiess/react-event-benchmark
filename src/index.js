import "babel-polyfill";
import "./index.css";

import pooledEventTest from "./tests/pooled";
import unpooledEventTest from "./tests/unpooled";

// Improve the standard derivation by increasing the number of samples
// run.
Object.assign(window.Benchmark.options, { maxTime: 30 });

const startElement = document.getElementById("start");
const logElement = document.getElementById("log");

startElement.addEventListener("click", () => {
  startElement.disabled = true;
  const suite = new window.Benchmark.Suite();
  suite
    .add("Without Event Pooling", unpooledEventTest(root))
    .add("With Event Pooling", pooledEventTest(root))
    .on("start", ({ target: { name } }) => log("Benchmark Started"))
    .on("cycle", ({ target }) => log(String(target)))
    .on("complete", () => {
      log("Fastest is " + suite.filter("fastest").map("name"));
      startElement.disabled = false;
    })
    .on("error", console.error)
    .run({ async: true });
});

function log(message) {
  const line = document.createElement("p");
  line.innerText = message;
  logElement.appendChild(line);
}
