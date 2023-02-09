import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockComponent } from './stock/stock.component';
import { ArticleComponent } from './article/article.component';
import { GoodsComponent } from './goods/goods.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  { path: 'stock-grid', component: StockComponent },
  { path: 'article-grid', component: ArticleComponent },
  { path: 'goods-receiving-grid', component: GoodsComponent },
  { path: 'commission-grid', component: OrderComponent },
  { path: '', redirectTo: '/stock-grid', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
