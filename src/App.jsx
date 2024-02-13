import { useEffect,useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseItem from "./components/ExpenseItem"
import axios from "axios";

const App =()=>{
  const [expenses, setExpenses] = useState([])

  useEffect(()=>{
    axios.get('https://expensetracker-api2.onrender.com/entry')
  .then(res=>{
    console.log(res.data)
    setExpenses(res.data)
  })
  .catch(err=>console.log(err))
  },[])
  const addExpense =(title,amount)=>{
    const nextId=expenses[expenses.length-1].id+1
    setExpenses([...expenses,{id:nextId ,title:title,amount:amount}])
  }
  const deleteExpense =(id)=>{
    setExpenses(expenses.filter((exp)=>exp.id !== id))
  }

  let income=0,expense=0;
  expenses.forEach((exp)=>{
    if(exp.amount>0){
      income += exp.amount
    }else{
      expense -= exp.amount
    }
  })
  

  return(
    <>
    <div className="whole">
    <div>
      <div className="tracker">Expense Tracker</div>
      <div className="bal">
      <div className="balance">Balance:{income-expense}</div>
      </div>
      <div className="income-expense-container">
        <div className="income">
          <span>Income</span>
          <span>{income}</span>
        </div>
        <div className="expense">
          <span>Expense</span>
          <span>{expense}</span>
        </div>
      </div>
    </div>
    <ExpenseForm addExpense={addExpense}/>
   {expenses.map((expense)=>(
    <ExpenseItem key={expense.id} 
    title={expense.title} 
    amount={expense.amount}
    id={expense.id}
    deleteExpense={deleteExpense}/>
   ))}
   </div>
   
   </>
  )
}
export default App

