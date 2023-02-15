import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default memo(function BookCollection({onSaveBookCl,bookInfo}){
    const yupValidation = Yup.object().shape({
        collectionTitle: Yup.string()
          .required('Please enter some value.')
          .min(3, ' minimum 3 characters'),
        imgLink: Yup.string().optional('image Link id is optional'),
        description: Yup.string().optional('description is optional'),
      })
      const formOptions = { resolver: yupResolver(yupValidation) }

    const {register, handleSubmit, reset,formState} = useForm(formOptions);
    const {errors} = formState

    const onSubmit = (data) => {
        onSaveBookCl(data);
        reset();
};


return (
    <>
        <h2 data-cy="createBookInfo">Add Book Collection</h2>

        <form onSubmit={handleSubmit(onSubmit)} className = "w-50">
            <div >
                <label htmlFor="collectionTitle" className="form-label">Book Title</label>
                <input
                data-cy="bookCollectionName"
                {...register('collectionTitle')}
                defaultValue = ''
                id="collectionTitle"
                type="text"
                className={`form-control ${errors.collectionTitle ? 'is-invalid' : ''}`} 
                placeholder='collectionTitle'
                required
                />
                <div className="invalid-feedback">{errors.collectionTitle?.message}</div>
            </div>
          
            <div className = "mb-3">
                <label htmlFor="imgLink" className="form-label">image Link</label>
                <input
                data-cy="bookCollectionImgLink"
                {...register('imgLink')}
                defaultValue = ''
                id="imgLink"
                type="text"
                className={`form-control ${errors.imgLink ? 'is-invalid' : 'Longer'}`} 
                placeholder='imgLink'
                />
                <div className="invalid-feedback"> {errors.imgLink?.message} </div>
            </div>
           
            <div className = "mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                data-cy="bookCollectionDescription"
                {...register('description')}
                defaultValue = ''
                id="description"
                type="text"
                className={`form-control ${errors.description ? 'is-invalid' : 'sadasd'}`} 
                placeholder='description'
                />
             <div className="invalid-feedback">{errors.description?.message}</div>
            </div>
           
            <div className="clearfix">
                <div className="btn-group float-end">
                <button
                data-cy="bookCollectionSubmit"
                type="submit"
                className="btn btn-primary"
                >
                Add Book Collection
                </button>
            </div>
            </div>
        </form>
    </>
)});

