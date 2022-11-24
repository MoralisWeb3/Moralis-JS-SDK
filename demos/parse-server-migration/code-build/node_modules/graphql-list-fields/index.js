function getBooleanArgumentValue(info, ast) {
    const argument = ast.arguments[0].value;
    switch (argument.kind) {
        case 'BooleanValue':
            return argument.value;
        case 'Variable':
            return info.variableValues[argument.name.value];
    }
}

function isExcludedByDirective(info, ast) {
    const directives = ast.directives || [];
    let isExcluded = false;
    directives.forEach(directive => {
        switch (directive.name.value) {
            case 'include':
                isExcluded = isExcluded || !getBooleanArgumentValue(info, directive);
                break;
            case 'skip':
                isExcluded = isExcluded || getBooleanArgumentValue(info, directive);
                break;
        }
    });
    return isExcluded;
}

function dotConcat(a, b) {
    return a ? `${a}.${b}` : b;
}

function getFieldSet(info, asts = info.fieldASTs || info.fieldNodes, prefix = '') {
    // for recursion: fragments doesn't have many sets
    if (!Array.isArray(asts)) {
        asts = [asts];
    }

    const selections = asts.reduce((selections, source) => {
        if (source && source.selectionSet && source.selectionSet.selections) {
            selections.push(...source.selectionSet.selections);
        }
        return selections;
    }, []);

    return selections.reduce((set, ast) => {
        if (isExcludedByDirective(info, ast)) {
            return set;
        }
        switch (ast.kind) {
            case 'Field':
                const newPrefix = dotConcat(prefix, ast.name.value);
                if (ast.selectionSet) {
                    return Object.assign({}, set, getFieldSet(info, ast, newPrefix));
                } else {
                    set[newPrefix] = true;
                    return set;
                }
            case 'InlineFragment':
                return Object.assign({}, set, getFieldSet(info, ast, prefix));
            case 'FragmentSpread':
                return Object.assign({}, set, getFieldSet(info, info.fragments[ast.name.value], prefix));
        }
    }, {});
}

module.exports = function getFieldList(info) {
    return Object.keys(getFieldSet(info));
};
