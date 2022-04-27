import {useEffect, useState} from "react"

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () =>{
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(null)

    useEffect(()=>{
      const fetchMeals = async ()=>{
        const response = await fetch('https://http-request-10706-default-rtdb.firebaseio.com/meals.json')
        
        console.log(response)
        if(!response.ok){
          throw new Error('Something went wrong!')
        }
        
        const responseData = await response.json()

        const loadedMeals = []

        for(const key in responseData){
          loadedMeals.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:responseData[key].price
          })
        }

        setMeals(loadedMeals)
        setIsLoading(false)
      }

      
        fetchMeals().catch(error=>{
          setIsLoading(false)
          setIsError(error.message)
        })

    }, [])

    if(isError){
      return<section className={classes.MealsError}>
        <p>{isError}</p>
      </section>
    }

    if(isLoading){
      return<section className={classes.MealsLoading}>
        <p>Loading....</p>
      </section>
    }

    

    return <section className={classes.meals}>
        <Card>
            <ul>
                {meals.map(meal=>(
                <MealItem 
                id={meal.id}
                key={meal.id} 
                name={meal.name} 
                description ={meal.description}
                price={meal.price}
                />
                ))}
            </ul>
        </Card>
       
    </section>
}

export default AvailableMeals