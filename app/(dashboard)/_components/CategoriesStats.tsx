"use client"

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import React, { useMemo } from 'react'

import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { TransactionType } from '@/lib/types';
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

interface Props {
    from: Date;
    to: Date;
    userSettings: UserSettings;
}

const CategoriesStats = ({
    from,
    to,
    userSettings

}: Props) => {






    return (
        <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
            {/* <SkeletonWrapper isLoading={statsQuery.isFetching}> */}
            <CategoriesCard

                type="income"
                // data={statsQuery.data || []}
            />
            {/* </SkeletonWrapper> */}
            {/* <SkeletonWrapper isLoading={statsQuery.isFetching}> */}
            <CategoriesCard

                type="expense"
                // data={statsQuery.data || []}
            />
            {/* </SkeletonWrapper> */}
        </div>
    )
}




export default CategoriesStats


function CategoriesCard({
    data,
    type,

}: {
    type: TransactionType;

    data: GetCategoriesStatsResponseType;
}) {
    // filtered data
    const filteredData = data.filter((el) => el.type === type);
    // total amount
    const total = filteredData.reduce(
        (acc, el) => acc + (el._sum?.amount || 0),
        0
    );

    return (
        <Card className="h-80 w-full col-span-6">
            <CardHeader>
                <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
                    {type === "income" ? "Incomes" : "Expenses"} by category
                </CardTitle>
            </CardHeader>

            <div className="flex items-center justify-between gap-2">
                {filteredData.length === 0 && (
                    <div className="flex h-60 w-full flex-col items-center justify-center">
                        No data for the selected period
                        <p className="text-sm text-muted-foreground">
                            Try selecting a different period or try adding new{" "}
                            {type === "income" ? "incomes" : "expenses"}
                        </p>
                    </div>
                )}

                {filteredData.length > 0 && (
                    <ScrollArea className="h-60 w-full px-4">
                        <div className="flex w-full flex-col gap-4 p-4">
                            {filteredData.map((item) => {
                                const amount = item._sum.amount || 0;
                                const percentage = (amount * 100) / (total || amount);

                                return (
                                    <div key={item.category} className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center text-gray-400">
                                                {item.categoryIcon} {item.category}
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    ({percentage.toFixed(0)}%)
                                                </span>
                                            </span>


                                        </div>

                                        <Progress
                                            value={percentage}
                                            indicator={
                                                type === "income" ? "bg-emerald-500" : "bg-red-500"
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                )}
            </div>
        </Card>
    );
}
