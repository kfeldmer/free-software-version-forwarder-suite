import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StockComponent } from './stock/stock.component';
import { ArticleComponent } from './article/article.component';
import { GoodsComponent } from './goods/goods.component';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    StockComponent,
    ArticleComponent,
    GoodsComponent,
    OrderComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
