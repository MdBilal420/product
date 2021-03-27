import React, { useReducer } from "react";
import "./styles.css";

import faker from "faker";

faker.seed(123);

const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

export default function App() {

  const handleReducer = (state,action) => {
    console.log(state)
    switch(action.payload){
      case "PRICE_LOW_TO_HIGH":
        return {...state,
        data:state.data.sort((a,b)=>a.price-b.price)
        }
      case "PRICE_HIGH_TO_LOW":
          return {...state,
            data:state.data.sort((a,b)=>b.price-a.price)
            }
      default:
        return state;
    }
  }

  const [state,dispatch] = useReducer(handleReducer,{data})

  return (
    <>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        <div>
        <fieldset>
          <legend>Sort By</legend>
          <label>
            <input 
            type="radio" 
            name="sort" 
            onChange={()=>dispatch(
              {type:"SORT",payload:"PRICE_HIGH_TO_LOW"})}
            />
            Price - High to Low
          </label>
          <label>
            <input 
            type="radio" 
            name="sort"
            onChange={()=>dispatch(
              {type:"SORT",payload:"PRICE_LOW_TO_HIGH"})}
            />
            Price - Low to High
          </label>
        </fieldset>
        </div>
        <div>
        {/* <fieldset>
          <legend>Filters</legend>
          <label>
            <input 
            type="checkbox" 
            name="sort" 
            onChange={()=>dispatch(
              {type:"OUT_OF_STOCK",payload:"OUT_OF_STOCK"})}
            />
            Out of Stock
          </label>
          <label>
            <input 
            type="checkbox" 
            name="sort"
            onChange={()=>dispatch(
              {type:"FAST_DELIVERY",payload:"FAST_DELIVERY"})}
            />
            Fast Delivery
          </label>
        </fieldset> */}
        </div>
        {data.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
