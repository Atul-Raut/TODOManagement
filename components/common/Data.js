

export const toDoList = [
    {"createdBy":"Default","id":"1", "task":"Meeting with customer for requiriment.", "planedDate":"2023-07-19", "endDate":"2023-07-19", "responsible":"atul"},
    {"createdBy":"Default","id":"2","task":"Requirement document creation.", "planedDate":"2023-07-20", "endDate":"2023-07-20", "responsible":"atul"}
];


export const doingList = [
    {"createdBy":"Default","id":"3", "task":"Meeting prepration.", "planedDate":"2023-07-18", "endDate":"2023-07-18", "actualStartDate":"2023-07-18", "responsible":"atul"},
];


export const doneList = [
    {"createdBy":"Default","id":"3", "task":"Meeting prepration.", "planedDate":"2023-07-18", "endDate":"2023-07-18", "actualStartDate":"2023-07-18", "actualEndDate":"2023-07-18", "responsible":"atul"},
];
export const deletedList = [];

//Should be validated from service side or form DB
//Should be encrypted
export const allowUsers = [
    {"userName":"a", "password":"a"},
    {"userName":"atul", "password":"atul"},
    {"employee1":"employee1", "password":"employee1"},
    {"userName":"employee2", "password":"employee2"}
]
