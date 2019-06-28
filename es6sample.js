//remember, let and const have block scope, so let is defined outside the function
//in order to log it outside the function
let tmp;
const newFunction = () => {
    if (true) {
        tmp = 456;
        
    }
    console.log(tmp);

}
newFunction();