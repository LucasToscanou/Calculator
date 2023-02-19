//User keyboard input event
// const inputField = document.getElementById('exprDisplay');

// inputField.addEventListener('keydown', (event) => {
//   const key = event.key;
//   const value = inputField.value;
  
//   // Allow numeric keys, decimal point, and some math symbols
//   if (/[\d\.+\-*/%]/.test(key)) {
//     // Prevent multiple decimal points in the input
//     if (key === '.' && value.includes('.')) {
//       event.preventDefault();
//     }
//   } else {
//     // Prevent other keys from being entered
//     event.preventDefault();
//   }
// });

// inputField.addEventListener('input', (event) => {
//   const value = event.target.value;
  
//   // Remove any non-numeric, non-decimal point characters from the input
//   event.target.value = value.replace(/[^\d\.+\-*/%]/g, '');
// });


//Button click event---------------------------------
const buttons = document.querySelector('.grid-container');
buttons.addEventListener('click', myFunction);

//Define the expression array that will take, operators
//operands, and characters like parenthesis as unique elements
var expr = [];


function myFunction(event) {
    const {target} = event;
    const value = (target.innerHTML).trim();
    // console.log('innerHTML: ', target.innerHTML);
    if(!target.matches('button'))
        return;

    else if(value){
        if(value == '='){
            expr = formatExpr(expr);
            // console.log('Formated Expression: ', expr);
            const result = shuntingYard(expr);
            updateDisplay(result);
            //Saves the result from the previous calculation on the expression array for the next calculation
            expr = [result];
        }
        else{
            var exprItemArr = [];

            //Scientific calculator operations
            //if(value == 'x^2')
            //  expr.push(^2);
            // 
            // if(value == 'sqrt(x)')
            //     exprItemArr = ['sqrt', '(', ')'];
            // else
            //     exprItemArr.push(value);
            if(value == 'CLEAR')
                expr = [];
            else
                exprItemArr.push(value);
                // console.log('exprItemArr: ', exprItemArr);
                expr = expr.concat(exprItemArr);

            console.log('expr: ', expr);
            updateDisplay(expr.join(' '));
        }
    }   
}

function updateDisplay(newValue){
    // Get the input element by ID
    var exprDisplay = document.getElementById("exprDisplay");

    // Set the value of the input element
    exprDisplay.value = newValue;
}

function formatExpr(expr){
    
    // //Considers curly braces and brackets as parenthesis
    // expr = expr.map((elem) => {
    //     if( ['{', '['].includes(elem) )
    //         return '(';
    //     else if ( ['}', ']'].includes(elem) )
    //         return ')';
    // })
    expr = emptyParenthesisFix(expr);
    expr = floatNumber(expr);
    return signedNumber(expr);


    //Returns an array for the expression with signed numbers bundled together with their signs. 
    function signedNumber(expr){
        const symbolDomain = ['(', ')', '+', '-', '*', '/'];
        const sumSubDomain = ['+', '-'];
        var signedExpr = [];

        forLoop:
        for(var i = 0, len = expr.length; i < len; i++){
            //Value to be concatanated to formattedExpr
            var concValue = '';

            //If the previous element in the expr array is a symbol, the current element is either '+' or '-' and the next element is
            //not a symbol (i.e. it's a number), it joins the current element with the following element in the expr array.
            //Obs: since the signedNumber is called after the floatNumber, the point ('.') is not include as a symbol.
            if( (i >= 1 ? symbolDomain.includes(expr[i - 1]) : true)
                && sumSubDomain.includes(expr[i]) 
                && !symbolDomain.includes(expr[i + 1])){
                    //Join the sign and the number (next element in the array) 
                    concValue = expr[i] + expr[i + 1];
                    //It does not iterate over the 'i + 1' element because it was already analysed 
                    i++;
                }
            else {
                //Edit: Throw a Syntax Error if 2 operators (disconsider parenthesis or equivalents) other than '+' and '-' are in a sequence.
                //Edit: Throw a Syntax Error if more than 2 '+' or '-' are in a sequence.

                //If the previous, the current and the following elements are symbols (not including 
                //parenthesis and equivalents for the current and following), throws an error
                if((i >= 1 ? symbolDomain.includes(expr[i - 1]) : true)
                    && sumSubDomain.includes(expr[i]) 
                    && symbolDomain.includes(expr[i + 1])){
                        console.log('Error 4: Syntax Error from 3 or more consecutive symbols in the expression.');
                        break forLoop;
                }
                concValue = expr[i];
            }
            

            signedExpr = signedExpr.concat(concValue);
        }

        
        return signedExpr;

        
    }

    //Solves the problem of the case '( )'
    function emptyParenthesisFix(expr){
        //Empty parenthesis are a problem beacuse it is not interpreted right in the function,
        //The solution is to assume the user meant '(0)' with their input
        //Obs: This function must be run after the convertion of the braces and brackets into parenthesis
        //for a more complete solution.
        var formattedExpr = [];

        for(var i = 0, len = expr.length; i < len; i++){
            var concValue = '';
            if(expr[i] == '(' && expr[i + 1] == ')' && i + 1 <= len){
                    //Substitutes the pair of parenthesis for a '0'.
                    concValue = '0';
                    //It does not iterate over the 'i + 1' element because it was already analysed .
                    i++;
                }
            else
                //Edit: Throw a Syntax Error if 2 operators (disconsider parenthesis or equivalents) other than '+' and '-' are in a sequence.
                //Edit: Throw a Syntax Error if more than 2 '+' or '-' are in a sequence.
                concValue = expr[i];
            

            formattedExpr = formattedExpr.concat(concValue);
        }

        return formattedExpr;
    }

    //Returns an array for the expression with the algarisms and floating point of float numbers bundled together. 
    function floatNumber(expr){
        //It parses through expr looking for a point ('.'). While it doesn't find it, it keeps track of the algarisms
        //iterated and when the point is found, they are added as the integer part of the result float. After it 
        //found the point, it continues parsing and concatanating the algarisms found to the result float.
        //Obs: once it parses through a symbol, the record of algarisms is emptied.
        const symbolDomain = ['(', ')', '+', '-', '*', '/'];
        var integerPartSave = [];
        var formattedExpr = [];

        outerloop:
        for(var i = 0, len = expr.length; i < len; i++){
            //Value to be concatanated to formattedExpr
            var concValue = '';

            //If it's an algarism, saves it in integerPartSave and in concValue
            if(!symbolDomain.includes(expr[i]) && expr[i] != '.'){
                integerPartSave = integerPartSave.concat(expr[i]);
                concValue = expr[i];
            }
            //Else If it's a point ('.')
            else if(expr[i] == '.'){
                //Removes the elements that were added unecessarily to the formattedExpr
                formattedExpr = formattedExpr.slice(0, formattedExpr.length - integerPartSave.length);
                //Adds the interger part to the concValue
                concValue = concValue.concat(integerPartSave, '.');
                //Empties the saved algarisms from the integer part 
                integerPartSave = [];

                //Parses through the rest of the expression array to find the decimal part and concatanes it
                //to concValue
                for(var k = i; k < len && k + 1 < len; k++){
                    //If there are more than 1 point ('.') before a symbol appears.
                    if(expr[i + 1] == '.'){
                        console.log("Error 3: Syntax Error from misplaced '.' in the expression.");
                        break outerloop;
                    }
                    //If the next element is a number, it is added to concValue.
                    if(!symbolDomain.includes(expr[k + 1])){
                        concValue = concValue.concat(expr[k + 1]);
                        //Skips the elements that were concatanated to concValue.
                        i++;
                    }
                    //If isn't a point and it is a symbol, it breaks and both the integer and the decimal parts
                    //of the float are now known and the float is stored in concValue. 
                    else
                        break;
                }
            }
            else{
                //If a symbol is found, it empties the saved algarisms from the integer part
                integerPartSave = [];
                concValue = expr[i];
            }

            formattedExpr = formattedExpr.concat(concValue);
        }

        return formattedExpr;
    }
}




