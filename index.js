const initialState = ["g", "g", "g", " ", "r", "r", "r"];
const finalState = [...initialState].reverse();

function equals(a, b) {
    if (a.length === 0 && b.length === 0) return true;
    if (a.length === 0) return false;
    if (b.length === 0) return false;
    return a[0] === b[0] ? equals(a.slice(1), b.slice(1)) : false;
}

function switchPositions(arr, i, j) {
    const [a, b] = i < j ? [i, j] : [j, i];
    return [...arr.slice(0, a), arr[b], ...arr.slice(a + 1, b), arr[a], ...arr.slice(b + 1)];
}

function steps(state) {
    if (state.length === 0) {
        return [];
    }
    const empty = state.indexOf(" ");
    return [-2, -1, 1, 2]
        .map(d => [d, Math.sign(d) > 0 ? "r" : "g"])
        .map(([d, e]) => state[d + empty] === e ? switchPositions(state, empty, d + empty) : [])
}

function recursivePrint(state) {
    if (equals(state, finalState)) {
        return [[state]];
    }
    return steps(state).map(recursivePrint).flat(1).map(n => [state, ...n]);
}

recursivePrint(initialState).forEach((solution, id) => {
    console.log("Solution: ", id + 1);
    solution.forEach(n => console.log(JSON.stringify(n)));
});
