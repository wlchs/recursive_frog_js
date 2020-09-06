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
    if (arraysEqual(state, finalState)) {
        return [state];
    }

    const steps = nextSteps(state);
    if (steps.length === 0) {
        return false;
    }

    const rec = steps.map(recursiveSteps).filter(r => r !== false);
    if (rec.length === 0) {
        return false;
    }

    return [state, rec];
}

function printTree(node, path) {
    const fullPath = [...path, node[0]];
    if (arraysEqual(node[0], finalState)) {
        console.log(fullPath.map(JSON.stringify));
        return;
    }
    node[1].forEach(n => printTree(n, fullPath));
}

const solutionTree = recursiveSteps(initialState);
console.log(JSON.stringify(solutionTree));
printTree(solutionTree, []);
