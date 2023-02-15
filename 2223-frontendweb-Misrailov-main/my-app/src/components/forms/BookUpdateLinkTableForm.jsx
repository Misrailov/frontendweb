import React, {memo} from 'react';
import {useForm} from 'react-hook-form';

export default memo(function BookLinkTableForm({onSaveBook,bookInfo}){
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
        onSaveBook(data);        
};

return (
    <>
        <h2>Add Book Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} >
            <div >
                <label htmlFor="review" className="radio">1</label>
                <input
                {...register('review')}
                name = "review"
                value= "1"
                id="review"
                type="radio"
                className="radio m-2"
                defaultChecked = {bookInfo.review === 1}

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
                defaultChecked = {bookInfo.review === 2}


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
                defaultChecked = {bookInfo.review === 3}


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
                defaultChecked = {bookInfo.review === 4}




                
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
                defaultChecked = {bookInfo.review === 5}



                
                />

            </div>
            <div className = "mb-3">
                <label htmlFor="progress" className="form-label">progress</label>
                <input
                {...register('progress')}
                defaultValue = {bookInfo.progress}
                id="progress"
                type="text"
                className="form-control"
                placeholder='Page Number'

                
                />

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
                defaultChecked ={bookInfo.isFavorite}
               

                
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
                defaultChecked ={bookInfo.isRead}

                />

            </div>
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