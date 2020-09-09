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

function nextSteps(state) {
    const result = [];

    for (let i = 0; i < state.length; ++i) {
        switch (state[i]) {
            case "g": {
                if (i + 1 < state.length && state[i + 1] === " ") {
                    result.push(switchPositions(state, i, i + 1));
                } else if (i + 2 < state.length && state[i + 2] === " ") {
                    result.push(switchPositions(state, i, i + 2));
                }
                break;
            }
            case "r": {
                if (i - 1 >= 0 && state[i - 1] === " ") {
                    result.push(switchPositions(state, i, i - 1));
                } else if (i - 2 >= 0 && state[i - 2] === " ") {
                    result.push(switchPositions(state, i, i - 2));
                }
                break;
            }
            default:
                break;
        }
    }

    return result;
}

function recursivePrint(state) {
    if (equals(state, finalState)) {
        return [[state]];
    }
    return nextSteps(state).map(recursivePrint).flat(1).map(n => [state, ...n]);
}

recursivePrint(initialState).forEach((solution, id) => {
    console.log("Solution: ", id + 1);
    solution.forEach(n => console.log(JSON.stringify(n)));
});
