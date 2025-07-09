import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';
import { Query, QuerySchema } from './schemas/query.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Invoice.name, schema: InvoiceSchema},
      {name: Query.name, schema: QuerySchema}
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
