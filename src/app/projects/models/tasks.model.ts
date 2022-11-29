export interface Task {
    idField?: string,
    id?: string,
    name: string,
    completionStatus: boolean,
    edit: boolean,
    date: string,
    endDate?: string,
}
