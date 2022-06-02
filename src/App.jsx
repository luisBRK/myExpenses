// import use state
import { useState } from "react";
// import modules
import Header from "./components/Header";
import Modal from "./components/Modal";
import ExpensesList from "./components/ExpensesList";
import { idGenerator } from "./helpers/helpers";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  // states
  const [budget, setBudget] = useState(0);
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);

  const [expenses, setExpenses] = useState([]);

  // function - button to open a modal, add new expense
  const handleNewExpense = () => {
    setModal(true);

    setTimeout(() => {
      setModalAnimation(true);
    }, 100);
  };

  // function - to save a new expense
  const saveExpense = (myExpense) => {
    myExpense.expenseId = idGenerator();
    myExpense.expenseDate = Date.now();
    setExpenses([...expenses, myExpense]);

    // close modal
    setModalAnimation(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {/* add expense icon if set a budget */}
      {isValidBudget && (
        <>
          {/* expenses list */}
          <main>
            <ExpensesList expenses={expenses} />
          </main>

          {/* expense button  */}
          <div className="add-expense" onClick={handleNewExpense}>
            <FontAwesomeIcon icon={faCirclePlus} className="expense-button" />
          </div>
        </>
      )}

      {/* show modal if press button to add a new expense*/}
      {modal && (
        <Modal
          FontAwesomeIcon={FontAwesomeIcon}
          setModal={setModal}
          modalAnimation={modalAnimation}
          setModalAnimation={setModalAnimation}
          saveExpense={saveExpense}
        />
      )}
    </div>
  );
}

export default App;
