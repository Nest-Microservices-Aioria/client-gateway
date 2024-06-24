import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto, RpcCustomExceptionFilter } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
   
    // solution 1 with obsersables
    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
      .pipe(
        catchError( err => {throw new RpcException(err)})
      );

    // solution 2 with promises
    // try {
      
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id })
    //   );
      
    //   return product;

    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }   

  @Get('')
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' },paginationDto)
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string ) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id })  
      .pipe(
        catchError( err => { throw new RpcException(err)} )
      );
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsClient.send({ cmd: 'update_product' }, { id, ...updateProductDto }) 
      .pipe(
        catchError( err => { throw new RpcException(err)} )
      );
  }
}
