# React Event Benchmark

This simple benchmark will profile the impact of synthetic events in
React.

To do this, I created a custom build of `react-dom` with the whole event
system removed. All other features are similar to `react-dom`.

In the benchmarks, I call it `react-slim-dom` (it's ~30% less code than
`react-dom`).

## Test Setup

To test the impact of the event system, we're mounting 100 levels of
`<div />` element, each with an `onClick` and `onClickCapture` handler.

Then, we trigger `dispatchEvent()` on the deepest element so that all
event listeners fire.

In the native event test, we use `componentDidMount` to add native event
listeners and `componentWillUnmount` to remove them.

## Results

The following numbers where created on a MacBook Pro (15-inch, 2016),
2,7 GHz Intel Core i7, 16 GB 2133 MHz LPDDR3, on macOS 10.13.5 (17F77).

### Chrome 67.0.3396.99

```
SyntheticEventTest x 641 ops/sec ±1.60% (317 runs sampled)
NativeEventTest x 677 ops/sec ±1.58% (311 runs sampled)
Fastest is NativeEventTest
```

### Firefox 61.0 (64-bit)

```
SyntheticEventTest x 313 ops/sec ±22.35% (231 runs sampled)
NativeEventTest x 351 ops/sec ±22.26% (237 runs sampled)
Fastest is NativeEventTest
```

## Conclusion

We see that the results are  not significantly different with a small
favor of native event handling.

This tests lets us to believe that there might not be major performance
regressions if we were to remove React's synthetic event system.

## License

[MIT](https://github.com/philipp-spiess/react-recomponent/blob/master/README.md)
