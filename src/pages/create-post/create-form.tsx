import {useForm} from "react-hook-form";
import * as yup from "yup";
import  {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from 'firebase/firestore'; //addDoc: add a document to collection , collection: fct to specify which collection we want to add our doc to
import {auth, db} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';

interface CreateFormData { // interface for typescript to know types of vars
    title: string,
    description: string;
}

export const CreateForm = () => {
    const [user] = useAuthState(auth); // user helps grab the usernames name and info from google acc
    const navigate = useNavigate();

    // form validation : 
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description."),  
    });

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db, "posts"); // reff to our collection posts

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef,{
            //title: data.title,
            //description: data.description, 
            //we can do a better solution here, ...data means every data that the user inputs
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate('/'); // redirects us to main page when we log in
    }

    return(
    <div>
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input placeholder="Title..." {...register("title")}/>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")}/>
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <input type="submit" className="submitForm"/>
        </form>
    </div>
    );
};