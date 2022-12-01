export interface Project {
    idField?: string,
    id?: string,
    name: string,
    completionStatus: boolean,
    edit: boolean,
    date: string
    tasks?:any[]
}