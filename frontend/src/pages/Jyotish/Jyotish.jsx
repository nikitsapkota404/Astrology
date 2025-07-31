import React, { useEffect, useState } from "react";
import AstrologerCard from "./../../components/Astologers/AstrologerCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import JyotishDetails from './JyotishDetails';
import { BASE_URL } from '../../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const Jyotish = () => {
  const [query,setQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState('')


  const handleSearch = ()=>{
    setQuery(query.trim())

  }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setDebounceQuery(query)
    },700)
    return ()=> clearTimeout(timeout)
  },[query])

  const {data:astrologers,loading,error} = useFetchData(`${BASE_URL}/astrologers?query=${debounceQuery}`)

  return (
    <>
      <section className="bg-gradient-to-b from-[#fff9ea] to-[#fffcf3] py-8">
        <div className="container text-center">
          <h2 className="heading relative inline-block">
            <span className="relative z-10">Find an astrologer</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 opacity-40 z-0"></span>
          </h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-white rounded-lg shadow-lg flex items-center justify-between overflow-hidden border border-[#0066ff1a]">
            <input
              type="search"
              className="py-4 pl-6 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor"
              placeholder="Search Astrologer"
              value={query}
              onChange={e=> setQuery(e.target.value)}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-lg shadow-none hover:shadow-inner transition-all duration-300" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container">
        {loading && <Loader/>}
        {error && <Error/>}
          {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
              {astrologers.map((astrologer) => (
                <div key={astrologer.id} className="transform transition-transform duration-300 hover:-translate-y-2">
                  <AstrologerCard astrologer={astrologer}/>
                </div>
              ))}
            </div>}
        </div>
      </section>
      
      <JyotishDetails />

      <section className="py-16 bg-gradient-to-b from-[#f9f9ff] to-white">
        <div className="container">
          <div className="xl:w-[550px] mx-auto">
            <h2 className="heading text-center relative inline-block">
              <span className="relative z-10">What our clients say</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-purple-200 opacity-40 z-0"></span>
            </h2>
            <p className="text__para text-center mt-4">
              We provide world-renowned astrology services powered by expert
              knowledge and innovative technology.
            </p>
          </div>
          <Testimonial/>
        </div>
      </section>
    </>
  );
};

export default Jyotish;