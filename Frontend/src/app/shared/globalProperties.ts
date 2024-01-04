export class globalProperties{
    //Messages
public static genericError : string='Something went Wrong! Please try again later.'

public static unauthorized : string = "You are not authorized person to access this page!"


//Regular Expression (Regex)
public static nameRegx : string ='([a-zA-Z0-9]*)'
public static emailRegx: string = '[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\\.[a-z]{2,3}'
public static contactNumberRegex : string ='^[0-9]{10,10}$'

//Variables
public static error: string = 'error'

}



// Symbols Meaning.....
// . => Any Single CharacterData
// * => Zero/more Occurances
// + => One/more Occurances
// ? => Zero/One Occurance
// ^ => Begining of the line
// $ => End of the line
// [] => Any one character in the set listed
// [^] => Any one character NOT in the set listed
// | => or operator
// \ => Escape Special Character
// () => Character Sequence
// {} => Range Qualifiers Ex: a{2,3}= 'aa' or 'aaa' 




