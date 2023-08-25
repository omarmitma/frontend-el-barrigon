import { Injectable } from '@angular/core';

@Injectable()
export class FilterItems {

    constructor() {}

    filterMenorMayor(objetoArray:any[],variable:string){
        return objetoArray.sort((a, b) => {
            if (a[variable] > b[variable]) return 1;
            if (a[variable] < b[variable]) return -1;
            return 0;
        });
    }

    filterMayorMenor(objetoArray:any[],variable:string){
        return objetoArray.sort((a, b) => {
            if (a[variable] < b[variable]) return 1;
            if (a[variable] > b[variable]) return -1;
            return 0;
        });
    }

    filterOrdenAbec(objetoArray: any[], variable: string, orden: "asc" | "desc") {
        return objetoArray.sort((a, b) => {
            const comparison = a[variable].localeCompare(b[variable]);
            return orden === "asc" ? comparison : -comparison;
        });
    }
    
}
