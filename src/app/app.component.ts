import { Component } from '@angular/core';
import { ServiceFin } from 'src/services/service-fin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'front-fin-compras-evergreen';
  verFacturas: boolean =  false;
  verFormCrear: boolean = false;
  productSelected: string = "";
  priceProductSelected: number = 0;
  cantidadSelected: number = 0;
  totalFactura: number = 0;
  facturas: string = "";
  productos = [ 
    { id: 1, producto: "Tierra", precio: 100000 },
    { id: 2, producto: "Fertilizante", precio: 250000 },
    { id: 3, producto: "Abono", precio: 40000 },
    { id: 4, producto: "Semillas", precio: 50000 },
  ];

  cantidad = [ 
    { id: 1, cantidad: 1 },
    { id: 2, cantidad: 2 },
    { id: 3, cantidad: 3 },
    { id: 4, cantidad: 4 },
    { id: 5, cantidad: 5 },
  ];

  carrito? = ""

  constructor(public serviceFin: ServiceFin) {}


  public postCompras(){
    this.verFormCrear = true;
    console.log("mira estoy llamando al servicio postCompras")
  }

  public comprar(){
    const rep = {
      "products_list" :[
          {"producto": "tierra", "precio": 200000},
          {"producto": "abono", "precio": 160000}
      ],
      "total_invoice" : 360000
  }
    this.serviceFin.registrar(rep).subscribe((element: any) => {
      console.log("Mira create-invoice:", element.body)
    });
  }

  public getFacturas(){
    this.verFacturas = true;
    this.serviceFin.obtener().subscribe((element: any) => {
      this.facturas = element.body.products_list;
      console.log("Mira get-invoices:", element.body.products_list)
    });
  }

  public updateProductsFacturas(){
    const req =  {
      "products_list" :[
          {"producto": "tierra", "precio": 100000},
          {"producto": "abono", "precio": 80000}
      ],
      "total_invoice" : 190000
    }
    this.serviceFin.actualizar(1, req).subscribe((element: any) => {
      console.log("Mira update-invoice-products:", element.body)
    });
  }

  public deleteFacturas(){
    this.serviceFin.eliminar(1).subscribe((element: any) => {
      console.log("Mira delete-invoice:", element.body)
    });
  }

  public updateCarrito(){
    this.totalFactura = this.totalFactura + this.priceProductSelected;
  }

  public onChangeProduct(event: any): void{
    const idProduct = event.target.value;
    let e = this.productos.find(element => element.id == idProduct);
    this.productSelected = e?.producto || "";
    this.priceProductSelected = e?.precio || 0;
    this.priceProductSelected = this.priceProductSelected * this.cantidadSelected;
    this.totalFactura = this.totalFactura + this.priceProductSelected;
  }

  public onChangeCantidad(event: any){
    const idCantidad = event.target.value;
    let c = this.cantidad.find(element => element.id == idCantidad);
    this.cantidadSelected = c?.cantidad || 0;
  }
}



