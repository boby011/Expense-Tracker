import React from 'react';


import { Link, Outlet , useNavigate   } from 'react-router-dom';

const Nav = () => {
    const nav = useNavigate();
    const user = localStorage.getItem ('token');

    const handleLogout = () => {

        localStorage.clear();

        nav(`/login`);
    };

    return (
        <>
            <div className='bg-purple-800   p-4'>
                <div className='flex  justify- between items- center' >
                    <h2 className='text-white   text -2 xl        font-bold'>Expense Tracker</h2>
                    <div className='flex space-x-4 mt-2 ml-auto'>
                        {/* <Link to='/About'>About</Link> */}
                        {user ? (
                            <>
                                <Link to='/userprofile' className='text-white   hover:text-blue-  200'>Profile</Link>

                                <Link to='/expenseentry' className='text-white hover :text-blue-200 '>Expense & Income Entry</Link>
                                <Link to='/expensechart' className='text-white hover :text-blue-200 '>Your Chart</Link>
                                <button className="text - white hover :text-bl ue-200" onClick={handleLogout} >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to='/login' className='text-white hover:text-blue-200'>Login</Link>

                                <Link to='/Sigin' className='text-white hover:text-blue-200'>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}; export default Nav;
