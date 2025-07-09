import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schemas/invoice.schema';
import { Query } from './schemas/query.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {

    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        @InjectModel(Query.name) private queryModel: Model<Query>,
    ) { }

    async getSummary() {
        // 1. Query: Group by status
        const queryStatusCountsRaw = await this.queryModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Convert to { Open: 10, Closed: 5, InProgress: 3 }
        const queryStatusCounts = queryStatusCountsRaw.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {} as Record<string, number>);

        // 2. Invoice: Group by month and year, sum total
        const invoiceTotalsByMonthRaw = await this.invoiceModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                    },
                    total: { $sum: '$total' },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $concat: [
                            { $toString: '$_id.year' },
                            '-',
                            {
                                $cond: {
                                    if: { $lt: ['$_id.month', 10] },
                                    then: { $concat: ['0', { $toString: '$_id.month' }] },
                                    else: { $toString: '$_id.month' },
                                },
                            },
                        ],
                    },
                    total: 1,
                },
            },
            { $sort: { date: 1 } },
        ]);

        // Convert to { "2024-06": 1200, "2024-07": 5500 }
        const invoiceTotalsByMonth = invoiceTotalsByMonthRaw.reduce((acc, curr) => {
            acc[curr.date] = curr.total;
            return acc;
        }, {} as Record<string, number>);

        return {
            queryStatusCounts,
            invoiceTotalsByMonth,
        };
    }

}
