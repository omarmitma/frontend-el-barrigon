import { Injectable } from "@angular/core";
import { CloudinaryService } from "src/app/services/cloudinary.service";
import { environment } from "src/environments/environment";

@Injectable()
export class CloudinaryFunction {

    constructor(private cloudinaryService:CloudinaryService){}

    uploadCloudinary(file:File):Promise<string>{
        return new Promise((resolve, reject)=>{
            console.log(file);
            if(file === undefined) resolve("");

            if(file.size === undefined) resolve("");
            else{
                const file_data = file;
                const data = new FormData();
                data.append('file',file_data);
                data.append('upload_preset',environment.upload_preset);
                data.append('cloud_name',environment.cloud_name);
            
                this.cloudinaryService.uploadImage(data).subscribe(response=>{
                    resolve(response.url);
                });
            }
        })
    }

}
