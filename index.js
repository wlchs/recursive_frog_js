const initialState = ["g","g","g"," ","r","r","r"];
const finalState = [...initialState].reverse();

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
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

function printTree_(node, path, leafPaths) {
    const path_ = [...path, node[0]];
    if (node[1].length === 0) {
        leafPaths.push(path_);
    }
    node[1].map(n => printTree_(n, path_, leafPaths));
}

function printTree(node) {
    const leafPaths = [];
    printTree_(node, [], leafPaths);
    return leafPaths.filter(p => arraysEqual(p[p.length - 1], finalState));
}

const solutionTree = recursiveSteps(initialState);
const leafPaths = printTree(solutionTree);

for (const solution of leafPaths) {
    for (const node of solution) {
        console.log(JSON.stringify(node));
    }
    console.log();
}
