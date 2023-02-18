const testCases = [
    //[exprString, expected Result]
    ['1 + 2 * ( 6 + 7 )', 27],
    ['1 + 2 * ( ( 6 + 7 ) )', 27],
    ['1 + 2 * ( 6 * 7 )', 85],
    ['1 + 2 * ( 6 + 7 / ( 4 / 2 ) )', 20],
    ['( 1 + 2 )', 3],
    ['1 - 3', -2],
    ['2 / 3', 2/3],
    //Operations with '0'
    ['0 / 1', 0],
    ['-0 / 1', 0],
    ['1 / 0', Infinity],
    ['0 * 1', 0],
    ['-0 * 1', 0],
    ['0 / 0', NaN]
]

for(var i = 0, len = testCases.length; i < len; i++){
    const expr = testCases[i][0].split(' ');
    const result = shuntingYard(expr);

    if(result == testCases[i][1])
        console.log('Test ', i, ' [PASSED]', ':', expr);
    else
        console.log('Test ', i, ' [FAIL]', ':', testCases[i][0])

    console.log('Expected: ', testCases[i][1],
                '\nResult: ', result
                );

}