'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment';
import BookIcon from '@mui/icons-material/Book';
import { IconButton } from '@mui/material';
import { Dashboard } from '@mui/icons-material';
const Sidebar = () => {

  
    return (
        <div className='flex fixed bg-gray-900'>
            <div className='relative top-4 left-0 w-16 m-0 h-screen bg-gray-900 text-white flex flex-col'>
            <Link href='/dashboard' legacyBehavior>
            <a>
                    <SidebarIcon className='' icon={
                        <IconButton>
                            <AssessmentIcon />
                        </IconButton>
                    }
                    text='Dashboard'
                    />
                    </a>
            </Link>
            <Link href='/reporting' legacyBehavior>
            <a>
                    <SidebarIcon className='' icon={
                        <IconButton>
                            <BookIcon />
                        </IconButton>
                    }
                    text='Dashboard'
                    />
                    </a>
            </Link>

            </div>

        </div>
    );
  };

const SidebarIcon = ({ text, icon}) => (
    <div className='relative cursor-pointer flex items-center justify-center p-2 h-12 w-12 mb-4 mt-2 mx-auto shadow-kg bg-gray-500 text-gray-500 hover:bg-green-500 hover:text-white rounded-3xl hover:rounded-xl transition-all duration-500 ease-linear'>
        {icon}
        <span className='absolute p-2 m-2 w-auto min-w-max rounded-md left-14 shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 origin-left scale-0 group-hover:scale-100'>
            {text}
        </span>
    </div>
)

export default Sidebar; 