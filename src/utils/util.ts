export const isValidEmail = (email?: string) => email ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email): false


export function testUpper(text:string) {
    return /[A-Z]/.test(text);
}


export function testLower(text:string) {
    return /[a-z]/.test(text);
}


export function testDigit(text:string) {
    return /\d/.test(text);
}


export function testSpecial(text:string) {
    return /[@*^!$%&?]/.test(text);
}


export function isStrongPassword(password?:string) {
    return password ? testUpper(password) && testLower(password) && testDigit(password) && testSpecial(password) && password.length >= 8 : false;
}