//Shunting yard-----------------------------------------------
function shuntingYard(expr){
    var yard1 = [];
    var yard2 = [];
    
    //Hard coded; Expected result: 27
    // expr = ['1', '+', '2', '*', '(', '6', '+', '7', ')'];
    yard1 = separateYards(expr);
    // console.log('$$$ yard1: ', yard1);

    yard2 = calculation(yard1);
    console.log('Result:', yard2);


    //Consider changing the for loop for a map
    function calculation(yard1){
        var yard2 = [];
        if(yard1.length <= 2)
            yard2 = yard1;
        else{
            const symbolDomain = ['+', '-', '*', '/'];

            for(var i = 0, len = yard1.length; i < len; i++){
                // console.log("yard1[i] = ", yard1[i], yard1Domain.includes(yard1[i]));
                if(!symbolDomain.includes(yard1[i])){
                    yard2.push(yard1[i]);
                    // console.log("XXX yard 2: ", yard2);
                } 
                else{
                    // console.log("yard2", yard2);
                    const oper = yard1[i];
                    const n1 = yard2.pop();
                    const n2 =  yard2.pop();
                    // console.log("oper, n1, n2: ", oper, n1, n2)
                    yard2.push(operation(oper, n1, n2));
                    // console.log("yard2", yard2);      
                }             
            }
        }

        return yard2;
    }

    //Consider changing the for loop for a map
    function separateYards(expr){
        var yard1 = [];
        var yard2 = [];
        const yard2Domain = ['(', ')', '+', '-', '*', '/'];
    
        for(var i = 0, len = expr.length; i < len; i++){
            if(yard2Domain.includes(expr[i])){
                if(expr[i] == ')'){
                    while(yard2[yard2.length - 1] != '(')
                        yard1.push(yard2.pop());
                    yard2.pop();
                }
                else
                    yard2.push(expr[i]);
            }
            else
                yard1.push(expr[i]);                
    
            
        // console.log('i = ', i, ' ', '[yard1, yard2]: ', yard1, yard2);
        }
    
        while(yard2[0]){
            yard1.push(yard2.pop());
        }
    
        return yard1;
    }
    
    function operation(oper, n1, n2){
        if(n1.match(/[.]/g) || n2.match(/[.]/g)){
            const n1Float = new Decimal(n1); 
            const n2Float = new Decimal(n2); 

            switch (oper) {
                case '+':
                    return String(n2Float.plus(n1Float));
                    break;
                case '-':
                    return String(n2Float.minus(n1Float));
                    break;
                case '*':
                    return String(n2Float.times(n1Float));
                    break;
                case '/':
                    return String(n2Float.dividedBy(n1Float));
                    break;
                default:
                    break;
            }
        }
        else{
            n1 = Number(n1);
            n2 = Number(n2);

            switch (oper) {
                case '+':
                    return String(n2 + n1);
                    break;
                case '-':
                    return String(n2 - n1);
                    break;
                case '*':
                    return String(n2 * n1);
                    break;
                case '/':
                    return String(n2 / n1);
                    break;
                default:
                    break;
            }
        }
    }


    return yard2[0];
}



