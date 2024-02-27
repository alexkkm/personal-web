// react package
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

// firebase package
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'; // now firebase suugest to import the functions directly form the library, instead of import the object Auth() as oldest version of firebase
import { collection, getDocs, doc, setDoc, query, where, Timestamp } from "firebase/firestore"

// the "auth" is used for the functions from package "firebase/auth"
import firebaseTools from "./utils/firebase"


// Component of demonstration of firebase authentication functions
const AuthenticationArea = () => {
    // switch from "login" and "register"
    const [mode, setMode] = useState("login")
    // parameters for saving the input "email" and "password"
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // parameters for saving current user info
    const [currentUser, setCurrentUser] = useState(null)

    // hook "useNavigate()" can only be used in functional componenet, but not in function, so we need to assign it into a constant
    const navigate = useNavigate();

    useEffect(() => {
        // fetch the user info when rendering the page
        onAuthStateChanged(firebaseTools.auth, (info) => { setCurrentUser(info) })
    }, [])

    // Function for "submit" button 
    const onSubmit = () => {
        // if it is in "register" state, then create the account according to "email" and "password"
        if (mode === "register") {
            console.log("Start Register")
            // directly use the function "createUserWithEmailAndPassword()", while getting the "auth" from "firebase.js". So no need run the firebase.js directly when npm run
            createUserWithEmailAndPassword(firebaseTools.auth, email, password)
                .then(() => {
                    // if the "createUserWithEmailAndPassword()" success, navigate to "HomePage"
                    console.log("registered")
                    navigate("/")
                })
                .catch((error) => {
                    // if the "createUserWithEmailAndPassword()" fail, alert the error message
                    alert(error.code);  // "error.code" is provided in the field of "code" when error occurs
                })
        }
        // if it is in "login" state, then try login with the "email" and "password" provided
        else if (mode === "login") {
            console.log("Start Login")
            signInWithEmailAndPassword(firebaseTools.auth, email, password)
                .then(() => {
                    // if the "signInWithEmailAndPassword()" success, navigate to "HomePage"
                    console.log("signined");
                    navigate("/");
                })
                .catch((error) => {
                    // if the "signInWithEmailAndPassword()" fail, alert the error message
                    alert(error.code);
                })
        }
    }

    return (
        <div>
            <h3>Authentication</h3>
            <p>{currentUser ? JSON.stringify(currentUser.uid) : "Havn't login yet"}</p>
            <button onClick={() => setMode("login")}>Select Login</button>
            <button onClick={() => setMode("register")}>Select Register</button>
            <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='please input email'></input>
            <br />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='please input password'></input>
            <br />
            <button
                onClick={
                    () => {
                        onSubmit(); {/** "onClick" must be defined as ()=>{}, or otherwise will be error, since "onSubmit()"" is the output of onSubmit() function while ()=>onSubmit() is to run the "onClick" function directly */ }
                    }}>{mode}</button>
            <button onClick={() => {
                signOut(firebaseTools.auth)
            }}>Sign Out
            </button>
        </div >

    )
}

// Component of demonstration of firebase uploading functions
const UploadArea = () => {
    const [field, setField] = useState("")
    const [value, setValue] = useState("")

    // name the useNavigate() hook as "navigate"
    const navigate = useNavigate();

    // submit the post to the firestore
    const SubmitPost = () => {
        // create a collection refernece for the collection "tutorial"
        const collectionRef = collection(firebaseTools.firestoreDB, "tutorial");
        // create a document refernece for the document within the collection referred by "collectionRef"
        const documentRef = doc(collectionRef);
        // write to the document referred by "documentRef" with the content {title: ...}
        setDoc(documentRef, {
            [field]: value,
            createdAt: Timestamp.now(),
        }).then(() => {
            // raise an alert if successfully submit post
            alert("Already upload the post")
            // navigate to home page
            navigate("/")
        }).catch((err) => { console.log(err) })

    }

    return (
        <div>
            <h3>Uploading data</h3>
            <button onClick={SubmitPost}>Upload</button>
            <p>Content:</p>
            <input value={field} placeholder="field" onChange={(e) => { setField(e.target.value) }} />
            <input value={value} placeholder="value" onChange={(e) => { setValue(e.target.value) }} />
        </div>)
}

// Component of demonstration of firebase fetching functions
const FetchingArea = () => {
    // parameter that save the fetching result from collection "topics"
    const [data, setData] = useState("")

    // useEffect() will be called just after the "FetchingArea" is rendered
    useEffect(() => {
        // getDocs(): fetch the data from the firestore collection "topics", and update the "topic selection dropdown" by the data fetched
        getDocs(collection(firebaseTools.firestoreDB, "topics")).then((collectionSnapShot) => {
            const fetching = collectionSnapShot.docs.map((doc) => {
                return doc.data();
            });
            console.log(fetching);
            setData(fetching)
        });
    }, []);

    return (
        <div>
            <h3>Fetching Data</h3>
            <FetchTutorialDocuments />
            <h4>Fetch from collection "Topics"</h4>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}

const FetchTutorialDocuments = () => {
    // parameter that save the fetching result
    const [result, setResult] = useState({});

    useEffect(() => {
        // create an async function "fetchFromTutorial"
        const fetchFromTutorial = async () => {
            /* 
            excute a query: (Find a collection in firestore called "tutorial", return the documents whose has field "content" in which the value is not empty), 
            then define the result of the query as "querySnapshot"
            */
            const querySnapshot = await getDocs(query(
                collection(firebaseTools.firestoreDB, "tutorial"),
                where("content", "!=", "")
            ));
            // define a list called "newResult"
            const newResult = {};
            // For each element in "querySnapshot", display the element and push it into "newResult"
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                newResult[doc.id] = doc.data();
            });
            // update the "result" with the list "newResult", in which is the documents found in the collection "tutorial"
            setResult(newResult);
        };
        // excute the async function "fectchFromTutorial()"
        fetchFromTutorial();
    }, []);

    return (
        <div>
            <h4>Documents of "tutorial" collection that exists field: "content"</h4>
            {Object.keys(result).map((id) => (
                <div key={id}>id: {id}, content: {JSON.stringify(result[id])}</div>
            ))}
        </div>
    );
};

// Page of tutorials of firebase functions
const FirebasePage = () => {
    return (
        <div>
            <AuthenticationArea />
            <hr />
            <UploadArea />
            <hr />
            <FetchingArea />
            <hr />
        </div>
    );
}

export default FirebasePage