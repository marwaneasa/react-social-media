import { useAuthState } from 'react-firebase-hooks/auth';
import {Post as IPost} from './main';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface Props{ // everytime we wanna define props we use an interface
    post: IPost;
}
interface Like {
    userId: string;
}

export const Post = (props: Props ) => {
    const {post} = props;
    const [user] = useAuthState(auth); // user helps grab the usernames name and info from google acc

    const [like, setLike] = useState<Like[] | null>(null); //<number | null> the state is a number and can be null if data hasnt arrived yet

    const likesRef = collection(db, 'likes');

    const likesDoc = query(likesRef, where("postId", "==", post.id)); //likes linked to one document | "postId", "==", post.id : first postId is the field from the collection, == is the operator for the where, post.id is the id from our current post in the fct 
    
    const addLike = async () => {
        await addDoc(likesRef, {userId: user?.uid,postId: post.id })
    }

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLike(data.docs.map((doc) => ({ userId: doc.data().userId })));
    };

    useEffect(() => {
         getLikes();
    }, []);



    return (
          <div>
                <div className="title">
                    <h1>{post.title}</h1>
                </div>
                <div className="body">
       <p>{post.description}</p>
                </div>
                <div className="footer">
                    <p>@{post.username}</p>
                    <button onClick={addLike}> &#128077; </button>
                    {like && <p>Likes: {like.length}</p>}
                </div>
          </div>             
          
          )
}