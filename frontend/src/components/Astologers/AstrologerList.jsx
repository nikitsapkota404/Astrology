import AstrologerCard from './AstrologerCard'
import { BASE_URL } from '../../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
const AstrologerList = () => {
  const {data:astrologers,loading,error} = useFetchData(`${BASE_URL}/astrologers`)
  return (
    <>
    {loading && <Loader/>}
    {error && <Error/>}
    {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>{astrologers.map((astrologer)=>(
         <AstrologerCard key={astrologer._id} astrologer={astrologer}/>
        ))}</div>}
        </>
  )
}

export default AstrologerList