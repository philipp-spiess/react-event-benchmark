export function getDeepestFirstChild(node) {
  while (node.childNodes[0]) {
    node = node.childNodes[0];
  }
  return node;
}
