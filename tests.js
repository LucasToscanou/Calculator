const testCases = [
    //Schema: [exprString, expected Result]

    //Single digit expression
    ['1', 1],

    //Parenthesis handling
    ['( )', 0],
    ['1 + ( )', 1],
    ['( 1 )', (1)],
    ['( ( 1 ) )', ( ( 1 ) )],
    ['1 + ( 2 )', 1 + ( 2 )],
    ['1 - ( 2 )', 1 - ( 2 )],
    ['1 * ( 2 )', 1 * ( 2 )],
    ['1 / ( 2 )', 1 / ( 2 )],

    //Operations with negatives
    ['1 - 2', 1 - 2],
    ['1 + ( -2 )', 1 + ( -2 )],
    ['1 - ( -2 )', 1 - ( -2 )],
    ['1 * ( -2 )', 1 * ( -2 )],
    ['1 / ( -2 )', 1 / ( -2 )],
    ['-0', -0],

    //Operations with '0'
    ['0 / 1', 0],
    ['-0 / 1', 0],
    ['1 / 0', Infinity],
    ['0 * 1', 0],
    ['0 * 1', 0],
    // ['0 / 0', 'NaN'] //If not commented, it breaks the code~~converted to string to avoid code with limited applicability~~

    //Operations with large numbers

    //Operations with small numbers


    //Float numbers
    ['1.0', 1.0],
    ['1.1 + 2.2', 3.3],
    ['1.1 * 2', 2.2],
    ['1.1 / 2', 0.55],

    //Random
    ['1 + 2 * ( 6 + 7 )', 1 + 2 * ( 6 + 7 )],
    ['1 + 2 * ( ( 6 + 7 ) )', 1 + 2 * ( ( 6 + 7 ) )],
    ['1 + 2 * ( 6 * 7 )', 1 + 2 * ( 6 * 7 )],
    ['1 + 2 * ( 6 + 7 / ( 4 / 2 ) )', 1 + 2 * ( 6 + 7 / ( 4 / 2 ) )],
    ['( 1 + 2 )', ( 1 + 2 )],
    ['1 - 3', 1 - 3],
    ['2 / 3', 2 / 3],
    ['( 2 + ( 3 ) * ( ( 1 + 3 ) / 2 ) )', (2 + ( 3 ) * ( ( 1 + 3 ) / 2 ))],
]

var qtPass = 0;
for(var i = 0, len = testCases.length; i < len; i++){
    const expr = testCases[i][0].split(' ');
    const result = shuntingYard(expr);
    if(+result === testCases[i][1]){
        // console.log(`Test ${i}`, ' [PASSED]', ':', testCases[i][0]);
        // console.log('Expected: ', testCases[i][1], typeof(testCases[i][1]), 
        //         '\nResult: ', result, typeof(result)
        //         );
        qtPass++;
    }
    else{
        console.log(`Test ${i}`, ' [FAIL]', ':', testCases[i][0]);
        console.log('Expected: ', testCases[i][1],
                '\nResult: ', result
                );
    }

    
}

console.log(`TESTS: PASSED [${qtPass}/${testCases.length}]`);