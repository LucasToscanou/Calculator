//Button click event---------------------------------
const buttons = document.querySelector('.button-box');
buttons.addEventListener('click', myFunction);

//Define the expression array that will take, operators
//operands, and characters like parenthesis as unique elements

function myFunction(event) {
    var expr = [];
    const {target} = event;
    const value = (target.innerHTML).trim();
    // console.log('innerHTML: ', target.innerHTML);
    if(!target.matches('button'))
        return;

    else if(value){
        if(value == '=')
            shuntingYard(expr);
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
            exprItemArr.push(value);
            // console.log('exprItemArr: ', exprItemArr);
            expr = expr.concat(exprItemArr);
            console.log('expr: ', expr);
        }
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
    // console.log('Result:', yard2);


    function calculation(yard1){
        var yard2 = [];
    
        const yard1Domain = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    
        for(var i = 0, len = yard1.length; i < len; i++){
            // console.log("yard1[i] = ", yard1[i], yard1Domain.includes(yard1[i]));
            if(yard1Domain.includes(yard1[i])){
                yard2.push(yard1[i]);
                // console.log("XXX yard 2: ", yard2);
            } 
            else{
                // console.log("yard2", yard2);
                const oper = yard1[i];
                const n1 = Number(yard2.pop());
                const n2 =  Number(yard2.pop());
                // console.log("oper, n1, n2: ", oper, n1, n2)
                yard2.push(operation(oper, n1, n2));
                // console.log("yard2", yard2);
                
            } 
                
        }
    
        return yard2;
    }

    function separateYards(expr){
        var yard1 = [];
        var yard2 = [];
        const yard1Domain = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        const yard2Domain = ['(', '+', '-', '*', '/'];
    
        for(var i = 0, len = expr.length; i < len; i++){
            if(yard1Domain.includes(expr[i])){
                yard1.push(expr[i]);
            } 
            else if (yard2Domain.includes(expr[i])){
                yard2.push(expr[i]);
            } 
            else if(expr[i] == ')'){
                while(yard2[yard2.length - 1] != '(')
                    yard1.push(yard2.pop());
                yard2.pop();
            }
            else{
                //Code a propper ERROR throw
                console.log("Error - Unknown character in the expression array: ", expr[i]);
            }
    
            
        // console.log('i = ', i, ' ', '[yard1, yard2]: ', yard1, yard2);
        }
    
        while(yard2[0]){
            yard1.push(yard2.pop());
        }
    
        return yard1;
    }
    
    function operation(oper, n1, n2){
        switch (oper) {
            case '+':
                return n2 + n1;
                break;
            case '-':
                return n2 - n1;
                break;
            case '*':
                return n2 * n1;
                break;
            case '/':
                return n2 / n1;
                break;
            default:
                break;
        }
    }


    return yard2[0];
}



