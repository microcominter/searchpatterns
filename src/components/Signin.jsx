import { SignIn, useAuth, useUser, useSignIn } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import axios from "axios";

const Signin = ({ handleCloseModal }) => {
    const { isLoaded, userId, getToken } = useAuth();
    const { user } = useUser();
    const { signIn, isSignedIn } = useSignIn();
    const [signInError, setSignInError] = useState(null);

    // useEffect(() => {
    //     if (isLoaded && userId) {
    //         sendUserDataToBackend();
    //     }
    // }, [isLoaded, userId]);

    // const handleSignIn = async (signInProps) => {
    //     try {
    //         const result = await signIn.create(signInProps);
    //         if (result.status === "complete") {
    //             console.log("Sign in successful");
    //             await sendUserDataToBackend();
    //             handleCloseModal();
    //         } else {
    //             console.log("Sign in not complete", result);
    //             // Handle incomplete sign in
    //         }
    //     } catch (error) {
    //         console.error("Error during sign in:", error);
    //         setSignInError(error.message);
    //     }
    // };

    // const sendUserDataToBackend = async () => {
    //     if (user && isSignedIn) {
    //         try {
    //             const token = await getToken();
    //             console.log("Token obtained:", token);

    //             const response = await axios.get('http://localhost:5000/api/auth', {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 },
    //                 withCredentials: true
    //             });

    //             console.log('Backend response:', response.data);
    //         } catch (error) {
    //             console.error('Error sending user data to backend:', error);
    //             // ... (rest of your error handling)
    //         }
    //     }
    // };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <SignIn />
            
        </div>
    );
};

export default Signin;