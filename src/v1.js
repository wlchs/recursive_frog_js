export const initialState = ["g", "g", "g", " ", "r", "r", "r"];
export const finalState = [...initialState].reverse();

export function equals(a, b) {
    if (a.length === 0 && b.length === 0) return true;
    if (a.length === 0) return false;
    if (b.length === 0) return false;
    return a[0] === b[0] ? equals(a.slice(1), b.slice(1)) : false;
}

export function switchPositions(arr, i, j) {
    const [a, b] = i < j ? [i, j] : [j, i];
    return [...arr.slice(0, a), arr[b], ...arr.slice(a + 1, b), arr[a], ...arr.slice(b + 1)];
}

function solve(state) {
    if (equals(state, finalState)) {
        return [[state]];
    }
    const empty = state.indexOf(" ");
    return [-2, -1, 1, 2]
        .map(d => state[d + empty] === (d > 0 ? "r" : "g") ? solve(switchPositions(state, empty, d + empty)) : [])
        .flat(1)
        .map(n => [state, ...n]);
}

function v1() {
    solve(initialState).forEach((solution, id) => {
        console.log("Solution: ", id + 1);
        solution.forEach(n => console.log(JSON.stringify(n)));
    });
}

export default v1;
