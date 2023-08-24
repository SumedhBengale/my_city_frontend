import React, { useState } from 'react';
import { saveResource } from '../api';
import DateRangePicker from '../../../components/DateRangePicker';
import { format } from 'date-fns';

function ResourceEditor({ typeOfResource, resource }) {
  const [newResource, setNewResource] = useState(resource);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    saveResource(typeOfResource, resource._id, newResource).then((data) => {
      console.log(data);
    });
  };


  const renderEditFields = () => {
    const editFields = [];

    for (const key in newResource) {
      if (newResource.hasOwnProperty(key)) {
        const value = newResource[key];
        const inputType = determineInputType(key, value);

        editFields.push(
          <div className='flex flex-col justify-center gap-2' key={key}>
            <label className='text-lg font-bold'>{key}</label>
            {key === 'checkInDate' || key === 'checkOutDate' ? ( // Handle DateRangePicker for checkInDate and checkOutDate
              //format the date to be in the correct format
              <div className='border-2 border-secondary hover:border-primary rounded-md p-2'
                // onClick={() => { if(typeOfResource !== 'review') setShowDatePicker(true);}}
              >
                <div>{value.split('T')[0]}</div>
              </div>
            ) : inputType === 'text' ? (
              <input
                className='border-2 border-primary hover:border-secondary rounded-md p-2'
                type={inputType === 'textarea' ? 'textarea' : 'text'}
                value={value}
                disabled = {key === 'rating' || key === 'review' ? true : false}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            )  : inputType === 'textarea' ? (
              <textarea
                className='border-2 border-primary hover:border-secondary rounded-md p-2'
                type= {inputType === 'textarea' ? 'textarea' : 'text'}
                disabled = {key === 'rating' || key === 'review' ? true : false}
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            ): inputType === 'dropdown' ? (
              <select
                className='border-2 border-primary hover:border-secondary rounded-md p-2'
                value={value}
                onChange={(e) => handleInputChange(key, e.target.value)}
              >
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
              </select>
            ) :
            inputType === 'residence' ? (
              <div className='border-2 border-secondary hover:border-primary rounded-md p-2'>
                <p>Title: {value.title}</p>
                <p>Address: {value.address.full}</p>
                {/* Add more properties as needed */}
              </div> )
            :inputType === 'non-editable' ? (
              <div className='border-2 border-secondary hover:border-primary rounded-md p-2 opacity-20'>{value}</div>
            ) : (
              <div>Unknown Type</div>
            )}
          </div>
        );
      }
    }
    return editFields;
  };

  const handleDateRangeChange = (data) => {
    //Convert to date string
    const checkInDate = format(data.startDate, 'yyyy-MM-dd')
    const checkOutDate = format(data.endDate, 'yyyy-MM-dd')
    console.log("Handling date range change")
    setShowDatePicker(false);
    console.log('Data',data)
    const updatedResource = { ...newResource, checkInDate, checkOutDate };
    setNewResource(updatedResource);
  };

  const handleInputChange = (key, value) => {
    const updatedResource = { ...newResource, [key]: value };
    setNewResource(updatedResource);
  };

  const determineInputType = (key, value) => {
    if (key === '_id' || key === 'userId') {
      return 'non-editable'; // Make the _id and userId fields non-editable
    } else if (key === '__v') {
      return 'non-editable'; // Hide the __v field
    }else if (key === 'rating') {
      return 'text';
    } else if (key === 'review') {
      return 'textarea';
    } else if (key === 'residence' && typeof value === 'object') {
      return 'residence';
    } else if (key === 'type') {
      return 'dropdown'; // Render the type field as a dropdown
    } else if (key === 'checkInDate' || key === 'checkOutDate') {
      return 'date-range-picker'; // Use custom DateRangePicker for these fields
    } else if (typeof newResource[key] === 'string' && newResource[key].length > 100) {
      return 'textarea';
    } else if (typeof newResource[key] === 'string') {
      return 'textarea';
    }
    // Add more conditions to handle different input types

    // Default to text input if the type cannot be determined
    return 'text';
  };



  return (
    <div>
    {showDatePicker && (
      <div className='flex w-full justify-center items-center top-0 h-screen bg-white absolute z-10'>
        <div>
        <DateRangePicker
          initialStartDate={new Date(newResource.checkInDate)}
          initialEndDate={new Date(newResource.checkOutDate)}
          residenceId={newResource.residence._id}
          returnData = {(data) =>
            handleDateRangeChange(data)}
        />
        </div>
      </div>
    )}
    <div className='flex flex-col justify-center gap-5 relative'>
      {typeOfResource ==='review' && <h1 className='text-3xl font-bold text-center'>View {typeOfResource}</h1>}
      <div className='flex flex-col justify-center gap-5'>{renderEditFields()}</div>
      <div className='flex flex-row justify-center gap-5'>
        {typeOfResource !== 'review' && <button
          className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded'
          onClick={handleSave}
        >
          Save
        </button>}
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            window.history.back();
          }}>
          Cancel
        </button>
      </div>
    </div>
    </div>
  );
}

export default ResourceEditor;