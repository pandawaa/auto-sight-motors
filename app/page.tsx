"use client"

import { CustomFilter, SearchBar, Hero, CarCard } from "@/components"
import { ShowMore } from "@/components"
import { fuels, yearsOfProduction } from "@/constants"
import { CarState } from "@/types"
import { fetchCars } from "@/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import { PulseLoader } from "react-spinners"

export default function Home() {
  const [allCars, setAllCars] = useState<CarState>([])
  const [loading, setLoading] = useState(false)

  // search states
  const [manufacturer, setManufacturer] = useState("")
  const [model, setModel] = useState("")

  //filter state
  const [fuel, setFuel] = useState("")
  const [year, setYear] = useState(2022)

  // limit state
  const [limit, setLimit] = useState(10)

  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer.toLowerCase() || "",
        model: model.toLowerCase() || "",
        fuel: fuel.toLowerCase() || "",
        year: year || 2022,
        limit: limit || 10,
      })
      setAllCars(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars()
  }, [fuel, year, limit, manufacturer, model])

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter options={yearsOfProduction} setFilter={setFuel} />
          </div>
        </div>
        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard key={`car-${index}`} car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                <PulseLoader color="#2a76ea" />
              </div>
            )}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          !loading && (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          )
        )}
      </div>
    </main>
  )
}
