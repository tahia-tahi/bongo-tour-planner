import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const BookingForm = ({ packageName, price, }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tourGuides, setTourGuides] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm();

  // Fetch tour guides on component mount
  useEffect(() => {
    fetch('https://bongo-tour-server.vercel.app/api/guides/random')
      .then((res) => res.json())
      .then((data) => setTourGuides(data))
      .catch((err) => console.error('Failed to load tour guides:', err));
  }, []);

  // Set default values
  useEffect(() => {
    setValue('packageName', packageName);
    setValue('price', price);
    setValue('touristName', user?.displayName || '');
    setValue('touristEmail', user?.email || '');
    setValue('touristImage', user?.photoURL || '');
  }, [packageName, price, user, setValue]);


  const onFormSubmit = async (data) => {
    if (!data.tourDate || !data.selectedGuide) {
      toast.error("Please select a tour date and guide.");
      return;
    }

    const bookingData = {
      ...data,
      bookingTime: new Date().toISOString(),
      tourDate: data.tourDate.toISOString(),
      status: "pending",
    };

    try {
      const res = await fetch('https://bongo-tour-server.vercel.app/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.custom((t) => (
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <p className="text-lg font-semibold mb-2 text-green-600">Booking Created!</p>
            <p className="mb-2">Total Amount: <span className="font-bold">৳{data.price}</span></p>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                toast.dismiss(t.id);
                navigate('/tourist-dashboard/my-bookings');
              }}
            >
              Confirm Booking
            </button>
          </div>
        ), { duration: 10000 }); // toast lasts for 10s or until confirm
      } else {
        toast.error(result.message || 'Booking failed');
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while booking.");
    }
  };




  return (
    <div className="bg-white shadow p-6 rounded-lg border w-full mx-auto">
      <h3 className="text-2xl font-bold mb-4">Book Your Trip</h3>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Package Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Package Name</label>
          <input className="input input-bordered w-full" {...register('packageName')} />
        </div>

        {/* Tourist Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Tourist Name</label>
          <input className="input input-bordered w-full" {...register('touristName')} readOnly />
        </div>

        {/* Tourist Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Tourist Email</label>
          <input className="input input-bordered w-full" {...register('touristEmail')} readOnly />
        </div>

        {/* Tourist Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Tourist Image</label>
          <img
            src={user?.photoURL}
            alt="Tourist"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input type="hidden" {...register('touristImage')} />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Price</label>
          <input type="number" className="input input-bordered w-full" {...register('price')} />
        </div>

        {/* Tour Date (DatePicker + Controller) */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Tour Date</label>
          <Controller
            control={control}
            name="tourDate"
            rules={{ required: 'Tour date is required' }}
            render={({ field }) => (
              <DatePicker
                className="input input-bordered w-full"
                placeholderText="Select tour date"
                minDate={new Date()}
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          {errors.tourDate && <p className="text-error text-sm">{errors.tourDate.message}</p>}
        </div>

        {/* Tour Guide Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Tour Guide</label>
          <select
            {...register('selectedGuide', { required: 'Please select a guide' })}
            className="input input-bordered w-full"
          >
            <option value="">Select a guide</option>
            {tourGuides.map((guide) => (
              <option key={guide._id} value={guide.name}>
                {guide.name}
              </option>
            ))}
          </select>
          {errors.selectedGuide && <p className="text-error text-sm">{errors.selectedGuide.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
