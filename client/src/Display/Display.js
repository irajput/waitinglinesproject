import './Display.css';
import Table from './Table.js'

function Display() {
  return (
    <div className="display">
      <h1>Current Waiting Times</h1>
      <Table />
    </div>
  );
}

export default Display;
