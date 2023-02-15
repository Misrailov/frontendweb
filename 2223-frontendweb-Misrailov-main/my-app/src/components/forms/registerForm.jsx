import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {Navigate} from 'react-router-dom';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


export default memo(function PersonForm({onSavePerson}){
    const yupValidation = Yup.object().shape({
        firstName: Yup.string()
          .required('Please enter some value.')
          .min(3, ' minimum 3 characters'),
          lastName: Yup.string().required('Please enter some value.').min(3, ' minimum 3 characters'),
          userName: Yup.string().optional('description is optional').min(5,"minimum 5 characters"),
      })
      const formOptions = { resolver: yupResolver(yupValidation) }

    const {register, handleSubmit, reset,formState} = useForm(formOptions);
    const {errors} = formState
    const onSubmit = (data) => {
        const {firstName,lastName,userName} = data;
        onSavePerson({firstName,lastName,userName});
        reset();
        window.location.reload()
        return <Navigate to="/home" />
        

        
};

return (
    <>
        <h2>Add User Information</h2>
          <p>To use This website you have to add some of your information</p>
        <form onSubmit={handleSubmit(onSubmit)} className = "w-100 mb-3 ">
            <div className = "mb-3 ">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                {...register('firstName')}
                defaultValue = ''
                id="firstName"
                type="text"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} 
                placeholder='firstName'
                required
                data-cy="firstNameRegister"
                />
                <div className="invalid-feedback">{errors.firstName?.message}</div>

            </div>
        
            <div className = "mb-3">
                <label htmlFor='lastName' className = "form-label">Last Name</label>
                <input
                {...register('lastName')}
                id="lastName"
                type="text"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} 
                placeholder='lastName'
                data-cy="lastNameRegister"

            />
                <div className="invalid-feedback">{errors.lastName?.message}</div>

            </div>

            <div className = "mb-3">
                <label htmlFor='userName' className = "form-label">userName</label>
                <input
                {...register('userName')}
                id="userName"
                type="text"
                className={`form-control ${errors.userName ? 'is-invalid' : ''}`} 
                placeholder='userName'
                data-cy="userNameRegister"


            />
            <div className="invalid-feedback">{errors.userName?.message}</div>

            </div>
            <div className="clearfix">
                <div className="btn-group float-end">
                <button
                type="submit"
                className="btn btn-primary"
                data-cy="registerSubmit"

                >
                Add User Information
                </button>
            </div>
                    
            </div>
        </form>
    </>
)});