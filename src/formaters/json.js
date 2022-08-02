export default (innerTree = []) => (innerTree.length ? JSON.stringify(innerTree, null, 2) : '');
