import CardUI from './COMPONENT/CardUI';
import './App.css';
import NavBar from './COMPONENT/NavBar';
function App() {
  return (
    <div className='container1'>
      
        <div>
          <NavBar />
        </div>

    
      <div className='container'>
        <div >
          <CardUI />
        </div>
        <div >
          <CardUI />
        </div>
        <div >
          <CardUI />
        </div>
        <div >
          <CardUI />
        </div>

      </div>
    </div>


  )
}

export default App;
