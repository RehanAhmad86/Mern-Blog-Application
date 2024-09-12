// import { Button } from 'flowbite-react'
// import React from 'react'
// import { AiFillGoogleCircle } from 'react-icons/ai'
// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// import { app } from '../firebaseGoogle'
// import { useDispatch } from 'react-redux'
// import { signInSuccess } from '../redux/User/userSlice'
// import { useNavigate } from 'react-router-dom'

// export default function Auth() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const auth = getAuth(app)
//     const handleGoogle = async () => {
//         const provider = new GoogleAuthProvider()
//         provider.setCustomParameters({ prompt: 'select_account' })
//         try {
//             const GmailData = await signInWithPopup(auth, provider)
//             console.log(GmailData)
//             const result = await fetch('/api/auth/google', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                         name: GmailData.user.displayName,
//                         email: GmailData.user.email,
//                         PhotoUrl: GmailData.user.photoURL
//                     })
//             })
//             if (result.ok) {
//                 const data = await result.json()
//                 dispatch(signInSuccess(data))
//                 navigate('/')
//             }
//         }
//         catch (error) {
//             console.log(error)
//         }

//     }
//     return (
//         <Button type='button' onClick={handleGoogle} gradientDuoTone='redToYellow' outline className='mt-3 w-full text-white disabled:opacity-50'>
//             <AiFillGoogleCircle className='w-6 h-6 mr-2' />
//             Continue with Google
//         </Button>
//     )
// }
import { Button } from 'flowbite-react';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebaseGoogle';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const GmailData = await signInWithPopup(auth, provider);
            console.log(GmailData);

            const result = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: GmailData.user.displayName,
                    email: GmailData.user.email,
                    PhotoUrl: GmailData.user.photoURL,
                }),
            });

            if (result.ok) {
                const data = await result.json(); // Assuming your API returns user data
                dispatch(signInSuccess(data)); // Pass the user data to the Redux action
                navigate('/');
            } else {
                console.error('Failed to authenticate with Google');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button
            type='button'
            onClick={handleGoogle}
            gradientDuoTone='redToYellow'
            outline
            className='mt-3 w-full text-white disabled:opacity-50'
        >
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    );
}
