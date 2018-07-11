# React Event Benchmark

This simple benchmark will profile the impact of synthetic events in React.

To do this, I created a custom build of `react-dom` with the whole event system removed. All other features are similar to `react-dom`.

In the benchmarks, I call it `react-slim-dom` (it's ~20% less code than `react-dom`).

## Test Setup

To test the impact of the event system, we're mounting 100 levels of `<div />` element, each with an `onClick` and `onClickCapture` handler.

Then, we trigger `dispatchEvent()` on the deepest element so that all event listeners fire.

In the native event test, we use `componentDidMount` to add native event listeners and `componentWillUnmount` to remove them.

## Results without setState

The following numbers where created on a MacBook Pro (15-inch, 2016),
2,7 GHz Intel Core i7, 16 GB 2133 MHz LPDDR3, on macOS 10.13.5 (17F77).

These benchmarks currently ignore state updates. React's synthetic event system can batch state updates within the same event and thus receive additional performance improvements since the tree only needs to be re-rendered after all events are processed. This improvement is not possible when relying on native event dispatching.

### Chrome 67.0.3396.99

```
NativeEventTest x 686 ops/sec ±1.67% (307 runs sampled)
SyntheticEventTest x 596 ops/sec ±1.66% (294 runs sampled)
Fastest is NativeEventTest
```

### Firefox 61.0 (64-bit)

```
NativeEventTest x 390 ops/sec ±17.61% (259 runs sampled)
SyntheticEventTest x 348 ops/sec ±17.69% (256 runs sampled)
Fastest is NativeEventTest
```

### Safari Technology Preview 59 (Safari 12.0, WebKit 13606.1.21)

```
NativeEventTest x 876 ops/sec ±1.15% (287 runs sampled)
SyntheticEventTest x 789 ops/sec ±1.30% (322 runs sampled)
Fastest is NativeEventTest
```

## Results with setState

The following numbers where created on a MacBook Pro (15-inch, 2016),
2,7 GHz Intel Core i7, 16 GB 2133 MHz LPDDR3, on macOS 10.13.5 (17F77).

In these benchmark, all event handlers will call `setState` and force the whole tree
including all children to update.

We expect worse numbers for the unbatched native event implementation.

### Chrome 67.0.3396.99

```
NativeEventTest x 15.67 ops/sec ±1.18% (156 runs sampled)
SyntheticEventTest x 396 ops/sec ±1.12% (305 runs sampled)
Fastest is SyntheticEventTest
```

## Conclusion

We see that the results are not significantly different with a small favor of native event handling when we do not call setState within the event handlers.

However when state changes are taken into account (as they probably should), the `setState` batching of the synthetic event system can drastically improve performance as it can reduce the number of re-renders to only one.

## License

[MIT](https://github.com/philipp-spiess/react-recomponent/blob/master/README.md)
