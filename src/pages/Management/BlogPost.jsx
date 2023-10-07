import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import config from '../../config/config.js'
import { marked } from 'marked'
import Footer from '../HomePage/Footer'

function BlogPost() {
    const location = useLocation();
    const [blog, setBlog] = useState(null)
    const [markdown, setMarkdown] = useState(null)
    useEffect(() => {
        console.log(location.state.blog)
        setBlog(location.state.blog)
        const parsedMarkdown = marked(location.state.blog.attributes.content,{
            gfm: true,
            breaks: true,

        })
        setMarkdown(parsedMarkdown)

    }, [location.state])
  return (
    <>
        <div className="hidden md:block z-30 fixed w-full">
        {
          <DesktopNavbarBlack />
        }
        </div>

        <div className="md:hidden z-30 fixed w-full">
          {
            <NavbarBlack />
          }
        </div>
        <div className="fixed top-20 left-10 z-20">
            <div className="w-10 h-10 bg-zinc-300 flex justify-center items-center rounded-full" onClick={()=>window.history.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_223_1275)">
                <path d="M16.62 2.99006C16.13 2.50006 15.34 2.50006 14.85 2.99006L6.54 11.3001C6.15 11.6901 6.15 12.3201 6.54 12.7101L14.85 21.0201C15.34 21.5101 16.13 21.5101 16.62 21.0201C17.11 20.5301 17.11 19.7401 16.62 19.2501L9.38 12.0001L16.63 4.75006C17.11 4.27006 17.11 3.47006 16.62 2.99006Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_223_1275">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>
            </div>        
          </div>
        {
            blog !== null && markdown !== null ?
            <div className='container mx-auto mb-10'>
                <div className="flex flex-col items-center w-full">
                    <img src={`${config.STRAPI_URL}`+blog.attributes.headerImage.data.attributes.url} alt="" className="h-96 object-fit mt-20 rounded-lg" />
                </div>
                <div className="flex flex-col mt-20">
                        <div className="text-xl font-bold flex items-center">{blog.attributes.title}
                            <div className='text-sm font-bold'>{" - "} {blog.attributes.author + 
                                //show date and time in 12 hour format
                                " - " + new Date(blog.attributes.date).toLocaleDateString('en-US', { 
                                    //dd/mm/yyyy
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                 }) + " " + new Date(blog.attributes.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
                            }</div>
                        </div>
                        <div class="mt-8 prose prose-slate mx-auto lg:prose-lg" dangerouslySetInnerHTML={{
                            __html: markdown
                        }}></div>
                </div> 
            </div>
            : 
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        }
        <Footer></Footer>
    </>
  )
}

export default BlogPost