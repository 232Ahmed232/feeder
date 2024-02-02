import React, {  useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import list from '../data'
import vid from './don.mp4'
import { app } from '../../firebase';
import { getAuth,  onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc,  } from "firebase/firestore"


const auth = getAuth(app)
const firestore = getFirestore(app)

function Template() {

    const { food } = useParams()
    const [validph,setvalid] =useState("")
    const [link,setlink] =useState("")


    const [phone, setph] = useState("")
    const [name, setname] = useState("")
    const [gender, setgender] = useState("")
    const [year, setyear] = useState("")
    const [loc, setloc] = useState("")
    const [length, setlength] = useState("2")

    const [mail, setmail] = useState("")


    const getdocu = async (em) => {
        const coll = collection(firestore, "users")
        const q = query(coll, where("email", "==", em))
        const snap = await getDocs(q)

        snap.forEach((ele) => {
            setmail(ele.data().email)
        }
        )
    }



    const [user, setuse] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setuse(user)
                getdocu(user.email)


            } else {
                console.log("You are Loggout");
                setuse(null)
            }
        });

    }, [])

   
    useEffect(()=>{
        const phoneNumberPattern = /^03\d{9}$/;
        if (!phone.match(phoneNumberPattern)) {
            setvalid("Wrong Phone#")
        }else{
            setvalid(" ")
        }

    },[phone])


    var handel = async () => {
        // console.log(food);
        // console.log(name);

        // console.log(email);
        // console.log(gender);
        // console.log(length);
        // console.log(year);
        const timestamp = new Date().getTime();

        // Generate a random 4-digit number
        const random = Math.floor(1000 + Math.random() * 9000);
    
        // Combine timestamp and random number to create unique ID
        const uniqueId = `${timestamp}-${random}`;

        if ((name.length>0)&&(validph===" ")&&(loc.length>0)&&(gender.length>0)&&(year.length>0)) {
            
        
        const re = await addDoc(collection(firestore, "Food"), {
            id:uniqueId,
            Sender: mail,
            name: name,
            phone,
            gender,
            LastCheckFood: year,
            food: food,
            Location: loc,
            Weight: length

        })
        console.log(re);
        setlink("/home")

    }
    }

    return (
        <div>
            <div className="video w-1/2 text-center mx-auto">
                <video width="520" height="140"
                    autoPlay loop muted src={vid}
                    className='relative mx-auto'
                />


                <h1 className='lg:text-2xl text-xs bottom-20  text-slate-100 relative lg:bottom-32 py-2 font-semibold hover:bg-black '>Donate to make World better Place</h1>
            </div>
            {list.map((e) => {
                if (food === e.name) {
                    return (

                        <div key={e.id}
                            className={`  bg-cover text-center pt-12`}
                            style={{ backgroundImage: `url('${e.img}')` }}
                        ><h1 className='font-bold text-3xl w-1/6 rounded-2xl mx-auto py-2 lg:bg-black text-slate-100 italic'>{e.name}</h1>

                            <div className='shadow-xl  flex flex-col bg-red-500  bg-opacity-15 lg:w-1/2  rounded-lg  mx-5 lg:mx-auto my-4 py-1 px-1'>

                                <input type="text"
                                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                                    placeholder='Food Name'
                                    value={name}
                                    onChange={(e) => { setname(e.target.value) }}
                                />
                                <input type="number"
                                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                                    placeholder='Avalaible Phone'
                                    value={phone}
                                    onChange={(e) => { setph(e.target.value) }}
                                />
                                <h1 className='bg-white text-red-600 w-32 mx-auto font-serif' >{validph}</h1>
                                <input type="text"
                                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                                    placeholder='Location From Where To Pick Food '
                                    value={loc}
                                    onChange={(e) => { setloc(e.target.value) }}
                                />

                                <div className="gender w-3/4 text-left mx-auto">
                                    <legend className='lg:text-xl font-bold text-white'>Your Gender:</legend>
                                    <input type="radio"
                                        name="gender" id=""
                                        className='ml-5'
                                        onClick={() => { setgender("Male") }}
                                    />
                                    <label htmlFor="" className='text-white italic'>  Male</label>
                                    <br />
                                    <input
                                        type="radio"
                                        name="gender" id=""
                                        className='ml-5'
                                        onClick={() => { setgender("Female") }}
                                    />
                                    <label htmlFor="" className='text-white italic'>  Female</label>
                                </div>
                                <div className='w-3/4 text-left mx-auto my-4'>
                                    <label className='lg:text-xl font-bold text-white'>Date in which you first taste "{food}":</label>
                                    <input type="date" id="birthday" name="birthday"
                                        className='ml-2'
                                        value={year}
                                        onChange={(e) => { setyear(e.target.value) }}

                                    />
                                    <input
                                        type="range"
                                        min={1}
                                        max={100}
                                        value={length}
                                        className='cursor-pointer'
                                        onChange={(e) => { setlength(e.target.value) }}
                                    />
                                    <label className='text-xl text-white font-semibold italic'> Kg: {length}</label>
                                </div>
                            </div>
                            <button onClick={handel} className='bg-blue-400 bg-opacity-20 hover:bg-black w-20 mx-15 p-2 text-white rounded-lg font-semibold'>
                                <Link to={link}>
                                    Submit
                                </Link>
                            </button>


                        </div>
                    )
                }

            })}
        </div>
    );
}

export default Template;