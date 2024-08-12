import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Product, ProductImage } from './entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule], // En el array se pasan las entidades que se van a utilizar en este módulo.
  exports: [ProductsService, TypeOrmModule], // Se exporta el servicio y el módulo de TypeOrm.
})
export class ProductsModule {}
