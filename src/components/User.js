import React, { useRef } from 'react';
import Swal from 'sweetalert2';

function User({
  id,
  email,
  name,
  phone,
  deleteUser,
  edit,
  updateUsers,

  validateName,
  validateMail,
  invalidName,
  invalidPhone,
  invalidEmail,
}) {
  const inputNameRef = useRef();
  const inputMailRef = useRef();
  const inputPhoneRef = useRef();

  //function for deleting users
  const handleDelete = () => {
    Swal.fire({
      title: 'Do you want to delete the user?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#3b82f6',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        Swal.fire('User deleted');
      } else if (result.isDenied) {
        Swal.fire('User hasn´t been deleted');
      }
    });
  };

  //function for saving changes in users
  const handleSave = () => {
    const validName = validateName(inputNameRef.current.value);
    if (!validName) return invalidName();

    if (inputPhoneRef.current.value == '') return invalidPhone();

    const validEmail = validateMail(inputMailRef.current.value);
    if (!validEmail) return invalidEmail();

    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
      confirmButtonColor: '#3b82f6',
    }).then((result) => {
      if (result.isConfirmed) {
        updateUsers(
          inputNameRef.current.value,
          inputPhoneRef.current.value,
          inputMailRef.current.value,
          id
        );
        Swal.fire('Changes has been saved');
      } else if (result.isDenied) {
        Swal.fire('Changes has not been saved');
      }
    });
  };

  //function for rendering edit mode
  const renderEdit = () => {
    return (
      <div className='flex flex-row justify-center items-center'>
        <input
          type='text'
          defaultValue={name}
          ref={inputNameRef}
          id={id}
          className=' border-blue-500 border-2 rounded-xl m-3 p-3'
        />
        <input
          type='text'
          defaultValue={phone}
          ref={inputPhoneRef}
          id={id}
          className='border-blue-500 border-2 rounded-xl m-3 p-3'
        />
        <input
          type='text'
          defaultValue={email}
          ref={inputMailRef}
          id={id}
          className='border-blue-500 border-2 rounded-xl m-3 p-3'
        />
        <button
          onClick={handleSave}
          className='bg-blue-500 text-white hover:bg-blue-800 rounded-xl w-28 h-10 m-1 cursor-pointer'
        >
          Save
        </button>
      </div>
    );
  };

  //function for rendering users list mode
  const renderUser = () => {
    return (
      <div className=' border-2 border-blue-500 w-96 h-52 m-8 p-8'>
        <div className='flex flex-row justify-between items-center mb-12'>
          <h2>{name}</h2>
          <button
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-800 rounded-xl w-28 h-10 m-1 cursor-pointer text-white'
          >
            Delete
          </button>
        </div>
        <h3>phone: {phone}</h3>
        <h3>email: {email}</h3>
      </div>
    );
  };

  return <div>{edit ? renderEdit() : renderUser()}</div>;
}

export default User;
