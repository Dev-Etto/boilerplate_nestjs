import { PrismaClient } from '@prisma/client';
import { CreateCompanyDto } from '../src/company/dto/create-company.dto';
import { CreateResponsibleDto } from '../src/responsible/dto/create-responsible.dto';
import { CreateProductDto } from '../src/product/dto/create-product.dto';

const prisma = new PrismaClient();

async function main() {
  const companies: { id: number; name: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    const companyDto: CreateCompanyDto = { name: `Empresa ${i}` };
    const company = await prisma.company.create({ data: companyDto });
    companies.push({ id: company.id, name: company.name });
  }

  const responsibles: { id: number; name: string }[] = [];
  for (let i = 1; i <= 30; i++) {
    const responsibleDto: CreateResponsibleDto = {
      name: `Responsável ${i}`,
      phone: `119999900${i.toString().padStart(2, '0')}`,
      email: `responsavel${i}@email.com`,
      cpf: `${i.toString().padStart(11, '0')}`,
      companyId: companies[(i - 1) % companies.length].id,
    };
    const responsible = await prisma.responsible.create({
      data: responsibleDto,
    });
    responsibles.push({ id: responsible.id, name: responsible.name });
  }

  for (let i = 1; i <= 30; i++) {
    const productDto: CreateProductDto = {
      name: `Produto ${i}`,
      price: 10 + i,
      companyId: companies[(i - 1) % companies.length].id,
    };
    await prisma.product.create({ data: productDto });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
