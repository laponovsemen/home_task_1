import {APIErrorResultType, Resolutions, CreateVideoInputModelType, UpdateVideoInputModelType} from "./appTypes";

export const addDays = (date: Date, days: number): Date => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export function CreateVideoInputModelValidator(Object : any){
    let APIErrorResult : APIErrorResultType = []


    //checking for correct "title" property  of Object
    if(typeof Object.title === "undefined"  || Object.title === null ||  !Object.title || typeof Object.title !== "string" ||  Object.title.length > 40){
        if(!Object.title || typeof Object.title === "undefined"){
            APIErrorResult.push( { message : "no title in object for CreateVideoInputModel" , field : "title"})
        }
        if(Object.title === null){
            APIErrorResult.push( { message : "null as title param" , field : "title"})
        }
        if(typeof Object.title !== "string"){
            APIErrorResult.push({ message : "non-string title in object for CreateVideoInputModel" , field : "title"})
        }
        if(Object.title.length > 40){
            APIErrorResult.push({ message : "the length of string in title in object for CreateVideoInputModel is more than 40 characters" , field : "title"})
        }
    }

    //checking for correct "author" property  of Object

    if(typeof Object.author === "undefined"  || !Object.author || typeof Object.author !== "string" ||  Object.author.length > 20){
        if(!Object.author || typeof Object.author === "undefined"){
            APIErrorResult.push({ message : "no 'author' in object for CreateVideoInputModel" , field : "author"})
        }
        if(typeof Object.author !== "string"){
            APIErrorResult.push({ message : "non-string 'author' in object for CreateVideoInputModel" , field : "author"})
        }
        if(Object.author.length > 20){
            APIErrorResult.push({ message : "the length of string in 'author' in object for CreateVideoInputModel is more than 20 characters" , field : "author"})
        }
    }
    // checking for proper resolutions of video according to server settings
    if(Object.availableResolutions && typeof Object.availableResolutions === "object" ){
        for(let i = 0; i < Object.availableResolutions.length; i++){
            if(!Resolutions.includes(Object.availableResolutions[i])){
                APIErrorResult.push({ message : "wrong values of resolutions given by creating new video" , field : "availableResolutions"})
                break;
            }
        }
    }

    // end of validation
    if(APIErrorResult.length > 0){
        return {result : false,
            errors : APIErrorResult
        }   // return object, result means result of validation , errors describes errors happened
    } else {
        return {result : true,
            errors : null
        }   // return object, result means result of validation , errors describes errors happened
    }
}

export function UpdateVideoInputModelValidator(Object : any){
    let APIErrorResult : APIErrorResultType = []
    //checking for correct "title" property  of Object
    if(!Object.title || typeof Object.title !== "string" ||  Object.title.length > 40){
        if(!Object.title){
            APIErrorResult.push( { message : "no title in object for UpdateVideoInputModel" , field : "title"})
        }
        if(typeof Object.title !== "string"){
            APIErrorResult.push({ message : "non-string title in object for UpdateVideoInputModel" , field : "title"})
        }
        if(Object.title.length > 40){
            APIErrorResult.push({ message : "the length of string in title in object for UpdateVideoInputModel is more than 40 characters" , field : "title"})
        }
    }

    //checking for correct "author" property  of Object
    if(!Object.author || typeof Object.author !== "string" ||  Object.author.length > 20){
        if(!Object.author){
            APIErrorResult.push({ message : "no 'author' in object for UpdateVideoInputModel" , field : "author"})
        }
        if(typeof Object.author !== "string"){
            APIErrorResult.push({ message : "non-string 'author' in object for UpdateVideoInputModel" , field : "author"})
        }
        if(Object.author.length > 20){
            APIErrorResult.push({ message : "the length of string in 'author' in object for UpdateVideoInputModel is more than 20 characters" , field : "author"})
        }
    }
    // checking for proper resolutions of video according to server settings
    if(Object.availableResolutions && typeof Object.availableResolutions === "object" ){
        for(let i = 0; i < Object.availableResolutions.length; i++){
            if(!Resolutions.includes(Object.availableResolutions[i])){
                APIErrorResult.push({ message : "wrong values of resolutions given by updating new video" , field : "availableResolutions"})
                break;
            }
        }
    }
    // checking if can be downloaded
    if(typeof Object.canBeDownloaded !== "undefined" && typeof Object.canBeDownloaded !== "boolean" || typeof Object.canBeDownloaded === "string"){
        APIErrorResult.push({ message : "wrong type of canBeDownloaded param given by updating new video" , field : "canBeDownloaded"})
    }
    // checking for minAgeRestriction
    if(typeof Object.minAgeRestriction !== "undefined" && typeof Object.minAgeRestriction !== "number" || Object.minAgeRestriction < 1 || Object.minAgeRestriction > 18){
        if(typeof Object.minAgeRestriction !== "undefined" && typeof Object.minAgeRestriction !== "number"){
            APIErrorResult.push({ message : "wrong type of minAgeRestriction param given by updating new video" , field : "minAgeRestriction"})
        }
        if(Object.minAgeRestriction < 1 || Object.minAgeRestriction > 18){
            APIErrorResult.push({ message : "wrong age of restriction" , field : "minAgeRestriction"})
        }
    }

    //checking for correct date
    const RegExpDate = new RegExp(/^(\\d{4})-(\\d{2})-(\\d{2})T(\\d{2}):(\\d{2}):(\\d{2}(?:\\.\\d*)?)((-(\\d{2}):(\\d{2})|Z)?)$/g);
    if(Object.publicationDate.match(RegExpDate) === null){
        APIErrorResult.push({ message : "wrong date to update" , field : "publicationDate"})
    }

    //result
    if(APIErrorResult.length > 0){
        return {result : false,
            errors : APIErrorResult
        }   // return array, array[0] means result of validation , array[1] describes the errors
    } else {
        return {result : true,
            errors : null
        }   // return array, array[0] means result of validation , array[1] describes the errors
    }
}
