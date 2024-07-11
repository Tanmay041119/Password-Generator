const inputSlider=document.querySelector("[data-lengthSlider]");
const dataLen=document.querySelector("[data-lenghtNumber]");
const dispPassword=document.querySelector("[data-passwordDisplay]");
const btn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const upperCase=document.querySelector('#UpperCase');
const lowerCase=document.querySelector('#LowerCase');
const numbers=document.querySelector('#Numbers');
const symbols=document.querySelector('#Symbols');
const indicator=document.querySelector("[data-indicator]");
const generateButton=document.querySelector('.generateButton');
const allcheck=document.querySelectorAll("input[type=checkbox]");
 
let password="";
let passwordLength = 10;
let checkCount=0;
//set password length
handleSlider();
setIndicator("#385170")
function handleSlider(){
    inputSlider.value=passwordLength;
    dataLen.innerText=passwordLength;
}
function setIndicator(color)
{
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0 0 20px 10px ${color}`
}
function getRandomInteger(min,max){
  return  Math.floor(Math.random()*(max-min+1)) + min;
}
function getRandomNumber(min,max){
    return getRandomInteger(0,9);
}
function getRandomLowerCase(){
    let r=getRandomInteger(97,122);
    return String.fromCharCode(r);
}
function getRandomUpperCase(){
    let r=getRandomInteger(65,90);
    return String.fromCharCode(r);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?/~`';
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}
function changeState(){
    checkCount=0;
    allcheck.forEach(checkbox => {
        if(checkbox.checked)
        {
            checkCount++;
        }
    });
    //condition
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allcheck.forEach((checkbox) => {
    checkbox.addEventListener('change',changeState)
});

function shuffleString(str) {
    // Convert the string to an array
    let arr = str.split('');

    // Use Fisher-Yates shuffle to shuffle the array
    for (let i = arr.length - 1; i > 0; i--) {
        let j = getRandomInteger(0, i);
        // Swap elements arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Convert the array back to a string
    return arr.join('');
}
 async function copyToClipboard(){
    try{
      await  navigator.clipboard.writeText(dispPassword.value);
      copyMsg.innerText='Copied!'
      copyMsg.style.color='#ececec';

    }
    catch(e){
        alert('failed');
    }
    copyMsg.classList.add("active");
   // copyMsg.classList.add("active");
    setTimeout(function(){
        copyMsg.classList.remove("active");
    },2000);
}
inputSlider.addEventListener('input',function(event){

    passwordLength=event.target.value;
    handleSlider();
});
btn.addEventListener('click',function(){
    if(dispPassword.value.length>0)
    {
        copyToClipboard();
    }
    if(checkCount==0)
        {
            alert('Please Generate Password To Copy');
            return;
        }
});
//calc strenght
function calcStrength(){

    let hasUpper=false;
    let hasLower=false;
    let hasSymbol=false;
    let hasNumber=false;
    if(upperCase.checked)hasUpper=true;
    if(lowerCase.checked)hasLower=true;
    if(symbols.checked)hasSymbol=true;
    if(numbers.checked)hasNumber=true;
    if(hasLower&&hasUpper&&(hasSymbol||hasNumber)&&passwordLength>=8)
    {
        setIndicator("#0f0");
    }
    else if((hasLower||hasUpper)&&(hasSymbol||hasNumber)&&passwordLength>=6)
    {
        setIndicator("#FFFF00");
        
    }
    else{
        setIndicator("#f00")
    }

}
generateButton.addEventListener('click',function(){

    if(checkCount<=0)return ;
    if(passwordLength<checkCount)
    {
            passwordLength=checkCount;
            handleSlider();
    }
    password="";
    let funcArr=[];
    if(upperCase.checked)funcArr.push(getRandomUpperCase);
    if(lowerCase.checked)funcArr.push(getRandomLowerCase);
    if(symbols.checked)funcArr.push(getRandomSymbol);
    if(numbers.checked)funcArr.push(getRandomNumber);
    //compulsary
    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let idx=getRandomInteger(0,funcArr.length-1);
        password+=funcArr[idx]();
    }
    password=shuffleString(password);
    calcStrength();
    dispPassword.value=password;
}
)
