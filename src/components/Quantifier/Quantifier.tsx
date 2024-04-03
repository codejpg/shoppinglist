import { FunctionComponent, useState, useEffect } from 'react'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';


export type Operation = 'decrease' | 'increase'

interface Props {
  removeProduct: (productId: number) => void
  handleUpdateQuantity: (productId: number, operation: Operation) => void
  productId: number
}


export const Quantifier: FunctionComponent<Props> = ({ removeProduct, handleUpdateQuantity, productId }) => {
  const [value, setValue] = useState<number>(1)

  useEffect(() => {
    if (value === 0) {
      removeProduct(productId)
    }
  }, [value, removeProduct, productId])

  const reduce = ():void => {
    handleUpdateQuantity(productId, 'decrease')
    setValue(prevState => prevState - 1)
  }

  const increase = ():void => {
    handleUpdateQuantity(productId, 'increase')
    setValue(prevState => prevState + 1)
  }

  return (
    <div>
      <input type="button" value="-"  onClick={reduce} />
      <input type="number"
             step="1"
             max=""
             value={value}
             onChange={e => setValue(parseInt(e.target.value))} />
      <input type="button" value="+" onClick={increase} />
    </div>
  )
}