import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ServiceFin {
  rutaApi = "https://evergreen-finance-back.herokuapp.com";

  constructor(private http: HttpClient) {}

  obtener() {
    return this.http.get(`${this.rutaApi}/eveergreen/fin/pay/get-invoices`);
  }

  registrar(req: any) {
    return this.http.post(`${this.rutaApi}/eveergreen/fin/pay/create-invoice`, req);
  }

  actualizar(id: number, req: any) {
    return this.http.put(`${this.rutaApi}/eveergreen/fin/pay/update-invoice-products/${id}`, req);
  }

  eliminar(id: any) {
    return this.http.delete(`${this.rutaApi}/eveergreen/fin/pay/delete-invoice/${id}`);
  }
}