
import './App.css';
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalState';
function App() {
  const { properties, selectedControls } = useContext(GlobalContext);

  useEffect(() => {
    // console.log(selectedControls);
  }, [selectedControls]);





  return (
    <div className="App">

      <section className='main-container'>
        <div className="properties-container">
          <div className='properties properties-headings'>
            {
              properties.headings.map((item, index) => (
                <button key={index} onClick={item.function} className={`property ${item.name}`}>
                  {item.component}
                </button>
              ))
            }
          </div>
          <div className='properties properties-paragraph'>
            {properties.paragraph.map((item, index) => (
              <button key={index} className={`property ${item.name}`}>
                {item.component}
              </button>
            ))}
          </div>
          <div className='properties properties-controls'>
            {properties.controls.map((item, index) => (
              <button key={index} onClick={item.function} className={`property ${item.name}`}>
                {item.component}
              </button>
            ))}
          </div>
        </div>
        <div className="content-container">
          <div contentEditable className="textArea">

          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
