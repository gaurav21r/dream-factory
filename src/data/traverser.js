var TraverseFilter;
(function (TraverseFilter) {
    /** prevents the children from being iterated. */
    TraverseFilter["reject"] = "reject";
})(TraverseFilter || (TraverseFilter = {}));
function* traverse(o) {
    const memory = new Set();
    function* innerTraversal(root) {
        const queue = [];
        queue.push([root, []]);
        while (queue.length > 0) {
            const [o, path] = queue.shift();
            if (memory.has(o)) {
                // we've seen this object before don't iterate it
                continue;
            }
            // add the new object to our memory.
            memory.add(o);
            for (var i of Object.keys(o)) {
                const item = o[i];
                const itemPath = path.concat([i]);
                const filter = yield [i, item, itemPath, o];
                if (filter === TraverseFilter.reject)
                    continue;
                if (item !== null && typeof item === "object") {
                    //going one step down in the object tree!!
                    queue.push([item, itemPath]);
                }
            }
        }
    }
    yield* innerTraversal(o);
}

export default {traverse: traverse};