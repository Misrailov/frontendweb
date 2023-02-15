import React, {useState,memo} from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import DropDownPlaylist from '../dropdownComponents/DropDownPlaylist';
import { toast } from 'react-toastify';


export default memo(function BookCLForm({onSaveBook,playlists}){
    const [chosenPlaylist,setChosenPlaylist] = useState(null);
    const yupValidation = Yup.object().shape({
        title: Yup.string()
          .required('Please enter some value.')
          .min(3, ' minimum 3 characters'),
        imgLink: Yup.string().optional('image Link id is optional'),
        subtitle: Yup.string().optional('description is optional'),
        progress: Yup.number().typeError("progress must be a number").moreThan(0,"progress must be higher than 0").integer("progress must be a number").transform((_, val) => (val !== "" ? Number(val) : null)),
      })
      const formOptions = { resolver: yupResolver(yupValidation) }

      const handleChange = ({collectionName,item}) =>{
        setChosenPlaylist(collectionName);

      }
    const {register, handleSubmit, reset,formState} = useForm(formOptions);
    const {errors} = formState

    const onSubmit = (data) => {
        if(chosenPlaylist == null){
            toast("Warning: You have to choose a collection!")
            return;
        }
        if( typeof data.progress != "number" ){
            toast("Warning: Progress must be a number!")
            return;
        }
        onSaveBook(data,chosenPlaylist);
        setChosenPlaylist(null);
        reset();
};

return (
    <>
        <h2>Add Book</h2>

        <form onSubmit={handleSubmit(onSubmit)} className = "w-50">
            <div >
                <label htmlFor="title" className="form-label">Book Title</label>
                <input
                {...register('title')}
                defaultValue = ''
                id="title"
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`} 
                placeholder='title'
                required
                />
                <div className="invalid-feedback">{errors.title?.message}</div>
            </div>
          
            <div className = "mb-3">
                <label htmlFor="imgLink" className="form-label">image Link</label>
                <input
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
                <label htmlFor="subtitle" className="form-label">Description</label>
                <input
                {...register('subtitle')}
                defaultValue = ''
                id="subtitle"
                type="text"
                className={`form-control ${errors.description ? 'is-invalid' : 'sadasd'}`} 
                placeholder='subtitle'
                />
             <div className="invalid-feedback">{errors.subtitle?.message}</div>
            </div>
            <div className = "mb-3">
                <label htmlFor="authors" className="form-label">Authors</label>
                <input
                {...register('authors')}
                defaultValue = ''
                id="authors"
                type="text"
                className={`form-control ${errors.authors ? 'is-invalid' : 'sadasd'}`} 
                placeholder='authors'
                />
             <div className="invalid-feedback">{errors.authors?.message}</div>
            </div>

          
            <div >
                <label htmlFor="review" className="radio">1</label>
                <input
                {...register('review')}
                name = "review"
                value= "1"
                id="review"
                type="radio"
                className="radio m-2"

                         placeholder='review'
                

                
                />
                                <label htmlFor="review" className="radio">2</label>
                <input
                {...register('review')}
                name = "review"
                value= "2"
                id="review"
                type="radio"
                className="radio m-2"


                    placeholder='review'

                
                />
                                <label htmlFor="review"className="radio">3</label>
                <input
                {...register('review')}
                name = "review"
                value= "3"
                id="review"
                type="radio"
                className="radio m-2"


                    placeholder='review'

                
                />
                                <label htmlFor="review" className="radio">4</label>
                <input
                {...register('review')}
                name = "review"
                value= "4"
                id="review"
                type="radio"
                className="radio m-2"                
                placeholder='review'




                
                />
                                <label htmlFor="review" className="radio">5</label>
                <input
                {...register('review')}
                name = "review"
                value= "5"
                id="review"
                type="radio"
                className="radio m-2"
                placeholder='review'



                
                />

            </div>
            <div className = "mb-3">
                <label htmlFor="progress" className="form-label">progress</label>
                <input
                {...register('progress')}
                id="progress"
                type="text"
                className="form-control"
                placeholder='Page Number'

                
                />
                <div className="invalid-feedback">{errors.progress?.message}</div>


            </div>
            <div className = "mb-3">
                <label htmlFor="isFavourite" className="form-label">Favourite?</label>
                <input
                {...register('isFavourite')}
                defaultValue = ''
                id="isFavourite"
                type="checkbox"
                className="button"
                placeholder='Page Number'
                
               

                
                />

            </div>
            <div className = "mb-3">
                <label htmlFor="isRead" className="form-label">Completed?</label>
                <input
                {...register('isRead')}
                defaultValue = ''
                id="isRead"
                type="checkbox"
                className="button"
                placeholder='Read?'

                />

            </div>
            <DropDownPlaylist playlists = {playlists} addBookCL = {handleChange}/>           
            <div className="clearfix">
                <div className="btn-group float-end">
                <button
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

