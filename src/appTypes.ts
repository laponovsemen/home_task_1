type ResolutionsType =  "P144" |"P240"| "P360"| "P480" | "P720"| "P1080"| "P1440"| "P2160" ;

type VideoType = {
    "id"? : number,
    "title": string,
    "author": string,
    "canBeDownloaded"?: boolean , //By default - false

    "minAgeRestriction"?: number, //maximum: 18 minimum: 1 default: null nullable: true null - no restriction
    "createdAt"?:	string,
    "publicationDate"?:	string, //By default - +1 day from CreatedAt
    "availableResolutions": ResolutionsType

}
type CreateVideoInputModelType = {
    "title" : string,  //maxLength: 40
    "author": string,  // maxLength: 20

    "availableResolutions"? : ResolutionsType //nullable: true At least one resolution should be added

}

type UpdateVideoInputModelType = {
    title : string, // maxLength: 40
    author:	string, //maxLength: 20
    availableResolutions: string, //nullable: true    At least one resolution should be added
    canBeDownloaded: boolean ,
    minAgeRestriction: number,
    publicationDate: string
}

type h1Type = {
    "CreateVideoInputModel" : CreateVideoInputModelType,
    "Resolutions" : ResolutionsType,
    "UpdateVideoInputModel" : UpdateVideoInputModelType,
    "Video" : VideoType
}

type FieldErrorType = {
    "message": 	string | null ,// nullable: true  Message with error explanation for certain field,
    "field" : string | null // nullable: true  What field/property of input model has error
}