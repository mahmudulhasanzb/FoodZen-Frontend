'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextArea,
  TextField,
} from '@heroui/react'
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Users, 
  MessageSquare, 
  Timer, 
  Check,
  ChevronDown,
  UtensilsCrossed 
} from 'lucide-react'
import toast from 'react-hot-toast'


interface ReservationFormValues {
  name: string
  phone: string
  date: string
  time: string
  duration: string
  guests: string
  message: string
}

const TableReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    defaultValues: {
      name: '',
      phone: '',
      date: '',
      time: '',
      duration: '2',
      guests: '2',
      message: '',
    }
  })

  const onSubmit = async (data: ReservationFormValues) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    toast.success('Table reserved successfully!')
    reset()
  }

  // Get today's date in YYYY-MM-DD format to set minimum date
  const todayDate = new Date().toISOString().split('T')[0]

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-1 shadow-2xl border border-red-100/5">
      <div className="flex items-center justify-center rounded-3xl bg-surface p-4 md:p-8">
        <Surface className="w-full">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-xl">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <Fieldset.Legend className="text-xl font-extrabold text-red-950 dark:text-white leading-tight">Reserve a Table</Fieldset.Legend>
                  <Description className="text-xs text-zinc-550 dark:text-zinc-400">Book your table in advance for the best experience.</Description>
                </div>
              </div>
              
              <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full pt-4">
                {/* Name */}
                <TextField
                  isRequired
                  isInvalid={!!errors.name}
                  name="name"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    Full Name
                  </Label>
                  <Input 
                    placeholder="John Doe" 
                    variant="primary"
                    className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200"
                    {...register('name', { 
                      required: 'Name is required', 
                      minLength: { value: 3, message: 'Name must be at least 3 characters' } 
                    })} 
                  />
                  {errors.name && <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1">{errors.name.message}</FieldError>}
                </TextField>

                {/* Phone */}
                <TextField
                  isRequired
                  isInvalid={!!errors.phone}
                  name="phone"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    Phone Number
                  </Label>
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    variant="primary"
                    className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-455 transition-all duration-200"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      minLength: { value: 6, message: 'Phone number is too short' }
                    })} 
                  />
                  {errors.phone && <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1">{errors.phone.message}</FieldError>}
                </TextField>

                {/* Date */}
                <TextField
                  isRequired
                  isInvalid={!!errors.date}
                  name="date"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    Reservation Date
                  </Label>
                  <Input 
                    type="date" 
                    min={todayDate}
                    variant="primary"
                    className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200 cursor-pointer"
                    {...register('date', { required: 'Date is required' })} 
                  />
                  {errors.date && <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1">{errors.date.message}</FieldError>}
                </TextField>

                {/* Time */}
                <TextField
                  isRequired
                  isInvalid={!!errors.time}
                  name="time"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    Reservation Time
                  </Label>
                  <div className="relative">
                    <select
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 cursor-pointer appearance-none text-zinc-900 dark:text-white"
                      {...register('time', { required: 'Time is required' })}
                    >
                      <option value="">Select a time slot</option>
                      <option value="12:00 PM">12:00 PM (Lunch)</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="5:00 PM">5:00 PM (Dinner)</option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.time && <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1">{errors.time.message}</FieldError>}
                </TextField>

                {/* Guest quantity */}
                <TextField
                  isRequired
                  isInvalid={!!errors.guests}
                  name="guests"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />
                    Guest Quantity
                  </Label>
                  <div className="relative">
                    <select
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 cursor-pointer appearance-none text-zinc-900 dark:text-white"
                      {...register('guests', { required: 'Please select guest count' })}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5 People</option>
                      <option value="6">6 People</option>
                      <option value="7">7 People</option>
                      <option value="8">8+ People (Group Booking)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.guests && <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1">{errors.guests.message}</FieldError>}
                </TextField>

                {/* Preferred duration */}
                <TextField
                  isRequired
                  isInvalid={!!errors.duration}
                  name="duration"
                >
                  <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    <Timer className="w-3.5 h-3.5 text-zinc-400" />
                    Preferred Duration
                  </Label>
                  <div className="relative">
                    <select
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 cursor-pointer appearance-none text-zinc-900 dark:text-white"
                      {...register('duration', { required: 'Please select reservation duration' })}
                    >
                      <option value="1">1 Hour</option>
                      <option value="1.5">1.5 Hours</option>
                      <option value="2">2 Hours (Standard)</option>
                      <option value="2.5">2.5 Hours</option>
                      <option value="3">3 Hours</option>
                      <option value="4">4+ Hours</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.duration && <FieldError className="text-xs text-red-650 dark:text-red-400 mt-1">{errors.duration.message}</FieldError>}
                </TextField>

                {/* Special Request */}
                <div className="col-span-1 md:col-span-2">
                  <TextField name="message" className="w-full">
                    <Label className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                      Special Request Message (Optional)
                    </Label>
                    <TextArea 
                      placeholder="E.g., high chair for kids, window seat, food allergies, celebrating special occasion..." 
                      variant="primary"
                      className="w-full bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-450 transition-all duration-200 resize-none"
                      rows={3}
                      {...register('message')}
                    />
                    <FieldError />
                  </TextField>
                </div>
              </Fieldset.Group>

              <Fieldset.Actions className="flex items-center justify-end gap-4 w-full mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button 
                  type="submit" 
                  isDisabled={isSubmitting}
                  className="flex items-center gap-2 bg-yellow-450 text-red-950 bg-yellow-400 hover:bg-yellow-300 font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-red-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Reserve</span>
                    </>
                  )}
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  )
}

export default TableReservationForm
