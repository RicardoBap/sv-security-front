import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "../storage.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  durationInSeconds = 3;

  constructor(
    public storage: StorageService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Passou no error interceptor')
    return next.handle(request)
      .pipe(         
        catchError(err => {         
          let errorObj = err;
          
          if (err instanceof HttpErrorResponse) {
            //console.log('Processing http error', err);           
            
            // if(errorObj.error) {
            //   errorObj = err.error
            //   //console.log('inteceptor resumo', err.error)
            // }
            // if(!errorObj.status) {
            //   errorObj = JSON.parse(err.error)
            //   //console.log('inteceptor sem status code', err.error)
            // }

            switch(errorObj.status) {
              case 400:
                console.log('passou aqui 400')
                this.handle400(errorObj)
                break;

              case 401:
                console.log('passou aqui 401')
                this.handle401(errorObj);               
                break;

              case 403:
                console.log('passou aqui 403')
                this.handle403(errorObj);
                console.log('refreshToken -> erro token inválido', errorObj)
                break;

              // case 404:
              //   console.log('passou aqui 404')
              //   this.handle404(errorObj)
              //   break;

              default:
                this.handleDefaultError(errorObj);
            }          
          }        

          return throwError(errorObj);	 
        })
      )       
    
  }

  handle400(errorObj) {
    errorObj = JSON.parse(errorObj.error)
    this.snackBar.open(errorObj[0].mensagemUsuario, errorObj[0].status, 
    { duration: 1000, panelClass: ['snack_error'] }); 
  }

  // handle401() {
  //   let config = new MatSnackBarConfig();
  //   config.duration = 5000;
  //   config.panelClass = ['red-snackbar']
  //   this._snackBar.open("This is a message!", "ACTION", config);
  // }

  handle401(errorObj) {
    console.log('passou sim 401')
    this.router.navigate(['/login'])
    this.snackBar.open('Não autorizado', '401',
    //this._snackBar.open(errorObj.message, errorObj.status, 
    { duration: 1000 }); 
  }

  handle403(errorObj) {
    this.storage.setLocalUser(null);
    console.log('passou sim 403')
    this.snackBar.open('Erro no servidor', '403', 
    //this.snackBar.open(errorObj.message, errorObj.status,
    { duration: 1000 }); 
  }

  // handle404(errorObj) {
  //   let config = new MatSnackBarConfig()
  //   config.duration = 2000;
  //   config.panelClass = ['snack_error']
  //   this.snackBar.open(errorObj.error.message, errorObj.error.status, config)
  // }

  handleDefaultError(errorObj) {
    console.log(errorObj)    
    //this.snackBar.open('Erro not found', '404',   
    this.snackBar.open(errorObj.error[0].mensagemUsuario, errorObj.status, 
    { duration: 1000 , panelClass: ['snack_error']}); 
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};



// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   return next.handle(req)
//   .pipe()
//   .catch((error, caught) => {
//     return Observable.throw(error);
//   }) as any;
//   }




// export class ServerErrorsInterceptor implements HttpInterceptor {

//   // intercept function
//   public intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     // returning an observable to complete the request cycle
//     return new Observable((observer) => {
//       next.handle(req).subscribe(
//         (res: HttpResponse<any>) => {
//           if (res instanceof HttpResponse) {
//             observer.next(res);
//           }
//         },
//         (err: HttpErrorResponse) => {
//           console.error(err);
//         }
//       );
//     });
//   }
// }





// export class ServerErrorsInterceptor implements HttpInterceptor {
//   constructor(
//     private error: HandleErrorService,
//   ) {}

//   // intercept function
//   public intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     // returning an observable to complete the request cycle
//     return new Observable((observer) => {
//       next.handle(req).subscribe(
//         (res: HttpResponse<any>) => {
//           if (res instanceof HttpResponse) {
//             observer.next(res);
//           }
//         },
//         (err: HttpErrorResponse) => {
//           this.error.handleError(err);
//         }
//       );
//     });
//   }