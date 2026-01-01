'use client'

import React from 'react';

import { useEffect, useState } from "react"
const CategoryCards = () => {

      const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)


  function calculateCategorySummary(assets) {
  const map = {}

  assets.forEach(asset => {
    const category = asset.category
    const status = asset.status

    if (!map[category]) {
      map[category] = {
        category,
        total: 0,
        inUse: 0,
        stock: 0
      }
    }

    map[category].total += 1

    if (status === "In Use") {
      map[category].inUse += 1
    }

    if (status === "In Stock") {
      map[category].stock += 1
    }
  })

  return Object.values(map)
}


  useEffect(() => {
    fetch("/api/products") // returns raw asset list
      .then(res => res.json())
      .then(data => {
        const summary = calculateCategorySummary(data)
        setCards(summary)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map(card => (
        <CategoryCard key={card.category} data={card} />
      ))}
    </div>
    );
};

export default CategoryCards;

function CategoryCard({ data }) {
  return (
    <div className="bg-[#845EC2] rounded-xl shadow-[#50677a] shadow-2xl p-6 text-[#fcf7ff] hover:scale-105 transition-transform duration-300">
      <h2 className="text-lg font-semibold  mb-4 capitalize">
        {data.category}
      </h2>

      <Stat label="Total Assets" value={data.total} />
      <Stat label="In Use" value={data.inUse} />
      <Stat label="In Stock" value={data.stock} />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="flex justify-between text-sm mb-1">
      <span className="text-[#fcf7ff]">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
