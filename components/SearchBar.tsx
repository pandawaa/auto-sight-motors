"use client"

import React, { useState } from "react"
import SearchManufactur from "./SearchManufacturer"

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("")

  const handleSearch = () => {}

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufactur
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
    </form>
  )
}

export default SearchBar
