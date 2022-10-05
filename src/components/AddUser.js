import React from 'react';
import Toast from 'sweetalert2';

function AddUser({
  onAdd,
  onEnter,
  onLeave,
  validateName,
  validateMail,
  invalidName,
  invalidPhone,
  invalidEmail,
}) {
  //event submit and email, phone and name validations
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.phone.value);

    const validName = validateName(e.target.name.value);
    if (!validName) return invalidName();

    if (e.target.phone.value == '') return invalidPhone();

    const validEmail = validateMail(e.target.email.value);
    if (!validEmail) return invalidEmail();

    onAdd(e.target.name.value, e.target.phone.value, e.target.email.value);
    e.target.name.value = '';
    e.target.phone.value = '';
    e.target.email.value = '';

    Toast.fire({
      icon: 'success',
      title: 'Added successfully',
    });
  };

  return (
    <div className='p-8  border-y border-blue-500'>
      <form onSubmit={handleOnSubmit}>
        <h2 className='ml-3 text-blue-500 font-bold'>Add User</h2>
        <input
          placeholder='Name'
          name='name'
          className='border-2 border-blue-500 rounded-xl m-2 p-2'
          type='text'
        />
        <input
          placeholder='Phone'
          name='phone'
          className='border-2 border-blue-500 rounded-xl m-2 p-2'
          type='number'
        />
        <input
          placeholder='Email'
          name='email'
          className='border-2 border-blue-500 rounded-xl m-2 p-2'
        />
        <button
          onSubmit={handleOnSubmit}
          className='bg-blue-500 hover:bg-blue-800 rounded-xl w-28 h-10 m-1 cursor-pointer text-white'
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddUser;
