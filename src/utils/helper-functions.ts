
export function generatePassword(length:number=8):string{
    const str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#%&'
    const res= Array.from({length},()=>str[Math.floor(Math.random()*str.length)]).join('')
    return res
}