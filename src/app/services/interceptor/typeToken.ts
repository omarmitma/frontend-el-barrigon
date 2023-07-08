import { HttpContext, HttpContextToken } from "@angular/common/http";

// Declare http context tokens here...
export const TIPO_TOKEN = new HttpContextToken<number>(() => 0);

//Para mandar token del sistema
export function tokenCore() {
    return new HttpContext().set(TIPO_TOKEN, 0);
}
//Para mandar token de qlever
export function tokenQlever() {
    return new HttpContext().set(TIPO_TOKEN, 1);
}