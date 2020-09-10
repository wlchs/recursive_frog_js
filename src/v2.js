import {equals, finalState, initialState, switchPositions} from "./v1.js";

function moves(state) {
    if (state.length === 0) {
        return [];
    }
    const empty = state.indexOf(" ");
    return [-2, -1, 1, 2].map(d => state[d + empty] === (d > 0 ? "r" : "g") ? switchPositions(state, empty, d + empty) : [])
}

function print(solution) {
    console.log();
    solution.forEach(n => console.log(JSON.stringify(n)));
}

function solvePrint(state, path) {
    if (equals(state, finalState)) {
        print([...path, state]);
    }
    moves(state).forEach(s => solvePrint(s, [...(path || []), state]));
}

function v2() {
    solvePrint(initialState);
}

export default v2;
