import { Component, OnInit, ViewChild , Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { actionUrl, AppUrls } from 'src/environments/app-urls';
import Axios from 'axios';
import Notiflix from "notiflix";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})

export class OrderSummaryComponent implements OnInit {
  @ViewChild('owlElement') owlElement: any;
  productid:any;
  @Input () selectedData:any =[];
  orderId: any=[];
  orderSummaryData: any =[];
  index: any;
  userId:any;
  quantity:any;
  type : any;
  orderStatus:boolean = true;
  productStatus:any=false;
  ordersData: any;
  totalAmt:any;
  productDetails:any=[];
  searchKey:any='All'
  Math:any;
  unitTotalCount:any;
  customOptions:any  ={
    items: 5, dots: false, nav: true, 
    loop: true,
    center: true,
    responsive: {
      0: {
        items:1,
        nav:false,
        dots:true,
        },
      500: {
        items: 2,
        nav:false,
        dots:true,
       },   
      960: {
          items: 3
      },
      1030: {
          items: 5
      }
    }     
  }
  
  loginStatus:boolean=false;

  public showSuccess(msg: any): void {
    this.toastrService.success(msg);
  }
 
  public showError(msg: any): void {
    this.toastrService.error(msg);
  }

  constructor(
public router: Router,
private arouter : ActivatedRoute,
    private toastrService: ToastrService,

  )
  { 
 this.Math=Math;
    this.userId = JSON.parse(localStorage.getItem("BulkiTradeUserData"))._id;

      if(this.userId)
      {
      Notiflix.Loading.standard();
      this.getOrderById(); 
      } 
  }
   funTotalAmt()
   {
    console.log("funTotalAmt==========>");
    console.log(this.orderSummaryData[this.index].orderTotalAmount)
    return this.orderSummaryData[this.index].orderTotalAmount;
   }


  getOrderById(){
    this.orderId = this.arouter.snapshot.params['selectedData'];
    this.userId = JSON.parse(localStorage.getItem("BulkiTradeUserData"))._id;
    Axios.get(AppUrls._baseUrl + actionUrl._getUpCommingOrderByUserId+this.userId)
    .then(response => { 
      console.log(this.userId)
      if (response.data.code == 200 && response.data.type == 'success') {
        Notiflix.Loading.remove()
        this.orderSummaryData = response.data.data;
        console.log(this.orderSummaryData[this.index].orderTotalAmount)
        this.funTotalAmt();
      }
      else
      {
        
        this.orderStatus = false;
        console.log(this.orderStatus);
        Notiflix.Loading.remove()
      }
       })
    .catch(function (error) {
      Notiflix.Loading.remove()
      console.log(error)
    })
  }


  

  getOrdersByFilterData()
  {
      Axios.get(AppUrls._baseUrl + actionUrl._getOrderByFilterStatus,{
        params: {
          role:"Admin",
          searchKey : this.searchKey,
          orderStatus  : String(this.orderStatus),

        }})
      .then(response => { 
        if (response.data.code == 200 && response.data.type == 'success') {
           this.ordersData  = response.data.data;
          console.log(this.ordersData );
          console.log(response.data);
        }
         })
      .catch(function (error) {
        console.log(error)
      })
  }

  getProductQuantity(data,index)
  {
    console.log(this.orderSummaryData[this.index].product[index],index);
    
  }


  getOrderAmount()
   {
     return Number(this.orderSummaryData[this.index].orderTotalAmount) - Number(this.orderSummaryData[this.index].shippingAmount || 0) - Number(this.orderSummaryData[this.index].dutiesAmount || 0) - Number(this.orderSummaryData[this.index].taxAmount || 0)
    }

   getSubTotal1()
   {
     return this.getOrderAmount() + Number(this.orderSummaryData[this.index].shippingAmount || 0);
   }

   getSubTotal2()
   {
     return this.getOrderAmount() + Number(this.orderSummaryData[this.index].shippingAmount || 0) + Number(this.orderSummaryData[this.index].dutiesAmount || 0);
   }

   ngOnInit(): void {
    Axios.get(AppUrls._baseUrl + actionUrl._getUpCommingOrderByUserId + this.userId)
      .then(response => {
        console.log(this.userId);
        if (response.data.code === 200 && response.data.type === 'success') {
          Notiflix.Loading.remove();
          this.orderSummaryData = response.data.data;
          console.log(this.orderSummaryData)
        }
        if (!!localStorage.getItem("BulkiTradeToken")) {
          this.loginStatus = true;
        }
        this.orderId = this.arouter.snapshot.params['selectedData'];
        var i = 0;
        for(i=0; this.orderSummaryData[i];i++){
          if(this.orderSummaryData[i].orderId == this.orderId)
            this.index = i;
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }


  productData(data)
  {
    console.log(data)
    this.router.navigate(['/productdescription'],{queryParams: {brandid : data?.brandId?._id,productid : data._id}})
  } 

  goToBrandPage(data)
  {
    console.log(data)
    this.router.navigate(['/brand-description'],{queryParams: {brandid : data?.brandId?._id}});
  } 

}