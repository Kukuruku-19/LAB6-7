import CollapsibleList from "./CollapsibleList";
import { useState } from "react";
import useCities from "../hooks/useCategory";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "react-router-dom";
import FilterToggle from "./FilterToggle";

export default function CitiesFilter() {
    const [search, setSearch] = useSearchParams();

    const filteredCategory =
        search.getAll("category").map((elem) => parseInt(elem)) ?? [];

    const [category, setCategory] = useState(filteredCategory);

    const getCities = useCities();

    const citiesData = getCities.data ?? [];

    const onCityChange = (city) => (checked) => {
        let _city = category.slice();

        if (checked) {
            _city.push(city);
        } else {
            _city = _city.filter((_city) => _city !== city);
        }

        setCategory(_city);
    };

    const hasFilters = filteredCategory.length > 0;

    return (
        <CollapsibleList
            defaultVisible={true}
            title="Фільтр"
            actionButton={
                <FilterToggle
                    visible={category.length > 0}
                    active={hasFilters}
                    onApply={() => {
                        category.forEach((elem) => {
                            search.append("category", elem);
                        });
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                    onClear={() => {
                        search.delete("category");
                        setCategory([]);
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                />
            }
        >
            {citiesData
                .filter((f) => {
                    if (filteredCategory.length === 0) {
                        return true;
                    }
                    return filteredCategory.includes(f.id);
                })
                .map((field, key) => (
                    <li key={key} className="pv2">
                        <div className="flex items-center">
                            <Checkbox.Root
                                id={field.id}
                                name={field.name}
                                disabled={hasFilters}
                                onCheckedChange={onCityChange(field.id)}
                                checked={category.includes(field.id)}
                                className="checkbox lh-solid flex items-center justify-center pa0 bg-white w125 h125 br2 bn"
                            >
                                <Checkbox.Indicator>
                                    <CheckIcon className="checkbox__icon w125 h125" />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label htmlFor={field.name} className="ml3 fw5 f5">
                                {field.name}
                            </label>
                        </div>
                    </li>
                ))}
        </CollapsibleList>
    );
}
