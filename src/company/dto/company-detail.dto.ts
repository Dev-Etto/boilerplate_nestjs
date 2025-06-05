import { ProductListDto } from 'src/product/dto/product-list.dto';
import { ResponsibleDetailDto } from 'src/responsible/dto/responsible-detail.dto';

export class CompanyDetailDto {
  id: number;
  name: string;
  responsible?: ResponsibleDetailDto;
  products: ProductListDto[];
}
