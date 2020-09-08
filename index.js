const initialState = ["g","g","g"," ","r","r","r"];
const finalState = [...initialState].reverse();

function equals(a, b) {
    if (a.length === 0 && b.length === 0) return true;
    if (a.length === 0) return false;
    if (b.length === 0) return false;
    return a[0] === b[0] ? equals(a.slice(1), b.slice(1)) : false;
}

function last(array) {
    return array[array.length - 1];
}

function switchPositions(state, i, j) {
    const result = [...state];
    result[i] = state[j];
    result[j] = state[i];
    return result;
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
            default: break;
        }
    }

    return result;
} 

function recursiveSteps(state) {
    return [
        state,
        nextSteps(state).map(recursiveSteps)
    ];
}

function printTree_(node, path) {
    const path_ = [...path, node[0]];
    if (node[1].length === 0) {
        return [path_];
    }
    return node[1].map(n => printTree_(n, path_)).flat(1);
}

function printTree(node) {
    return printTree_(node, []).filter(p => equals(last(p), finalState));
}

const solutionTree = recursiveSteps(initialState);
const leafPaths = printTree(solutionTree);

for (const solution of leafPaths) {
    for (const node of solution) {
        console.log(JSON.stringify(node));
    }
    console.log();
}
