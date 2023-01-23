import './App.css';
import FoodComponent from './components/FoodComponent';
import MenuData from './data/MenuData'
import {useEffect, useState} from 'react'

function App() {

  const [foodData,setFoodData] = useState(MenuData)
  const [dataInPage,setDataInPage] = useState([])
  const [page,setPage] = useState(0)

  const pagination = ()=>{
    const foodPerPage = 3
    const pages = Math.ceil(MenuData.length / foodPerPage) 

    const onePageFood = Array.from({length:pages},(data,index)=>{
      const start = index * foodPerPage
      return  MenuData.slice(start,start+foodPerPage)
    })

    return onePageFood
  }

  const handlePage = (index)=>{
    setPage(index)
  }

  useEffect(()=>{
    const pageData = pagination()
    setDataInPage(pageData)
    setFoodData(pageData[page])
  },[page])

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className='container'>
        {foodData.map((data,index)=>{
          return <FoodComponent key={index} {...data}/>
        })}
      </div>
      <div className='pagination-container'>
        {dataInPage.map((data,index)=>{
          return <button 
          key={index} 
          onClick={()=>handlePage(index)}
          className={`page-btn ${index === page&& `active-btn`}` }
          >{index+1}</button>
        })}
      </div>
    </div>
  );
}

export default App;
