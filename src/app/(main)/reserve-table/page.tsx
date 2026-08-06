import TableReservationForm from '@/src/components/TableReservationForm'
import React from 'react'

const TableReservationPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Header Section */}
      <section className="relative bg-gradient-to-br from-red-950 via-red-900 to-red-950 text-white py-20 px-6 text-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-red-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto pt-8">
          <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-yellow-400/10 rounded-full">
            Reservations
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 mb-3">
            Book a Table
          </h1>
          <p className="text-red-100/80 text-lg max-w-xl mx-auto">
            Secure your dining experience at FoodZen. Choose your details below, and we will prepare the perfect spot for you.
          </p>
        </div>
      </section>

      {/* Form Container (Slight overlap) */}
      <div className="relative max-w-4xl mx-auto px-6 pb-20 -mt-10 z-10">
        <TableReservationForm />
      </div>
    </div>
  )
}

export default TableReservationPage


