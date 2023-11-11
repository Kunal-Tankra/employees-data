import { useState } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';
import CreateData from './components/createData/CreateData';
import DataTable from './components/dataTable/DataTable';

function App() {
  // progress bar state
  const [progressStatus, setProgressStatus] = useState(0);

  return (
    <>
      {progressStatus !== 0 &&
        <ProgressBar progressStatus={progressStatus} />
      }
      <CreateData setProgressStatus={setProgressStatus} />
      <DataTable />
    </>
  );
}

export default App;
