export function validateName (name){
    const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const testName= nameRegex.test(name);
    if(!testName) return name;
}
export function validateNumber(number){
    const numberRegex= /^[0-9]$|^[1-9][0-9]$|^(100)$/;
    const testNumber = numberRegex.test(number);
    if(!testNumber) return number;
}
