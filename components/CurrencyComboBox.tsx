"use client";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Currencies, Currency } from "@/lib/currencies";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { Button } from "@/components/ui/button";
import React from "react";
import SkeletonWrapper from "@/components/SkeletonWrapper";
// import { UpdateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { useMediaQuery } from "@/hooks/use-media-query";

export function CurrencyComboBox() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedOption, setSelectedOption] = React.useState<Currency | null>(
        null
    );


    if (isDesktop) {
        return (
            <SkeletonWrapper isLoading={false}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            disabled={false}
                        >
                            {selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <OptionList setOpen={setOpen} setSelectedOption={setSelectedOption} />
                    </PopoverContent>
                </Popover>
            </SkeletonWrapper>
        );
    }
    return (
        <SkeletonWrapper isLoading={true}>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                        disabled={true}
                    >
                        {selectedOption ? <>{selectedOption.label}</> : <>Set currency</>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <OptionList setOpen={setOpen}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </SkeletonWrapper>
    );
}

function OptionList({
    setOpen,
    setSelectedOption,
}: {
    setOpen: (open: boolean) => void;
    setSelectedOption: (status: Currency | null) => void;
}) {
    return (
        <Command className="overflow-y-hidden">
            <CommandInput placeholder="Filter currency..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {Currencies.map((currency: Currency) => (
                        <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={(value) => {
                                setSelectedOption(
                                    Currencies.find((priority) => priority.value === value) ||
                                    null
                                );
                                setOpen(false);
                            }}
                        >
                            {currency.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
