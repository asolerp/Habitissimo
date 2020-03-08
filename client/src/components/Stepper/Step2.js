import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

// Utils
import axios from 'axios'
import Select from 'react-select'

// Global Store
import { store } from '../../store/store';

const prices = [
  { value: 'cheap', label: 'Lo más barato' },
  { value: 'good', label: 'Relación calidad precio' },
  { value: 'expensive', label: 'Mejor calidad' }
]

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  color: black;
  margin-bottom: 10px;
`

const InputConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 0px 3px #ccc;
  resize: vertical;
  min-height: 10vh;
  max-height: 30vh;
  font-size: 15px;
  padding: 10px 10px;
`

const Input = styled.input`
  border-radius: 5px;
  border: 0;
  box-shadow: 0px 0px 3px #ccc;
`

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
        <Select value={state.category} options={categories} onChange={(selectedOption) => {
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
            <Select value={state.subcategory} options={subcategories} onChange={(selectedOption) =>  dispatch({
                type: "subcategory",
                value: selectedOption
              })}>
            </Select>
          </InputConatiner>
        )
      }
      <InputConatiner>
        <Label>Preferencia de precio</Label>
        <Select value={state.price} options={prices} onChange={(selectedOption) =>  dispatch({
            type: "price",
            value: selectedOption
          })}>
        </Select>
      </InputConatiner>
    </StepContainer>
  )
}

export default Step2