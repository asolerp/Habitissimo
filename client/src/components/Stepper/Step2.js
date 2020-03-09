import React, { useState, useEffect, useContext } from 'react'

// Utils
import axios from 'axios'
import Select from 'react-select'

// Global Store
import { store } from '../../store/store';

// Styles
import { StepContainer, Label, InputConatiner, CustomSelectStyles} from '../../styles/formStyles'


const prices = [
  { value: 'cheap', label: 'Lo más barato' },
  { value: 'good', label: 'Relación calidad precio' },
  { value: 'expensive', label: 'Mejor calidad' }
]

const Step2 = () => {

  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const [ categories, setCategories] = useState()
  const [ subcategories, setSubcategories] = useState()

  useEffect(() => {
    const getCategories = async() => {
      try {
        const { data } = await axios.get('http://localhost:3030/api/budget/categories')
        setCategories(data.map(category => { return { label: category.name, value: category.id  }}))
      } catch (err) {
        console.log(err)
      }
    } 
    getCategories()
  }, [])

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/api/budget/subcategories/${state.category.value}`)
        setSubcategories(data.map(subcategory => { return { label: subcategory.name, value: subcategory.id  }}))
      } catch(err) {
        console.log(err)
      }
    }
    getSubcategories()
  }, [state.category])

  return (
    <StepContainer>
      <InputConatiner>
        <Label>Categoría</Label>
        <Select value={state.category} options={categories} styles={CustomSelectStyles} onChange={(selectedOption) => {
          dispatch({
              type: "category",
              value: selectedOption
            })
            dispatch({
              type: "subcategory",
              value: null
            })}}>        
          </Select>
      </InputConatiner>
      {
        state.category && (
          <InputConatiner>
            <Label>Subcategoría</Label>
            <Select value={state.subcategory} options={subcategories} styles={CustomSelectStyles} onChange={(selectedOption) =>  dispatch({
                type: "subcategory",
                value: selectedOption
              })}>
            </Select>
          </InputConatiner>
        )
      }
      <InputConatiner>
        <Label>Preferencia de precio</Label>
        <Select value={state.price} options={prices} styles={CustomSelectStyles} onChange={(selectedOption) =>  dispatch({
            type: "price",
            value: selectedOption
          })}>
        </Select>
      </InputConatiner>
    </StepContainer>
  )
}

export default Step2