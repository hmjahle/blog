import React, {useState, useReducer} from 'react';
import createDataContext from './createDataContext';
import apiServer from '../api/apiServer';


const blogReducer = (state, action) => {

    switch (action.type) {
        case 'get_blogposts': 
            return action.payload;
            // Her antar vi att payload inneholder all informasjonen vi har i appen vår
            // Derfor vi ikke har [...state,  action.payload ]
        case 'edit_blogpost':
            return state.map((blogpost)=> {
                return blogpost.id === action.payload.id ? action.payload : blogpost;
            });
        case 'delete_blogpost':
            return state.filter((blogpost) => blogpost.id !== action.payload);
        default:
            return state;
    }

};

const getBlogPosts = dispatch => {
    return async () => {
       const response = await apiServer.get('/blogposts/');
       // response.data === [{},{},{}]
       console.log(response.status)
       dispatch({type: 'get_blogposts', payload: response.data});
       // Reducer is called when dispatch is called
    };
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        const response = await apiServer.post('/blogposts/', {
                title: title,
                content: content
        });
        if (callback) {
            callback();
        }
    };
};

const deleteBlogPost = (dispatch) => {
    return async id => {
        const response =await apiServer.delete(`/blogposts/${id}/`);
        dispatch({type: 'delete_blogpost', payload: id});
    }
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        const response = await apiServer.put(`/blogposts/${id}/`, {
            title,
            content
        });
        dispatch({
            type: 'edit_blogpost',
            payload: {id, title, content}
        });
        if (callback) {
            callback();
        }
    };
};

export const {Context, Provider } = createDataContext(
    blogReducer, 
    {
        addBlogPost,
        deleteBlogPost,
        editBlogPost,
        getBlogPosts
    }, 
    []
);

