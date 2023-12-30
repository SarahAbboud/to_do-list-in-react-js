import React, { useState } from 'react';
import "./App.css";

function App() {
  const [itemList, setItemList] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [filter, setFilter] = useState('all');

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setItemList([...itemList, { text: currentInput, checked: false }]);
      setCurrentInput('');
    }
  };
  const handleDeleteAll = () =>{
    setItemList([])
  }

  const handleDeleteToDo = (index) => {
    const updatedList = [...itemList];
    updatedList.splice(index, 1);
    setItemList(updatedList);

  }
  const handleToggleToDo = (index) => {
    const currentInput  = [...itemList];
    currentInput[index].checked = !currentInput[index].checked;
    setItemList(currentInput);

  }
  const handleDeleteComplecated = () =>{
    const updatedList = itemList.filter(item =>!item.checked);
      setItemList(updatedList);

    }

  const handleFilterChange = (selectedFilter) => {
      setFilter(selectedFilter);
    }
  
    const getFilteredItems = () => {
      switch (filter) {
        case 'active':
          return itemList.filter(item => !item.checked);
        case 'completed':
          return itemList.filter(item => item.checked);
        default:
          return itemList;
      }
    }

  

  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + '/m1.png'}
        alt="Description"
        style={{ width: '100%', maxHeight: '300px' }}
      />
      <h1 style={{marginLeft:'250px', position: 'absolute', color: '#fff', top: 80, left: 50, textAlign: 'center', padding: '10px', zIndex: 2 }}>
        TO DO
      </h1>
      <input
        placeholder='Create a new todo'
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          border: '1px solid #fff',
          boxSizing: 'border-box',
          zIndex: '1',
          margin: '5px 400px',
          top: '-40px',
          width: '650px',
          padding: '20px',
          position: 'relative',
          borderRadius:'8px' ,

        }}
      />

<div className="App">
        <ul>
          {getFilteredItems().map((item, index) => (
            <li key={index} className="todo-item" 
            onMouseEnter={(e) => e.target.classList.add('hovered')} 
            onMouseLeave={(e) => e.target.classList.remove('hovered')}>
              <input type='checkbox' style={{marginRight:'10px'}} checked={item.checked} onChange={() => handleToggleToDo(index)} />
              <span style={{color:'#040404', marginRight: "100px", textDecoration: item.checked ? "line-through" : "none" }}> {item.text}</span>
              <button className="button_delete" onClick={() => handleDeleteToDo(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
       
      </div>
      <div className="setComplecated">
      {itemList.length > 0 && (
          <button className="complecated" onClick={handleDeleteComplecated}>
            Delete complecated
          </button>)
          
        }
         {itemList.length > 0 && (
         <button className='complecated' onClick={() => handleFilterChange('all')}>All</button>)
          
        }
        {itemList.length > 0 && (
         <button className="complecated" onClick={() => handleFilterChange('active')}>Active</button>)
          
        }
        {itemList.length > 0 && (
         <button className="complecated" onClick={() => handleFilterChange('completed')}>Completed</button>)
          
        }
        
   
          
        {itemList.length > 0 && 
          (
          <span className='item'> {itemList.length} Item</span>
          )
        }

       
         
      
      </div  >
      {itemList.length > 0 && (
          <button  className="button_delete_all"  onClick={handleDeleteAll}>
            Drag and Delete to reorder list
          </button>  
        )}
         
    </div>
  );
}

export default App;