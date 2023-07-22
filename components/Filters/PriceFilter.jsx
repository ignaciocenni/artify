"use client";

import { price } from "../../store/slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function PriceFilter() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    max: Infinity,
    min: -Infinity
  });

  const handlerImput = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setFilters({ ...filters, [property]: value });
  };
  const handleBuscar = () => {
    let min = filters.min;
    let max = filters.max;
    if (min === '' && max === '') {
      max = Infinity
      min = -Infinity
        dispatch(price([min, max]))
    }
    dispatch(price([min, max]));
    setFilters({
      max: Infinity,
      min: -Infinity
    })
  };

  return (
    <div>
      <div className="flex flex-row justify-between relative items-center gap-4">
        <input
          className="p-2 w-24 rounded-xl bg-[var(--primary)]"
          name="min"
          type="number"
          pattern="[0-9]*"
          placeholder="Min."
          value={filters.min}
          onChange={handlerImput}
          min = '0'
        />
        <h1 className="font-thin"> a </h1>
        <input
          className="p-2 w-24 rounded-xl bg-[var(--primary)]"
          name="max"
          type="number"
          pattern="[0-9]*"
          placeholder="Max."
          value={filters.max}
          onChange={handlerImput}
          min = '1'

        />
      </div>
      <div className="flex">
        <button
          className=" mt-4 overflow-hidden hover:bg-[var(--background-sec)] hover:text-black text-white bg-[var(--detail)]  rounded-lg flex content-center items-center shadow-xl text-xs font-bold px-6 h-11"
          onClick={handleBuscar}>
          Aplicar
        </button>
      </div>
    </div>
  );
}
